"use client";
import EmployeeAddCard from "@/app/components/ui/cards/EmployeeAddCard";
import EmployeeSearchBar from "@/app/components/ui/cards/EmployeeSearch";
import EmployeeTableRow from "@/app/components/ui/cards/EmployeeTableRow";
import { addEmployee, fetchDefaults, fetchEmployees } from "@/app/services/employeeService";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { selectIsManagerAuthorized, setSession } from "../../store/slices/sessionSlice";
import { RootState } from "../../store/store";

const EmployeeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const isManagerAuthorized = useAppSelector((state: RootState) => selectIsManagerAuthorized(state));
  const [defaults, setDefaults] = useState<any>({});
  const employees = useAppSelector((state: RootState) => state.employees.employees);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    employeeName: "",
    employeeId: "",
    email: "",
    profile: "/assets/profile.svg",
    jobTitle: "",
    jobRole: "",
    salary: "",
    hireDate: "",
    contract: "",
    maritalStatus: "",
    degree: "",
    location: "",
    dob: "",
    country: "",
    phone: "",
    department: "",
    createdBy: "Mohammad Shihabudeen",
    updatedBy: "",
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      dispatch(
        setSession({
          user: {
            id: session.user.id,
            name: session.user.name,
            role: session.user.role,
            image: session.user.image,
          },
        }),
      );
    }
  }, [session, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    const employeeToAdd = {
      ...newEmployee,
      id: uuidv4(),
    };
    dispatch(addEmployee(employeeToAdd)).then(() => {
      dispatch(fetchEmployees()); // Fetch the updated list of employees after adding a new one
    });
    setIsAddingEmployee(false);
    setNewEmployee({
      id: "",
      employeeName: "",
      employeeId: "",
      email: "",
      profile: "/assets/profile.svg",
      jobTitle: "",
      jobRole: "",
      salary: "",
      hireDate: "",
      contract: "",
      maritalStatus: "",
      degree: "",
      location: "",
      dob: "",
      country: "",
      phone: "",
      department: "",
      createdBy: "Mohammad Shihabudeen",
      updatedBy: "",
    });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchDefaults()).then(action => {
      if (fetchDefaults.fulfilled.match(action)) {
        setDefaults(action.payload);
      }
    });
  }, [dispatch]);

  const handleDateChange = (date: Date | null, fieldName: string) => {
  setNewEmployee(prevState => ({
    ...prevState,
    [fieldName]: date ? date.toISOString().split('T')[0] : ""
  }));
};

  return (
    <>
      <EmployeeSearchBar searchQuery={searchQuery} handleSearch={handleSearchChange} />
      <table className="w-4/5 mx-auto my-5 border-separate border-spacing-y-2 table">
        <thead>
          <tr className="text-black text-center">
            <th>Employee&apos;s name</th>
            <th>Job Title</th>
            <th>Salary</th>
            <th>Hire date</th>
            <th>Contract</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <EmployeeTableRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
      {isManagerAuthorized && (
        <>
          <button
            className="absolute right-12 mb-8 ms-10 px-4 py-2 my-2 bg-yellow-500 text-white rounded cursor-pointer"
            onClick={() => setIsAddingEmployee(!isAddingEmployee)}
          >
            {isAddingEmployee ? "Cancel" : "Add Employee"}
          </button>
          {isAddingEmployee && (
            <EmployeeAddCard
              newEmployee={newEmployee}
              handleInputChange={handleInputChange}
              handleAddEmployee={handleAddEmployee}
              defaults={defaults}
              handleDateChange={handleDateChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default EmployeeTable;
