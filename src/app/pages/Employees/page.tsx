"use client";
import EmployeeSearchBar from "@/app/components/ui/cards/EmployeeSearch";
import EmployeeTableRow from "@/app/components/ui/cards/EmployeeTableRow";
import { RootState } from "@/app/store/store";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

const EmployeeTable: React.FC = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <>
    <EmployeeSearchBar searchQuery={searchQuery} handleSearch={handleSearchChange} />
      <table className="w-4/5 mx-auto my-5 border-separate border-spacing-y-2 table">
        <thead>
          <tr className="text-black text-center">
            <th>Employee's name</th>
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
    </>
  );
};

export default EmployeeTable;
