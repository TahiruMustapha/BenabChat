import DataPage from "@/app/page/data";
import React from "react";
import { HiOutlineDotsVertical, HiOutlinePaperAirplane } from "react-icons/hi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const Post = ({ post }) => {
  return (
    <div className=" bg-white my-7   rounded-md">
      <div className=" border ">
        <div className=" flex items-center p-5  border-b border-gray-100">
          <img
            src={post.profileImg}
            alt={post.username}
            className=" h-12 w-12 rounded-full object-cover p-1 mr-3"
          />
          <p className=" flex-1 font-bold">{post.username}</p>
          <HiOutlineDotsVertical className=" cursor-pointer h-5" />
        </div>
        <img
          src={post.image}
          alt={post.caption}
          className=" object-cover w-full"
        />
      </div>
      <div className=" w-full flex items-center justify-between">
        <div className=" relative flex  w-full py-4 border-none items-center gap-4 ">
          <FaRegHeart className=" cursor-pointer font-[900] text-2xl" />
          <IoChatbubbleOutline className=" -rotate-[90deg] cursor-pointer font-[900] text-2xl" />
          <HiOutlinePaperAirplane className=" rotate-45 cursor-pointer font-[900] text-2xl" />
          <span className=" font-bold absolute top-12">10 Likes</span>
        </div>
        <FaRegBookmark className=" cursor-pointer font-[900] text-2xl" />
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
        <p className=" text-gray-500 cursor-pointer">View all comments</p>
        <p className=" text-gray-500">Add a comment...</p>
      </div>
    </div>
  );
};

export default Post;
