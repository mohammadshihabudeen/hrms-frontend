"use client";
import LeaveCard from "@/app/components/ui/cards/LeaveCard";
import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

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

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fromDate || !toDate || !fullDay || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Form submitted successfully!");
    handleReset();
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setFullDay("");
    setReason("");
  };

  return (
    <div className="container mx-auto p-4 Ccard">
      <LeaveCard
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        fullDay={fullDay}
        setFullDay={setFullDay}
        leaveOptions={leaveOptions}
        isFullDayOpen={isFullDayOpen}
        setIsFullDayOpen={setIsFullDayOpen}
        reason={reason}
        setReason={setReason}
        leaveTypes={leaveTypes}
        isLeaveTypeOpen={isLeaveTypeOpen}
        setIsLeaveTypeOpen={setIsLeaveTypeOpen}
        handleAdd={handleAdd}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Leave;
