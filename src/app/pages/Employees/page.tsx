"use client"
import { selectEmployee } from '@/app/store/slices/employeeSlice';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeTable: React.FC = () => {
    const employees = useSelector((state: RootState) => state.employees.employees);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEmployeeClick = (id: string) => {
        dispatch(selectEmployee(id));
    };

    return (
        <>
            <div className="relative w-4/5 mx-auto my-12 search">
                <input
                    className="w-11/12 p-4 bg-blue-100 rounded-lg border-none outline-none text-base text-gray-800 pl-10 searchbar"
                    placeholder="Enter the name of the employee..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <FaSearch className="fa fa-search absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-600 text-lg"/>
            </div>
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
                        <tr key={employee.id} className="text-center rounded-lg shadow-md bg-white trow">
                            <td className="text-center flex items-center rounded-l-lg ename">
                                <Link href={`/pages/Employees/Details/${employee.id}`} passHref legacyBehavior>
                                    <a className="no-underline text-inherit block w-full h-full flex items-center rowLink">
                                        <img src={employee.profile} alt="employee" className="w-10 h-10 rounded-full mx-4 profile" />
                                        {employee.employeeName}
                                        <div className="line"></div>
                                    </a>
                                </Link>
                            </td>
                            <td className="py-4 px-2 jt">
                                <Link href={`/pages/Employees/Details/${employee.id}`} passHref legacyBehavior>
                                    <a className="no-underline text-inherit block w-full h-full rowLink">
                                        {employee.jobTitle}
                                        <div className="line"></div>
                                    </a>
                                </Link>
                            </td>
                            <td className="text-blue-400 py-4 px-2 salary">
                                <Link href={`/pages/Employees/Details/${employee.id}`} passHref legacyBehavior>
                                    <a className="no-underline text-inherit block w-full h-full rowLink">
                                        {employee.salary}
                                        <div className="line"></div>
                                    </a>
                                </Link>
                            </td>
                            <td className="text-gray-600 py-4 px-2 hd">
                                <Link href={`/pages/Employees/Details/${employee.id}`} passHref legacyBehavior>
                                    <a className="no-underline text-inherit block w-full h-full rowLink">
                                        {employee.hireDate}
                                        <div className="line"></div>
                                    </a>
                                </Link>
                            </td>
                            <td className="rounded-r-lg py-4 px-2">{employee.contract}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default EmployeeTable;
