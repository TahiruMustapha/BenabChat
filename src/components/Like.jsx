"use client";

import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = ({ id }) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  }
  return (
    <div>
      {session && (
        <div className=" relative">
          {hasLiked ? (
            <FaHeart
              onClick={likePost}
              className=" text-red-600 font-[900] text-2xl hover:scale-125 transition-transform duration-200 ease-out cursor-pointer"
            />
          ) : (
            <FaRegHeart
              onClick={likePost}
              className=" cursor-pointer hover:scale-125 transition-transform duration-200 ease-out font-[900] text-2xl"
            />
          )}
          {likes.length > 0 && (
            <span className=" font-bold w-[4rem] absolute text-sm top-8">
              {" "}
              {likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Like;
