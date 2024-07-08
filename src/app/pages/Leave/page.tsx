"use client";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface LeaveOption {
  value: string;
  label: string;
}

const Leave: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fullDay, setFullDay] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isFullDayOpen, setIsFullDayOpen] = useState<boolean>(false);
  const [isLeaveTypeOpen, setIsLeaveTypeOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const leaveOptions: LeaveOption[] = [
    { value: "full", label: "Full Day" },
    { value: "half", label: "Half Day" },
  ];

  const leaveTypes: LeaveOption[] = [
    { value: "Sick", label: "Sick" },
    { value: "Medical", label: "Medical" },
    { value: "Casual", label: "Casual" },
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromDate && toDate && toDate < fromDate) {
      alert("To Date cannot be before From Date");
      return;
    }

    if (formRef.current?.checkValidity()) {
      console.log("From Date:", fromDate);
      console.log("To Date:", toDate);
      console.log("Day Type:", fullDay);
      console.log("Leave Reason:", reason);

      alert("Form Submitted!");
      handleReset();
    } else {
      formRef.current?.reportValidity();
    }
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setFullDay("");
    setReason("");
  };

  return (
    <div className="container mx-auto p-4 Ccard">
      <form
        ref={formRef}
        onSubmit={handleAdd}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        noValidate
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="Lbutton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Leave;
