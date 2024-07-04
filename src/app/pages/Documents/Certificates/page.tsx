// pages/Certificates.tsx

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addCertificate,
  deleteCertificate,
} from "../../../store/slices/certificateSlice";
import { AppDispatch, RootState } from "../../../store/store";

interface Certificate {
  id: number;
  courseTitle: string;
  startDate: string;
  endDate: string;
  courseProvider: string;
  document: any | null;
}

interface CertificateDetailProps {
  certificate: Certificate;
  onDelete: (id: number) => void;
}

const CertificateDetail: React.FC<CertificateDetailProps> = ({
  certificate,
  onDelete,
}) => {
  return (
    <div className="relative gradient-card-gradient border border-gray-200 rounded-lg p-4 m-4 w-full sm:w-72 shadow-lg text-white">
      <h3 className="text-lg font-semibold">
        Course Title: {certificate.courseTitle}
      </h3>
      <p className="mt-2">
        Duration: {new Date(certificate.startDate).toLocaleDateString()} -{" "}
        {new Date(certificate.endDate).toLocaleDateString()}
      </p>
      <p className="mt-2">Course Provider: {certificate.courseProvider}</p>
      {certificate.document ? (
        <button
          className="px-4 py-2 my-2 mr-4 bg-blue-600 text-white rounded cursor-pointer"
          onClick={() => window.open(certificate.document)}
          disabled={!certificate.document}
        >
          View Document
        </button>
      ) : (
        <p className="mt-2">Upload document to view</p>
      )}
      <button
        className="px-4 py-2 my-2 bg-red-600 text-white rounded cursor-pointer"
        onClick={() => onDelete(certificate.id)}
      >
        Delete
      </button>
    </div>
  );
};

const Certificates: React.FC = () => {
  const certificates = useSelector(
    (state: RootState) => state.certificates.certificates
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form, setForm] = useState({
    courseTitle: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    courseProvider: "",
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

  const handleAddCertificate = () => {
    setIsAdding(true);
  };

  const handleSubmit = () => {
    if (
      !form.courseTitle ||
      !form.startDate ||
      !form.endDate ||
      !form.courseProvider
    ) {
      setError("All fields are required");
      return;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      setError("End date cannot be earlier than start date");
      return;
    }

    const newCertificate = {
      id: certificates.length + 1,
      courseTitle: form.courseTitle,
      startDate: form.startDate ? form.startDate.toISOString() : "", // Convert Date to ISO string
      endDate: form.endDate ? form.endDate.toISOString() : "", // Convert Date to ISO string
      courseProvider: form.courseProvider,
      document: form.document,
    };

    dispatch(addCertificate(newCertificate));
    setForm({
      courseTitle: "",
      startDate: null,
      endDate: null,
      courseProvider: "",
      document: null,
    });
    setIsAdding(false);
    setError("");
  };

  const handleDeleteCertificate = (id: number) => {
    dispatch(deleteCertificate(id));
  };

  const handleBack = () => {
    router.push("/pages/Documents");
  };

  return (
    <div className="container mx-auto mt-4 ms-5 p-4">
        <button className="backButton1  px-3 py-1 rounded text-sm flex items-center" onClick={handleBack}>
                <FaArrowLeft className="mr-1" /> Back
            </button>
      <h1 className="ms-5 text-2xl font-bold mb-4">Certificate Details</h1>
      <button
        className="ms-10 px-4 py-2 my-2 bg-yellow-500 text-white rounded cursor-pointer"
        onClick={handleAddCertificate}
      >
        Add Certificate
      </button>
      {isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 m-10 w-auto md:w-96">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Course Title</label>
            <input
              type="text"
              value={form.courseTitle}
              onChange={(e) => handleChange("courseTitle", e.target.value)}
              placeholder="Enter course title"
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
            <label className="block text-sm font-bold mb-2">
              Course Provider
            </label>
            <input
              type="text"
              value={form.courseProvider}
              onChange={(e) => handleChange("courseProvider", e.target.value)}
              placeholder="Enter course provider"
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
        {certificates.map((certificate: Certificate) => (
          <CertificateDetail
            key={certificate.id}
            certificate={certificate}
            onDelete={handleDeleteCertificate}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
