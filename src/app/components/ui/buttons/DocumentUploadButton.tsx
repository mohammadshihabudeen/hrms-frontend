import React from "react";

type Props = {
  clickHandler: any;
  text: string;
};

function DocumentUploadButton({ clickHandler, text }: Props) {
  return (
    <button
      className="px-4 py-2 my-2 bg-green-600 text-white rounded cursor-pointer"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}

export default DocumentUploadButton;
