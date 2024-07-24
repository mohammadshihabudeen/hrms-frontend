import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  newEmployee: Employee;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddEmployee: () => void;
  handleDateChange: (date: Date | null, fieldName: string) => void;
  defaults: {
    jobTitles: { id: string; title: string }[];
    jobRoles: { id: string; Role: string }[];
    maritalStatuses: { id: string; status: string }[];
    countries: { id: string; name: string }[];
    departments: { id: string; name: string }[];
    locations: { id: string; name: string }[];
  };
};

const EmployeeAddCard: React.FC<Props> = ({
  newEmployee,
  handleInputChange,
  handleAddEmployee,
  defaults,
  handleDateChange,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const checkRegistrationEmployeeIdStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/register/check-employeeId", {
        params: { employeeId: newEmployee.employeeId },
      });
      return response.data.registered;
    } catch (error) {
      console.error("Error checking registration status", error);
      return false;
    }
  };

  const validateFields = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!newEmployee.employeeName) newErrors.employeeName = "Employee name is required";
    if (!newEmployee.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!newEmployee.jobRole) newErrors.jobRole = "Job role is required";
    if (!newEmployee.salary) newErrors.salary = "Salary is required";
    if (!newEmployee.hireDate) newErrors.hireDate = "Hire date is required";
    if (!newEmployee.contract) newErrors.contract = "Contract is required";
    if (!newEmployee.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!newEmployee.degree) newErrors.degree = "Degree is required";
    if (!newEmployee.location) newErrors.location = "Location is required";
    if (!newEmployee.dob) newErrors.dob = "Date of birth is required";
    if (!newEmployee.country) newErrors.country = "Country is required";
    if (!newEmployee.phone) newErrors.phone = "Phone is required";
    if (!newEmployee.department) newErrors.department = "Department is required";
    if (!newEmployee.email) newErrors.email = "Email is required";
    if (!newEmployee.employeeId) newErrors.employeeId = "Employee Id is required";
    if (newEmployee.employeeId) {
      const isRegistered = await checkRegistrationEmployeeIdStatus();
      if (isRegistered) {
        newErrors.employeeId = "Employee Id is already taken";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (await validateFields()) {
      handleAddEmployee();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-5 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-center text-2xl font-semibold mb-6">Add New Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="employeeName" className="block text-gray-700">
            Employee Name
          </label>
          <input
            id="employeeName"
            className={`w-full border rounded-lg p-2 mt-1 ${
              errors.employeeName ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={newEmployee.employeeName}
            onChange={handleInputChange}
          />
          {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName}</p>}
        </div>
        <div>
          <label htmlFor="employeeId" className="block text-gray-700">
            Employee Id
          </label>
          <input
            id="employeeId"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.employeeId ? "border-red-500" : "border-gray-300"}`}
            type="text"
            name="employeeId"
            placeholder="Employee Id"
            value={newEmployee.employeeId}
            onChange={handleInputChange}
          />
          {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-gray-700">
            Job Title
          </label>
          <select
            id="jobTitle"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.jobTitle ? "border-red-500" : "border-gray-300"}`}
            name="jobTitle"
            value={newEmployee.jobTitle}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.jobTitles.map(jobTitle => (
              <option key={jobTitle.id} value={jobTitle.title}>
                {jobTitle.title}
              </option>
            ))}
          </select>
          {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
        </div>
        <div>
          <label htmlFor="jobRole" className="block text-gray-700">
            Job Role
          </label>
          <select
            id="jobRole"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.jobRole ? "border-red-500" : "border-gray-300"}`}
            name="jobRole"
            value={newEmployee.jobRole}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.jobRoles.map(jobRole => (
              <option key={jobRole.id} value={jobRole.Role}>
                {jobRole.Role}
              </option>
            ))}
          </select>
          {errors.jobRole && <p className="text-red-500 text-sm">{errors.jobRole}</p>}
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-700">
            Salary
          </label>
          <input
            id="salary"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.salary ? "border-red-500" : "border-gray-300"}`}
            type="text"
            name="salary"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={handleInputChange}
          />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>
        <div>
          <label htmlFor="hireDate" className="block text-gray-700">
            Hire Date
          </label>
          <DatePicker
            id="hireDate"
            className={`datepicker border rounded-lg p-2 mt-1 ${
              errors.hireDate ? "border-red-500" : "border-gray-300"
            }`}
            selected={newEmployee.hireDate ? new Date(newEmployee.hireDate) : null}
            onChange={(date: Date | null) => handleDateChange(date, "hireDate")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Hire Date"
          />
          {errors.hireDate && <p className="text-red-500 text-sm">{errors.hireDate}</p>}
        </div>
        <div>
          <label htmlFor="contract" className="block text-gray-700">
            Contract
          </label>
          <input
            id="contract"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.contract ? "border-red-500" : "border-gray-300"}`}
            type="text"
            name="contract"
            placeholder="Contract"
            value={newEmployee.contract}
            onChange={handleInputChange}
          />
          {errors.contract && <p className="text-red-500 text-sm">{errors.contract}</p>}
        </div>
        <div>
          <label htmlFor="maritalStatus" className="block text-gray-700">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            className={`w-full border rounded-lg p-2 mt-1 ${
              errors.maritalStatus ? "border-red-500" : "border-gray-300"
            }`}
            name="maritalStatus"
            value={newEmployee.maritalStatus}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.maritalStatuses.map(status => (
              <option key={status.id} value={status.status}>
                {status.status}
              </option>
            ))}
          </select>
          {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
        </div>
        <div>
          <label htmlFor="degree" className="block text-gray-700">
            Degree
          </label>
          <input
            id="degree"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.degree ? "border-red-500" : "border-gray-300"}`}
            type="text"
            name="degree"
            placeholder="Degree"
            value={newEmployee.degree}
            onChange={handleInputChange}
          />
          {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700">
            Location
          </label>
          <select
            id="location"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.location ? "border-red-500" : "border-gray-300"}`}
            name="location"
            value={newEmployee.location}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.locations.map(location => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
        <div>
          <label htmlFor="dob" className="block text-gray-700">
            Date of Birth
          </label>
          <DatePicker
            id="dob"
            className={`datepicker border rounded-lg p-2 mt-1 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
            selected={newEmployee.dob ? new Date(newEmployee.dob) : null}
            onChange={(date: Date | null) => handleDateChange(date, "dob")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date of Birth"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="country" className="block text-gray-700">
            Country
          </label>
          <select
            id="country"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.country ? "border-red-500" : "border-gray-300"}`}
            name="country"
            value={newEmployee.country}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.countries.map(country => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            type="text"
            name="phone"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="department" className="block text-gray-700">
            Department
          </label>
          <select
            id="department"
            className={`w-full border rounded-lg p-2 mt-1 ${errors.department ? "border-red-500" : "border-gray-300"}`}
            name="department"
            value={newEmployee.department}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {defaults.departments.map(department => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 w-full md:w-auto bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={onSubmit}
      >
        Save Employee
      </button>
    </div>
  );
};

export default EmployeeAddCard;
