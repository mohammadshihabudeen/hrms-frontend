"use client";
import React, { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserCard from "../components/ui/UserCard";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="w-full flex justify-around items-center h-auto shadow-md fixed top-0 z-50 bg-white">
      <div className="min-w-[100px]">
        <img
          src="/assets/LogoMain.png"
          alt="Logo"
          className="h-10 rounded-full pl-2"
        />
      </div>
      <div className="flex items-center w-[700px]">
        <FaSearch color="gray" />
        <input
          type="text"
          placeholder="Search here..."
          className="ps-2 w-full outline-none border-none"
        />
      </div>
      <div className="text-gray-500 cursor-pointer">
        <FaBell />
      </div>
      <div className="text-gray-500 cursor-pointer">
        <IoMdMailUnread />
      </div>
      <div className="relative w-[200px]">
        <button
          className="flex items-center w-full justify-start py-1 px-4 bg-white text-black rounded cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left ml-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.position}</p>
          </div>
        </button>
        {isOpen && <UserCard />}
      </div>
    </header>
  );
};

export default Header;
