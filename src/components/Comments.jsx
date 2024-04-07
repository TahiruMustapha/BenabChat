"use client";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import Modal from "./Modal";
import { FaRegSmile } from "react-icons/fa";

const Comments = ({ id, postComment }) => {
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

  return (
    <div className="  w-full relative ">
      <p
        onClick={() => setOpenComments(true)}
        className=" text-gray-500 cursor-pointer"
      >{`View all ${comments.length} comments`}</p>

      {session && (
        <form
          onSubmit={handleSubmit}
          className=" flex w-full items-center justify-between"
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className=" bg-transparent mt-2 outline-none border-none focus:ring-0 flex-1"
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            className=" disabled:hidden font-bold mr-2  text-blue-700"
          >
            Post
          </button>
          <span>
            <FaRegSmile className=" text-gray-500" />
          </span>
        </form>
      )}
      {openComments && (
        <Modal
          onClose={() => setOpenComments(false)}
          postComment={postComment}
          id={postComment.id}
        />
      )}
    </div>
  );
};

export default Comments;
