"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaBirthdayCake,
  FaBriefcase,
  FaFlag,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMars,
  FaPencilAlt,
  FaPeopleCarry,
  FaPhone,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { RootState } from "@/app/store/store";
import { updateEmployee } from "@/app/services/employeeService";
import { EmployeeDetailCard } from "@/app/components/ui/cards/EmployeeDetailCard";
import { PersonelDetailCard } from "@/app/components/ui/cards/PersonelDetailCard";
import { MdEmail } from "react-icons/md";

type Params = {
  params: { id: string };
};

const EmployeeDetail: React.FC<Params> = ({ params: { id } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedEmployee = useAppSelector((state: RootState) => state.employees.employees.find(emp => emp.id === id));

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmployment, setIsEditingEmployment] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee | undefined>(undefined);

  useEffect(() => {
    if (selectedEmployee) {
      setUpdatedEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prev => ({ ...prev!, [name]: value }));
  };

  const handlePersonalEditToggle = () => {
    setIsEditingPersonal(!isEditingPersonal);
  };

  const handleEmploymentEditToggle = () => {
    setIsEditingEmployment(!isEditingEmployment);
  };

  const handleSave = () => {
    if (updatedEmployee) {
      dispatch(
        updateEmployee({
          id: updatedEmployee.id,
          employee: { ...updatedEmployee, updatedBy: "shihab" },
        }),
      );
      setIsEditingPersonal(false);
      setIsEditingEmployment(false);
    }
  };

  const handleBack = () => {
    router.push("/pages/Employees");
  };

  const personalDetails = [
    {
      name: "employeeName",
      icon: <FaMars className="mx-3 ic" />,
      value: updatedEmployee?.employeeName || "",
    },
    {
      name: "maritalStatus",
      icon: <FaUser className="mx-3 ic" />,
      value: updatedEmployee?.maritalStatus || "",
    },
    {
      name: "degree",
      icon: <FaGraduationCap className="mx-3 ic" />,
      value: updatedEmployee?.degree || "",
    },
    {
      name: "location",
      icon: <FaMapMarkerAlt className="mx-3 ic" />,
      value: updatedEmployee?.location || "",
    },
    {
      name: "dob",
      icon: <FaBirthdayCake className="mx-3 ic" />,
      value: updatedEmployee?.dob || "",
    },
    {
      name: "country",
      icon: <FaFlag className="mx-3 ic" />,
      value: updatedEmployee?.country || "",
    },
    {
      name: "phone",
      icon: <FaPhone className="mx-3 ic" />,
      value: updatedEmployee?.phone || "",
    },
    {
      name: "email",
      icon: <MdEmail className="mx-3 ic" />,
      value: updatedEmployee?.email || "",
    },
  ];

  const employmentDetails = [
    {
      label: "Job Title",
      name: "jobTitle",
      icon: <FaBriefcase className="mx-3 ic" />,
      value: updatedEmployee?.jobTitle || "",
      className: "data",
    },
    {
      label: "Department",
      name: "department",
      icon: <FaPeopleCarry className="mx-3 ic" />,
      value: updatedEmployee?.department || "",
      className: "data1",
    },
  ];

  if (!selectedEmployee) {
    return (
      <div>
        <h2>Employee not found</h2>
        <p>No employee with the ID {id} exists.</p>
      </div>
    );
  }

  return (
    <>
      <button className="backButton px-3 py-1 rounded text-sm flex items-center" onClick={handleBack}>
        <FaArrowLeft className="mr-1" /> Back
      </button>
      <div className="max-w-lg mt-8">
        <PersonelDetailCard
          name="Personal Details"
          icon={<FaPencilAlt className="text-white-500 cursor-pointer pencil" onClick={handlePersonalEditToggle} />}
          sicon={<FaSave className="text-white-500 cursor-pointer save" onClick={handleSave} />}
          isEditing={isEditingPersonal}
          selectedEmployee={selectedEmployee}
          details={personalDetails}
          handleInputChange={handleInputChange}
        />
        <EmployeeDetailCard
          name="Employee Details"
          icon={<FaPencilAlt className="text-white-500 cursor-pointer pencil" onClick={handleEmploymentEditToggle} />}
          sicon={<FaSave className="text-white-500 cursor-pointer save" onClick={handleSave} />}
          isEditing={isEditingEmployment}
          details={employmentDetails}
          handleInputChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default EmployeeDetail;
