import React from "react";

type Props = {
  clickHandler: () => void;
  imageSource: string;
  userName: string;
  position: string;
};

function HeaderUserButton({
  clickHandler,
  imageSource,
  userName,
  position,
}: Props) {
  return (
    <button
      className="flex items-center w-full justify-start py-1 px-4 bg-white text-black rounded cursor-pointer "
      onClick={clickHandler}
    >
      <img src={imageSource} alt="Profile" className="w-8 h-8 rounded-full" />
      <div className="text-left ml-2">
        <p className="font-medium">{userName}</p>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </button>
  );
}

export default HeaderUserButton;
