interface Employee {
  id: string;
  employeeName: string;
  profile: string;
  jobTitle: string;
  salary: string;
  hireDate: string;
  contract: string;
  marriedStatus: string;
  degree: string;
  location: string;
  dob: string;
  country: string;
  phone: string;
  department: string;
}
interface EmployeeState {
  employees: Employee[];
  selectedEmployeeId: string | null; // Track the ID of the selected employee for details view
}
interface empdetails {
  name: string;
  icon: JSX.Element;
  value: string;
};
