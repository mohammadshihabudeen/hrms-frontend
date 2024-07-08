"use client";
import AttendanceCheckButton from "@/app/components/ui/buttons/AttendanceCheckButton";
import AttendanceCard from "@/app/components/ui/cards/AttendanceCard";
import { AppDispatch, RootState } from "@/app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMonth,
  toggleCheckIn,
} from "../../store/slices/attendanceSlice";

export default function Attendance() {
  const dispatch = useDispatch<AppDispatch>();
  const { isCheckedIn, attendance, selectedMonth } = useSelector(
    (state: RootState) => state.attendance
  );

  const handleCheckInOut = () => {
    dispatch(toggleCheckIn());
  };

  const handlePreviousMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    dispatch(setSelectedMonth(newMonth.toISOString()));
  };

  const handleCurrentMonth = () => {
    dispatch(setSelectedMonth(new Date().toISOString()));
  };

  const handleMonthSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = event.target.value.split("-");
    dispatch(
      setSelectedMonth(new Date(Number(year), Number(month) - 1).toISOString())
    );
  };

  const selectedDate = new Date(selectedMonth);

  const filteredAttendance = attendance
    .filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === selectedDate.getMonth() &&
        recordDate.getFullYear() === selectedDate.getFullYear()
      );
    })
    .map((record) => ({
      ...record,
      checkInTimes: record.checkInTimes.slice().sort(),
      checkOutTimes: record.checkOutTimes.slice().sort(),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <AttendanceCheckButton
        isCheckedIn={isCheckedIn}
        handleCheckInOut={handleCheckInOut}
      />
      <AttendanceCard
        filteredAttendance={filteredAttendance}
        selectedDate={selectedDate}
        handleMonthSelect={handleMonthSelect}
        handleCurrentMonth={handleCurrentMonth}
        handlePreviousMonth={handlePreviousMonth}
      />
    </div>
  );
}
