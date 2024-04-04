import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
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
        <button className=" text-sm font-semibold text-blue-500">Log In</button>
      </div>
    </div>
  );
};

export default Header;
