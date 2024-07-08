import React from "react";
import PreviousMonthButton from "../buttons/PreviousMonthButton";
import CurrentMonthButton from "../buttons/CurrentMonthButton";

interface AttendanceCardProps {
  filteredAttendance: {
    date: string;
    checkInTimes: string[];
    checkOutTimes: string[];
  }[];
  selectedDate: Date;
  handleMonthSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrentMonth: any;
  handlePreviousMonth: any;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  filteredAttendance,
  selectedDate,
  handleMonthSelect,
  handleCurrentMonth,
  handlePreviousMonth,
}) => {
  return (
    <>
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
        <PreviousMonthButton
          handleClick={handlePreviousMonth}
          text={"PREVIOUS MONTH"}
        />
        <CurrentMonthButton
          handleClick={handleCurrentMonth}
          selectedDate={selectedDate}
        />
        <input
          type="month"
          className="px-4 py-2 rounded bg-white mb-2 md:mb-0"
          onChange={handleMonthSelect}
          value={`${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`}
        />
      </div>
    </>
  );
};

export default AttendanceCard;
