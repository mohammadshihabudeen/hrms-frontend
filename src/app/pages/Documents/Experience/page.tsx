"use client"
import DocumentAddButton from "@/app/components/ui/buttons/DocumentAddButton";
import DocumentsBackButton from "@/app/components/ui/buttons/DocumentsBackButton";
import DocumentSubmitButton from "@/app/components/ui/buttons/DocumentSubmitButton";
import { DatePickerInput } from "@/app/components/ui/cards/CertificateDetailsCard";
import ExperienceCard from "@/app/components/ui/cards/ExperienceCard";
import { FileInput, Input } from "@/app/components/ui/cards/ExperienceDetails";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, deleteExperience } from "../../../store/slices/experienceSlice";
import { AppDispatch, RootState } from "../../../store/store";

const Experience: React.FC = () => {
  const experiences = useSelector((state: RootState) => state.experience.experiences);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form, setForm] = useState({
    companyName: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    position: "",
    document: null as File | null,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = (file: File | null) => {
    setForm({ ...form, document: file });
  };

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddExperience = () => {
    setIsAdding(!isAdding);
  };

  const handleSubmit = () => {
    if (!form.companyName || !form.startDate || !form.endDate || !form.position || !form.document) {
      setError("All fields are required");
      return;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      setError("End date cannot be earlier than start date");
      return;
    }

    const newExperience = {
      id: experiences.length + 1,
      companyName: form.companyName,
      startDate: form.startDate ? form.startDate.toISOString() : "",
      endDate: form.endDate ? form.endDate.toISOString() : "",
      position: form.position,
      document: form.document,
    };

    dispatch(addExperience(newExperience));
    setForm({
      companyName: "",
      startDate: null,
      endDate: null,
      position: "",
      document: null,
    });
    setIsAdding(false);
    setError("");
  };

  const handleDeleteExperience = (id: number) => {
    dispatch(deleteExperience(id));
  };

  const handleBack = () => {
    router.push("/pages/Documents");
  };

  return (
    <div className="container mx-auto mt-4 ms-5 p-4">
      <DocumentsBackButton handleClick={handleBack} text="Back"/>
      <h1 className="ms-5 text-2xl font-bold mb-4">Experience Details</h1>
      <DocumentAddButton handleClick={handleAddExperience} text="Add Experience"/>
      {isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 m-10 w-auto md:w-96">
          <Input
            label="Company Name"
            value={form.companyName}
            onChange={(value: any) => handleChange("companyName", value)}
            placeholder="Enter company name"
          />
          <DatePickerInput
            selected={form.startDate}
            onChange={(date) => setForm({ ...form, startDate: date })}
            placeholder="Select start date" label={"Start Date"}          />
          <DatePickerInput
            selected={form.endDate}
            onChange={(date) => setForm({ ...form, endDate: date })}
            placeholder="Select end date" label={"End Date"}          />
          <Input
            label="Position"
            value={form.position}
            onChange={(value: any) => handleChange("position", value)}
            placeholder="Enter position"
          />
          <FileInput onChange={handleEdit} label={"Documents"} />
          <DocumentSubmitButton handleClick={handleSubmit} text="Submit" />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-around">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onDelete={handleDeleteExperience}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
