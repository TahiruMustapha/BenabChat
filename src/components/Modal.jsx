import React, { useEffect, useRef, useState } from "react";
import CommentBox from "./CommentBox";
import {
  HiOutlineDotsHorizontal,
  HiOutlineHeart,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import Moment from "react-moment";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegBookmark, FaRegSmile } from "react-icons/fa";
import { app } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Like from "./Like";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ postComment, id, onClose }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const db = getFirestore(app);

  async function handleSubmit(e) {
    e.preventDefault();
    // Add comment to firestore
    const commentToPost = comment;
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
    setComment("");
  }

  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments")), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db]);
  const moduleRef = useRef();
  function closeModel(e) {
    if (moduleRef.current === e.target) {
      onClose();
    }
  }
  return (
    <div
      ref={moduleRef}
      onClick={closeModel}
      className=" fixed z-50 inset-0 bg-black bg-opacity-50 transition-transform duration-200"
    >
      <div className="w-[85%] h-[85vh] bg-black border-none  absolute top-[4.6rem] right-4 rounded-r-md">
        <AiOutlineClose
          onClick={onClose}
          className=" cursor-pointer text-white text-2xl font-extrabold absolute top-3 right-3 hover:text-red-600 transition duration-200 "
        />
        <div className="flex h-full">
          <div className="  h-full w-[40%]">
            <img
              src={postComment.image}
              alt="post img"
              className=" object-cover  h-full w-full "
            />
          </div>
          <div className="  flex-1  justify-between  w-full  py-10  ">
            <div className=" flex items-center px-3 border-b-gray-800 border-b-[0.5px]   pb-3 w-[80%] justify-between">
              <div className=" flex h-fit items-center ">
                <img
                  src={postComment.profileImg}
                  alt={postComment.username}
                  className=" h-12 w-12 border-[4px] border-pink-900 rounded-full object-cover p-[0.10rem] mr-3"
                />
                <p className=" flex-1 text-white font-bold">
                  {postComment.username}
                </p>
              </div>

              <HiOutlineDotsHorizontal className=" text-white text-3xl cursor-pointer h-5" />
            </div>
            {/* <hr className="" /> */}
            <div className=" text-white px-3 pt-3 w-[80%]">
              {comments.length > 0 && (
                <div className=" overflow-y-scroll w-full  max-h-96">
                  <div className=" flex  w-full mb-3  h-fit items-center ">
                    <img
                      src={postComment.profileImg}
                      alt={postComment.username}
                      className=" h-12 w-12 border-[4px] border-pink-900 rounded-full object-cover p-[0.10rem] mr-3"
                    />
                    <p className=" flex-1 text-white font-bold">
                      {postComment.username}. {postComment.caption}
                    </p>
                  </div>
                  {comments.map((comment_s) => (
                    <div
                      key={comment_s.id}
                      className=" flex mb-3  justify-between  items-center"
                    >
                      <div className=" flex   items-center">
                        <img
                          src={comment_s.data().userImage}
                          alt="user img"
                          className=" h-12 w-12 border-[4px] border-pink-900 rounded-full object-cover p-[0.10rem] mr-3"
                        />
                        <div className=" text-sm">
                          <p>
                            <span className=" font-bold">
                              {comment_s.data().username}
                            </span>
                            {"  "}
                            {comment_s.data().comment}
                          </p>

                          <Moment fromNow className=" text-gray-400 text-sm">
                            {comment_s.data().timestamp?.toDate()}
                          </Moment>
                        </div>
                      </div>

                      <HiOutlineHeart className=" cursor-pointer mr-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" w-[80%] px-3 text-white mt-4 border-t-gray-800 border-t-[0.5px]   flex items-center justify-between">
              <div className=" flex    w-full py-4 border-none items-center gap-4 ">
                <Like id={id} />
                <IoChatbubbleOutline className=" text-white -rotate-[90deg] hover:scale-125 transition-transform duration-200 ease-out cursor-pointer font-[900] text-2xl" />
                <HiOutlinePaperAirplane className=" text-white  rotate-45 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out font-[900] text-2xl" />
              </div>
              <FaRegBookmark className=" text-white  hover:scale-125 transition-transform duration-200 ease-out cursor-pointer font-[900] text-2xl" />
            </div>

            <div className=" mt-10 border-t-gray-800 border-t-[0.5px] w-[80%]">
              <div
                className="py-5 px-3
          "
              >
                {session && (
                  <form
                    onSubmit={handleSubmit}
                    className=" flex w-full items-center justify-between"
                  >
                    <FaRegSmile className=" text-2xl text-white mr-4" />

                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className=" outline-none text-white bg-transparent border-none focus:ring-0 flex-1"
                    />
                    <button
                      disabled={!comment.trim()}
                      type="submit"
                      className=" disabled:text-gray-400 font-bold mr-2  text-blue-700"
                    >
                      Post
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
