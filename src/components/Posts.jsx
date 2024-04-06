"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, orderBy } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Ensure this points to your Firebase config file
import Post from "./Post";

const Posts = () => {
  const [data, setData] = useState([]); // State to hold your data
  const db = getFirestore(app); // Initialize Firestore

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "posts"),
        orderBy("timestamp", "desc")
      );
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setData(items); // Update state with fetched data
    };

    fetchData();
  }, []); // The empty array means this effect runs once on mount

  return (
    <div>
      {data.map((item) => (
        <Post key={item.id} post={item} />
      ))}
    </div>
  );
};

export default Posts;
