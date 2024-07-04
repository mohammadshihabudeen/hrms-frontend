"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import EducationDetail from "../../../components/EducationDetail";
import { updateDetail } from "../../../store/slices/educationSlice";
import { RootState } from "../../../store/store";
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
              <button className="backButton1  px-3 py-1 rounded text-sm flex items-center" onClick={handleBack}>
                <FaArrowLeft className="mr-1" /> Back
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
