import React from "react";

type Props = {
  handleClick: any;
  text: any;
};

const PreviousMonthButton = ({ handleClick, text }: Props) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PreviousMonthButton;
