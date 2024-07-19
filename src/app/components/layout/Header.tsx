"use client";
import React, { useState, useEffect } from "react";
import { setSession } from "@/app/store/slices/sessionSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import UserCard from "../ui/cards/UserCard";
import Image from "next/image";
import HeaderUserButton from "../ui/buttons/HeaderUserButton";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const customSession = {
        user: {
          id: session.user.id,
          name: session.user.name,
          role: session.user.role,
          image: session.user.image,
        },
      };
      dispatch(setSession(customSession));
    }
  }, [session, dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.session.session?.user); // Assuming session slice and user are structured accordingly

  const truncatedName = user?.name.length && user?.name.length > 8 ? `${user.name.slice(0, 8)}...` : user?.name;

  return (
    <header className="w-full flex justify-between items-center h-auto shadow-md fixed top-0 z-50 bg-white px-4 sm:px-8 py-2">
      <div className="flex items-center">
        <Image src="/assets/LogoMain.png" alt="Logo" className="h-10 rounded-full" width={50} height={100} />
      </div>
      <div className="flex items-center flex-1 ml-4">
        <FaSearch color="gray" className="mr-2" />
        <input type="text" placeholder="Search here..." className="w-full outline-none border-none" />
      </div>
      <div className="text-gray-500 cursor-pointer mx-4">
        <FaBell />
      </div>
      <div className="relative">
        {user && (
          <HeaderUserButton
            clickHandler={() => {
              setIsOpen(!isOpen);
            }}
            userName={truncatedName || ""}
            imageSource={user.image} // Assuming `profileImage` is stored in `user.image`
            position={user.role}
          />
        )}
        {isOpen && <UserCard user={user} />}
      </div>
    </header>
  );
};

export default Header;
