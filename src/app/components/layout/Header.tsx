"use client";
import React, { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import UserCard from "../ui/cards/UserCard";
import HeaderUserButton from "../ui/buttons/HeaderUserButton";
import Link from "next/link";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  return (
    <header className="w-full flex justify-around items-center h-auto shadow-md fixed top-0 z-50 bg-white">
      <div className="min-w-[100px]">
        <img src="/assets/LogoMain.png" alt="Logo" className="h-10 rounded-full pl-2" />
      </div>
      <div className="flex items-center w-[700px]">
        <FaSearch color="gray" />
        <input type="text" placeholder="Search here..." className="ps-2 w-full outline-none border-none" />
      </div>
      <div className="text-gray-500 cursor-pointer">
        <FaBell />
      </div>
      <li>
        <Link href="/api/auth/signin">Sign In</Link>
      </li>
      <li>
        <Link href="/api/auth/signout">Sign Out</Link>
      </li>
      <div className="relative w-[200px]">
        <HeaderUserButton
          clickHandler={() => {
            setIsOpen(!isOpen);
          }}
          userName={user.name}
          imageSource={user.profileImage}
          position={user.position}
        />
        {isOpen && <UserCard />}
      </div>
    </header>
  );
};

export default Header;
