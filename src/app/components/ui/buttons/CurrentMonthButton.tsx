import React from "react";

type Props = {
  selectedDate: Date;
  handleClick: () => void;
};

function CurrentMonthButton({ selectedDate, handleClick }: Props) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 mb-2 md:mb-0"
      onDoubleClick={handleClick}
    >
      {selectedDate
        .toLocaleString("default", {
          month: "long",
        })
        .toUpperCase()}
      -{selectedDate.getFullYear()}
    </button>
  );
}

export default CurrentMonthButton;
