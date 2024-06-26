"use client";
import { signIn, signOut, useSession } from "next-auth/react";
const MiniPost = () => {
  const { data: session } = useSession();
  return (
    <div className=" flex items-center justify-between w-full mt-14 ml-10">
      <div className=" flex items-center">
        <img
          src={session?.user?.image || "/logo1.webp"}
          alt="user img"
          className=" w-16 h-16 border rounded-full p-[2px]  object-cover"
        />
        <div className=" flex-1 ml-4">
          <h1 className=" font-semibold">{session?.user?.username}</h1>
          <h3 className=" text-gray-400">{session?.user.name}</h3>
        </div>
      </div>

      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className=" text-sm font-semibold text-blue-500"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className=" text-sm font-semibold text-blue-500"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniPost;
