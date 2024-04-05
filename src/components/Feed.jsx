import React from "react";
import Post from "./Post";
import MiniPost from "./MiniPost";

const Feed = () => {
  return (
    <main className=" grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      {/* post */}
      <section className=" md:col-span-2">
        <Post />
      </section>
      {/* miniPost */}
      <section className="hidden md:inline-grid md:col-span-1">
        <MiniPost />
      </section>
    </main>
  );
};

export default Feed;