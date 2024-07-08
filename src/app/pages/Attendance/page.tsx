"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  toggleCheckIn,
  setSelectedMonth,
} from "../../store/slices/attendanceSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AttendanceButton from "@/app/components/ui/buttons/AttendanceButton";

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
      <AttendanceButton
        isCheckedIn={isCheckedIn}
        handleCheckInOut={handleCheckInOut}
      />

      <div className="tableContainer overflow-y-auto w-4/5 h-80 bg-gray-200 rounded-2xl shadow-2xl mb-5">
        {filteredAttendance.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 bg-slate-300 z-10">
              <tr>
                <th className="p-3 border-b text-center">DATE</th>
                <th className="p-3 border-b text-center">CHECK IN</th>
                <th className="p-3 border-b text-center">CHECK OUT</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record, index) => (
                <React.Fragment key={index}>
                  {record.checkInTimes.map((checkIn, idx) => (
                    <tr
                      key={`${record.date}-${idx}`}
                      className="odd:bg-blue-50 even:bg-blue-100"
                    >
                      {idx === 0 && (
                        <td
                          rowSpan={record.checkInTimes.length}
                          className="p-3 border-b text-center bg-blue-50"
                        >
                          {record.date}
                        </td>
                      )}
                      <td className="p-3 border-b text-center relative">
                        {checkIn || "-"}
                        <div className="absolute top-1/2 right-0 h-5 w-0.5 bg-gray-500 transform -translate-y-1/2"></div>
                      </td>
                      <td className="p-3 border-b text-center relative">
                        {record.checkOutTimes[idx] || "-"}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-5 text-center">User not checked in this month</p>
        )}
      </div>

      <div className="flex flex-wrap justify-between items-center w-full max-w-[700px] mb-5 flex-col md:flex-row gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={handlePreviousMonth}
        >
          PREVIOUS MONTH
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 mb-2 md:mb-0"
          onDoubleClick={handleCurrentMonth}
        >
          {selectedDate
            .toLocaleString("default", {
              month: "long",
            })
            .toUpperCase()}
          -{selectedDate.getFullYear()}
        </button>
        <input
          type="month"
          className="px-4 py-2 rounded bg-white mb-2 md:mb-0"
          onChange={handleMonthSelect}
          value={`${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`}
        />
      </div>
    </div>
  );
}
