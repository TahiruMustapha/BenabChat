"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { app } from "@/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const filePickerRef = useRef(null);
  const db = getFirestore(app);
  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(imageFileUrl);
    }
  }
  useEffect(() => {
    if (selectedImage) {
      uploadFileToStorage();
    }
  }, [selectedImage]);

  async function uploadFileToStorage() {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploading(false);
        });
      }
    );
  }
  async function handleSubmit() {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      image: imageFileUrl,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    });
    setPostUploading(false);
    setIsOpen(false);
  }

  return (
    <div className=" shadow-sm sticky border-b top-0 bg-white z-30 p-3">
      <div className=" flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <Link href={"/"} className="hidden lg:inline-flex">
          <Image src={"/logo2.webp"} alt="logo" width={96} height={96} />
        </Link>
        <Link href={"/"} className="  lg:hidden">
          <Image src={"/logo1.webp"} alt="logo" width={40} height={40} />
        </Link>

        {/* Logo */}
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border-gray-200 outline-none text-sm w-full py-2 px-4 rounded max-w-[210px]"
        />
        {/* Search input */}
        {session ? (
          <div className=" flex items-center gap-2">
            <IoMdAddCircleOutline
              className=" text-2xl cursor-pointer transform hover:scale-125 transition duration-200 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user?.image}
              alt="user image"
              className=" w-12 h-12 rounded-full cursor-pointer object-cover"
              onClick={() => signOut()}
            />
            <p className=" text-sm font-semibold text-blue-500">
              {session.user.name}
            </p>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className=" text-sm font-semibold text-blue-500"
          >
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className=" max-w-lg  w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] shadow-md bg-white border-2 rounded-r-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className=" flex flex-col items-center  justify-center h-full">
            {selectedImage ? (
              <img
                onClick={() => setSelectedImage(null)}
                src={imageFileUrl}
                alt="selected img"
                className={` w-full max-h-[250px] cursor-pointer object-contain ${
                  imageFileUploading ? " animate-pulse" : ""
                }`}
              />
            ) : (
              <HiCamera
                onClick={() => filePickerRef.current.click()}
                className=" text-5xl text-gray-400 cursor-pointer"
              />
            )}
            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />
          </div>
          <input
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            maxLength={150}
            placeholder=" please enter your caption"
            className=" m-4 border-none w-full text-center focus:ring-0 outline-none"
          />
          <button
            disabled={
              !selectedImage ||
              caption.trim() === "" ||
              postUploading ||
              imageFileUploading
                ? true
                : false
            }
            onClick={handleSubmit}
            className=" w-full bg-red-600 disabled:text-black text-white shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 p-2 disabled:cursor-not-allowed disabled:hover:brightness-100 "
          >
            Upload Post
          </button>
          <AiOutlineClose
            onClick={() => setIsOpen(false)}
            className=" cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-200 "
          />
        </Modal>
      )}
    </div>
  );
};

export default Header;
