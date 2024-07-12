"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  addEmployee,
  fetchEmployees,
  fetchDefaults,
} from "@/app/services/employeeService";
import EmployeeSearchBar from "@/app/components/ui/cards/EmployeeSearch";
import EmployeeTableRow from "@/app/components/ui/cards/EmployeeTableRow";
import EmployeeAddCard from "@/app/components/ui/cards/EmployeeAddCard";
import { v4 as uuidv4 } from "uuid";

const EmployeeTable: React.FC = () => {
  const uniqueId = uuidv4();
  const dispatch = useAppDispatch();
  const [defaults, setDefaults] = useState<any>({});
  const employees = useAppSelector((state) => state.employees.employees);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    employeeName: "",
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    const employeeToAdd = {
      ...newEmployee,
      id: Math.random().toString(36).substring(2, 8),
    };
    console.log(employeeToAdd);
    dispatch(addEmployee(employeeToAdd)).then(() => {
      dispatch(fetchEmployees()); // Fetch the updated list of employees after adding a new one
    });
    setIsAddingEmployee(false);
    setNewEmployee({
      id: "",
      employeeName: "",
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

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchDefaults()).then((action) => {
      if (fetchDefaults.fulfilled.match(action)) {
        setDefaults(action.payload);
      }
    });
  }, [dispatch]);

  return (
    <>
      <EmployeeSearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearchChange}
      />
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
          {filteredEmployees.map((employee) => (
            <EmployeeTableRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
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
        />
      )}
    </>
  );
};

export default EmployeeTable;
