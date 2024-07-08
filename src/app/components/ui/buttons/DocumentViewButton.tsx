import React from "react";

type Props = {
  clickHandler: any;
  isDisabled: boolean;
  text: string;
};

function DocumentViewButton({ clickHandler, isDisabled, text }: Props) {
  return (
    <button
      className="px-4 mr-8 py-2 my-2 bg-blue-600 text-white rounded cursor-pointer"
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default DocumentViewButton;
