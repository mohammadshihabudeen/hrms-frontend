"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EducationDetail from "../../../components/EducationDetail";
import { updateDetail } from "../../../store/slices/educationSlice";
import { RootState } from "../../../store/store";
import DocumentsBackButton from "@/app/components/ui/buttons/DocumentsBackButton";

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
      <DocumentsBackButton handleClick={handleBack} text="Back" />
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
