import React from "react";

type Props = {
  handleClick: any;
  text: string;
};

function DocumentSubmitButton({ handleClick, text }: Props) {
  return (
    <button
      className="px-4 py-2 bg-green-600 text-white rounded"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default DocumentSubmitButton;
