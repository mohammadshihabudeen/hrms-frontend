"use client";
import DocumentAddButton from "@/app/components/ui/buttons/DocumentAddButton";
import DocumentsBackButton from "@/app/components/ui/buttons/DocumentsBackButton";
import DocumentSubmitButton from "@/app/components/ui/buttons/DocumentSubmitButton";
import CertificateCard from "@/app/components/ui/cards/CertificateCard";
import { DatePickerInput, FileInput, TextInput } from "@/app/components/ui/cards/CertificateDetailsCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCertificate,
  fetchCertificates,
  removeCertificate,
} from "../../../store/slices/certificateSlice";
import { AppDispatch, RootState } from "../../../store/store";



const Certificates: React.FC = () => {
  const certificates = useSelector(
    (state: RootState) => state.certificates.certificates
  );
  const loading = useSelector((state: RootState) => state.certificates.loading);
  const error1 = useSelector((state: RootState) => state.certificates.error);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  const [form, setForm] = useState({
    courseTitle: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    courseProvider: "",
    document: null as string | null,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(error1);

  const handleEdit = (file: File | null) => {
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
    setIsAdding(!isAdding);
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

    dispatch(addNewCertificate(newCertificate));
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
    dispatch(removeCertificate(id));
  };

  const handleBack = () => {
    router.push("/pages/Documents");
  };

  return (
    <div className="container mx-auto mt-4 ms-5 p-4">
      <DocumentsBackButton handleClick={handleBack} text="Back"/>
      <h1 className="ms-5 text-2xl font-bold mb-4">Certificate Details</h1>
      <DocumentAddButton
        handleClick={handleAddCertificate}
        text="Add Certificate"
      />
      {isAdding && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 m-10 w-auto md:w-96">
          <TextInput
            label="Course Title"
            value={form.courseTitle}
            onChange={(value) => handleChange('courseTitle', value)}
            placeholder="Enter course title"
          />
          <DatePickerInput
            label="Start Date"
            selected={form.startDate}
            onChange={(date) => handleChange('startDate', date)}
            placeholder="Select start date"
          />
          <DatePickerInput
            label="End Date"
            selected={form.endDate}
            onChange={(date) => handleChange('endDate', date)}
            placeholder="Select end date"
          />
          <TextInput
            label="Course Provider"
            value={form.courseProvider}
            onChange={(value) => handleChange('courseProvider', value)}
            placeholder="Enter course provider"
          />
          <FileInput
            label="Document"
            onChange={handleEdit}
          />
          <DocumentSubmitButton handleClick={handleSubmit} text="Submit" />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
      <div className="flex flex-wrap justify-around">
        {certificates.map((certificate: Certificate) => (
          <CertificateCard
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
