import React from "react";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  text: string;
  handleClick: any;
};

function DocumentsBackButton({ text, handleClick }: Props) {
  return (
    <button
      className="backButton1  px-3 py-1 rounded text-sm flex items-center"
      onClick={handleClick}
    >
      <FaArrowLeft className="mr-1" /> {text}
    </button>
  );
}

export default DocumentsBackButton;
