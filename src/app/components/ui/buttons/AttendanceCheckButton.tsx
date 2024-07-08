type Props = {
  isCheckedIn: boolean;
  handleCheckInOut: () => void;
};

const AttendanceCheckButton = ({ isCheckedIn, handleCheckInOut }: Props) => {
  return (
    <button
      className={`w-32 h-32 rounded-full text-white text-lg mb-5 transition-colors duration-300 ${
        isCheckedIn ? "bg-blue-700" : "bg-blue-500"
      }`}
      onClick={handleCheckInOut}
    >
      {isCheckedIn ? "CHECK OUT" : "CHECK IN"}
    </button>
  );
};
export default AttendanceCheckButton;
