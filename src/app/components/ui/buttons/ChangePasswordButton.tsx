import React from "react";

type Props = {
  clickHandler: () => void;
  text: string;
};

export default function ChangePasswordButton({ clickHandler, text }: Props) {
  return (
    <button
      className="w-auto bg-blue-500 text-white py-2 px-4 rounded "
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
