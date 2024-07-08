import Link from "next/link";
import React from "react";

interface Employee {
    id: string;
    employeeName: string;
    profile: string;
    jobTitle: string;
    salary: string;
    hireDate: string;
    contract: string;
}

interface EmployeeTableRowProps {
    employee: Employee;
}

const EmployeeTableRow: React.FC<EmployeeTableRowProps> = ({ employee }) => {
    return (
        <tr
            key={employee.id}
            className="text-center rounded-lg shadow-md bg-white trow"
        >
            <td className="text-center flex items-center rounded-l-lg ename">
                <Link
                    href={`/pages/Employees/Details/${employee.id}`}
                    passHref
                    legacyBehavior
                >
                    <a className="no-underline text-inherit block w-full h-full flex items-center rowLink">
                        <img
                            src={employee.profile}
                            alt="employee"
                            className="w-10 h-10 rounded-full mx-4 profile"
                        />
                        {employee.employeeName}
                        <div className="line"></div>
                    </a>
                </Link>
            </td>
            <td className="py-4 px-2 jt">
                <Link
                    href={`/pages/Employees/Details/${employee.id}`}
                    passHref
                    legacyBehavior
                >
                    <a className="no-underline text-inherit block w-full h-full rowLink">
                        {employee.jobTitle}
                        <div className="line"></div>
                    </a>
                </Link>
            </td>
            <td className="text-blue-400 py-4 px-2 salary">
                <Link
                    href={`/pages/Employees/Details/${employee.id}`}
                    passHref
                    legacyBehavior
                >
                    <a className="no-underline text-inherit block w-full h-full rowLink">
                        {employee.salary}
                        <div className="line"></div>
                    </a>
                </Link>
            </td>
            <td className="text-gray-600 py-4 px-2 hd">
                <Link
                    href={`/pages/Employees/Details/${employee.id}`}
                    passHref
                    legacyBehavior
                >
                    <a className="no-underline text-inherit block w-full h-full rowLink">
                        {employee.hireDate}
                        <div className="line"></div>
                    </a>
                </Link>
            </td>
            <td className="rounded-r-lg py-4 px-2">{employee.contract}</td>
        </tr>
    );
};

export default EmployeeTableRow;
