import React from "react";

type Props = {
  handleClick: any;
  text: string;
};

function DocumentAddButton({ handleClick, text }: Props) {
  return (
    <button
      className="ms-10 px-4 py-2 my-2 bg-yellow-500 text-white rounded cursor-pointer"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default DocumentAddButton;
