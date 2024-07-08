import React from "react";
import DatePicker from "react-datepicker";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LeaveApplyButton from "../buttons/LeaveApplyButton";
import LeaveResetButton from "../buttons/LeaveResetButton";
interface LeaveCardProps {
  handleAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  fromDate: Date | null;
  setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
  toDate: Date | null;
  setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
  fullDay: string;
  setFullDay: React.Dispatch<React.SetStateAction<string>>;
  leaveOptions: { value: string; label: string }[];
  isFullDayOpen: boolean;
  setIsFullDayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  leaveTypes: { value: string; label: string }[];
  isLeaveTypeOpen: boolean;
  setIsLeaveTypeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveCard: React.FC<LeaveCardProps> = ({
  handleAdd,
  handleReset,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  fullDay,
  setFullDay,
  leaveOptions,
  isFullDayOpen,
  setIsFullDayOpen,
  reason,
  setReason,
  leaveTypes,
  isLeaveTypeOpen,
  setIsLeaveTypeOpen,
}) => {
  return (
    <form
      onSubmit={handleAdd}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fromDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            <span className="text-red-500">*</span>From:
          </label>
          <div className="relative">
            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select From Date"
              className="Dinput w-full py-2 px-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="toDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            <span className="text-red-500">*</span>To:
          </label>
          <div className="relative">
            <DatePicker
              selected={toDate}
              onChange={(date: Date | null) => setToDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select To Date"
              className="Dinput w-full py-2 px-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              minDate={fromDate || undefined}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullDay"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            <span className="text-red-500">*</span>Day Type:
          </label>
          <div className="relative">
            <select
              id="fullDay"
              value={fullDay}
              onChange={(e) => setFullDay(e.target.value)}
              required
              className="Sinput w-full py-2 px-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onClick={() => setIsFullDayOpen(!isFullDayOpen)}
            >
              <option value="">Select</option>
              {leaveOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 Ficon">
              {isFullDayOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="leaveType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            <span className="text-red-500">*</span>Leave Type:
          </label>
          <div className="relative">
            <select
              id="leaveType"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="Sinput w-full py-2 px-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onClick={() => setIsLeaveTypeOpen(!isLeaveTypeOpen)}
            >
              <option value="">Select</option>
              {leaveTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 Ficon">
              {isLeaveTypeOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="reason"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          <span className="text-red-500">*</span>Leave Reason:
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full py-2 px-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center ">
        <div className="flex items-center ">
          <LeaveApplyButton text="Apply" />
          <LeaveResetButton handleClick={handleReset} text="Reset" />
        </div>
      </div>
    </form>
  );
};

export default LeaveCard;
