"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { updateDetail } from "../../../store/slices/educationSlice";
import EducationDetail from "../../../components/EducationDetail";
import { FaArrowLeft } from "react-icons/fa";
const Education: React.FC = () => {
  const details = useSelector((state: RootState) => state.education.details);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = (level: string, file: File) => {
    const newDetails = { ...details, [level]: URL.createObjectURL(file) };
    dispatch(updateDetail({ level, certificate: newDetails[level] }));
  };

  const handleBack = () => {
    router.push("/pages/Documents");
  };

  return (
    <div className="container mx-auto mt-4 ms-5 p-4">
      <button
        className=" flex items-center  mb-4 ms-5 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleBack}
      >
        <FaArrowLeft />
        <span className="px-2">Back</span>
      </button>
      <h1 className="ms-5 text-2xl font-bold mb-4">Education Details</h1>
      <div className="flex flex-wrap justify-around">
        {Object.keys(details).map((level) => (
          <EducationDetail
            key={level}
            level={level}
            certificate={details[level]}
            onEdit={(file) => handleEdit(level, file)}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
