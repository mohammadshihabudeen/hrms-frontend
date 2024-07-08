import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AttendanceState = {
  isCheckedIn: false,
  attendance: [
    {
      date: "Thu May 01 2024",
      checkInTimes: ["08:00:00 AM", "01:00:00 PM"],
      checkOutTimes: ["12:00:00 PM", "05:00:00 PM"],
    },
    // ... other records
  ],
  selectedMonth: new Date().toISOString(), // Initialize as an ISO string
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    toggleCheckIn: (state) => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      const currentDate = now.toDateString();

      const existingRecord = state.attendance.find(
        (record) => record.date === currentDate
      );

      if (existingRecord) {
        if (state.isCheckedIn) {
          if (
            existingRecord.checkInTimes.length >
            existingRecord.checkOutTimes.length
          ) {
            existingRecord.checkOutTimes.unshift(currentTime);
          }
        } else {
          if (
            existingRecord.checkInTimes.length ===
            existingRecord.checkOutTimes.length
          ) {
            existingRecord.checkInTimes.unshift(currentTime);
          }
        }
      } else {
        state.attendance.unshift({
          date: currentDate,
          checkInTimes: [currentTime],
          checkOutTimes: [],
        });
      }

      state.isCheckedIn = !state.isCheckedIn;
    },
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { toggleCheckIn, setSelectedMonth } = attendanceSlice.actions;
export default attendanceSlice.reducer;
