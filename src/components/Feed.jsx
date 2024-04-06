import React from "react";
import MiniPost from "./MiniPost";
import Post from "./Post";
import Posts from "./Posts";

const Feed = () => {
  return (
    <main className=" grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      {/* post */}
      <section className=" md:col-span-2">
        {/* <Post /> */}
        <Posts/>
      </section>
      {/* miniPost */}
      <section className="hidden md:inline-grid md:col-span-1">
        <div className=" fixed w-[380px]">
          <MiniPost />
        </div>
      </section>
    </main>
  );
};

export default Feed;
