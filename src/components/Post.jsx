"use client";
import {
  HiOutlineDotsHorizontal,
  HiOutlineDotsVertical,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegBookmark, FaRegHeart, FaRegSmile } from "react-icons/fa";
import Link from "next/link";
import Like from "./Like";
import Comments from "../components/Comments";
import Moment from "react-moment";
import { AiOutlineClose } from "react-icons/ai";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useSession } from "next-auth/react";
// import Modal from "react-modal";
import { useState } from "react";
import CommentBox from "./CommentBox";
import Modal from "./Modal";
const Post = ({ post }) => {
  const [openComments, setOpenComments] = useState(false);

  const db = getFirestore(app);

  return (
    <div className=" bg-black border-b-gray-800 border-b-[0.5px] text-white my-7   ">
      <div>
        <div className=" flex items-center p-5  ">
          <img
            src={post.profileImg}
            alt={post.username}
            className=" h-12 w-12 rounded-full object-cover p-1 mr-3"
          />
          <p className=" flex-1 font-bold">{post.username}</p>
          <HiOutlineDotsVertical className=" cursor-pointer h-5" />
        </div>
        <div className=" w-full border-gray-800 border-[0.5px]">
          <img
            src={post.image}
            alt={post.caption}
            className=" object-cover w-full mx-auto"
          />
        </div>
      </div>
      <div className=" w-full flex items-center justify-between">
        <div className=" flex   w-full py-4 border-none items-center gap-4 ">
          <Like id={post.id} />
          <IoChatbubbleOutline
            onClick={() => setOpenComments(true)}
            className=" -rotate-[90deg] hover:scale-125 transition-transform duration-200 ease-out cursor-pointer font-[900] text-2xl"
          />
          {openComments && (
            <Modal
              onClose={() => setOpenComments(false)}
              postComment={post}
              id={post.id}
            />
          )}

          <HiOutlinePaperAirplane className=" rotate-45 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out font-[900] text-2xl" />
        </div>

        <FaRegBookmark className=" hover:scale-125 transition-transform duration-200 ease-out cursor-pointer font-[900] text-2xl" />
      </div>
      <div className=" my-5 flex flex-col gap-2">
        <p className=" font-semibold">
          {post.username}{" "}
          <span className=" font-normal">
            {post.caption} ...{" "}
            <Link className=" text-gray-500" href={""}>
              more
            </Link>{" "}
          </span>
        </p>
        {/* {openComments && (
            <Modal
              onClose={() => setOpenComments(false)}
              postComment={post}
              id={post.id}
            />
          )} */}
        <Comments id={post.id} postComment={post} />
      </div>
    </div>
  );
};

export default Post;
