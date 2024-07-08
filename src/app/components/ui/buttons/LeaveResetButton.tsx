import React from "react";

type Props = {
  handleClick: any;
  text: string;
};

function LeaveResetButton({ handleClick, text }: Props) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="Lbutton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  );
}

export default LeaveResetButton;
