interface AttendanceRecord {
  date: string;
  checkInTimes: string[];
  checkOutTimes: string[];
}

interface AttendanceState {
  isCheckedIn: boolean;
  attendance: AttendanceRecord[];
  selectedMonth: string; // Store as a string
}
