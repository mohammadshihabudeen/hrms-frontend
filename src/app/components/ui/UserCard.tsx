import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserCard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const handleChangePassword = () => {
    // Implement change password functionality
    alert("Change password clicked");
  };

  return (
    <div className="absolute right-0 mt-2 p-4 w-64 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="text-left">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.position}</p>
        </div>
      </div>
      <button
        className="w-auto bg-blue-500 text-white py-2 px-4 rounded "
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
};

export default UserCard;
