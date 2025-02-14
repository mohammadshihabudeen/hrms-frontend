import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ChangePasswordButton from "../buttons/ChangePasswordButton";
import Image from "next/image";
type props = {
  user: User | undefined;
};
const UserCard = ({ user }: props) => {
  const handleChangePassword = () => {
    // Implement change password functionality
    alert("Change password clicked");
  };
  return (
    <div className="absolute right-0 mt-2 p-4 w-64 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
          <Image src={user?.image || "/profile.png"} alt="Profile" layout="fill" objectFit="cover" />
        </div>
        <div className="text-left">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
      </div>
      <ChangePasswordButton clickHandler={handleChangePassword} text="Change Password" />
    </div>
  );
};

export default UserCard;
