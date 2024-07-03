"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { FaArrowLeft } from "react-icons/fa";
import {
  addExperience,
  deleteExperience,
} from "../../../store/slices/experienceSlice";

interface Experience {
  id: number;
  companyName: string;
  startDate: string; // Change Date to string
  endDate: string; // Change Date to string
  position: string;
  document: any;
}

interface ExperienceDetailProps {
  experience: Experience;
  onDelete: (id: number) => void;
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({
  experience,
  onDelete,
}) => {
  return (
    <div className="relative gradient-card-gradient border border-gray-200 rounded-lg p-4 m-4 w-full sm:w-72 shadow-lg text-white">
      <h3 className="text-lg font-semibold">
        Company Name: {experience.companyName}
      </h3>
      <p className="mt-2">
        Duration: {new Date(experience.startDate).toLocaleDateString()} -{" "}
        {new Date(experience.endDate).toLocaleDateString()}
      </p>
      <p className="mt-2">Position: {experience.position}</p>
      {experience.document ? (
        <button
          className="px-4 py-2 my-2 mr-4 bg-blue-600 text-white rounded cursor-pointer"
          onClick={() => window.open(experience.document)}
          disabled={!experience.document}
        >
          View Document
        </button>
      ) : (
        <p className="mt-2">Upload document to view</p>
      )}
      <button
        className="px-4 py-2 my-2 bg-red-600 text-white rounded cursor-pointer"
        onClick={() => onDelete(experience.id)}
      >
        Delete
      </button>
    </div>
  );
};

const Experience: React.FC = () => {
  const experiences = useSelector(
    (state: RootState) => state.experience.experiences
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form, setForm] = useState({
    companyName: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    position: "",
    document: null as string | null,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = (file: File) => {
    if (file) {
      setForm({ ...form, document: URL.createObjectURL(file) });
    } else {
      console.error("No file selected or file type is incorrect");
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddExperience = () => {
    setIsAdding(true);
  };

  const handleSubmit = () => {
    if (
      !form.companyName ||
      !form.startDate ||
      !form.endDate ||
      !form.position
    ) {
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
      startDate: form.startDate ? form.startDate.toISOString() : "", // Convert Date to ISO string
      endDate: form.endDate ? form.endDate.toISOString() : "", // Convert Date to ISO string
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
      <button
        className="flex items-center mb-4 ms-5 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleBack}
      >
        <FaArrowLeft />
        <span className="px-2">Back</span>
      </button>
      <h1 className="ms-5 text-2xl font-bold mb-4">Experience Details</h1>
      <button
        className="ms-10 px-4 py-2 my-2 bg-yellow-500 text-white rounded cursor-pointer"
        onClick={handleAddExperience}
      >
        Add Experience
      </button>
      {isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 m-10 w-auto md:w-96">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Company Name</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Enter company name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Start Date</label>
            <DatePicker
              selected={form.startDate}
              onChange={(date) => setForm({ ...form, startDate: date })}
              placeholderText="Select start date"
              dateFormat="yyyy/MM/dd"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">End Date</label>
            <DatePicker
              selected={form.endDate}
              onChange={(date) => setForm({ ...form, endDate: date })}
              placeholderText="Select end date"
              dateFormat="yyyy/MM/dd"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Position</label>
            <input
              type="text"
              value={form.position}
              onChange={(e) => handleChange("position", e.target.value)}
              placeholder="Enter position"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Document</label>
            <input
              type="file"
              onChange={(e: any) => handleEdit(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-around">
        {experiences.map((experience: any) => (
          <ExperienceDetail
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
