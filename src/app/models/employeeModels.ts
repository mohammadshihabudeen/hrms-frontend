interface Employee {
  id: string;
  employeeName: string;
  profile: string;
  jobTitle: string;
  jobRole: string;
  salary: string;
  hireDate: string;
  contract: string;
  maritalStatus: string;
  degree: string;
  location: string;
  dob: string;
  country: string;
  phone: string;
  department: string;
  createdBy: string;
  updatedBy: string;
}
interface EmployeeState {
  employees: Employee[];
  selectedEmployeeId: string | null;
  loading: boolean;
  error: string | null;
}
interface empdetails {
  name: string;
  icon: JSX.Element;
  value: string;
}
