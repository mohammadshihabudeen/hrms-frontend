import React from "react";
import { useState } from "react";
import DocumentUploadButton from "../buttons/DocumentUploadButton";
import DocumentViewButton from "../buttons/DocumentViewButton";
interface EducationDetailProps {
  level: string;
  certificate: string | null;
  onEdit: (file: File) => void;
}

const EducationDetail = ({
  level,
  certificate,
  onEdit,
}: EducationDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (file: File) => {
    onEdit(file);
    setIsEditing(false);
  };

  return (
    <div className="relative gradient-card-gradient border-gray-200 rounded-lg p-4 m-4 w-72 shadow-2xl">
      <h3 className="text-white">{level}</h3>
      {isEditing ? (
        <input
          type="file"
          onChange={(e) => e.target.files && handleEdit(e.target.files[0])}
        />
      ) : (
        <div className="flex justify-between align-items-center">
          {certificate ? (
            <DocumentViewButton
              clickHandler={() => window.open(certificate)}
              isDisabled={!certificate}
              text="View"
            />
          ) : (
            <p className="text-white text-sm">Upload documents to view</p>
          )}
          <DocumentUploadButton
            clickHandler={() => setIsEditing(true)}
            text="Upload"
          />
        </div>
      )}
    </div>
  );
};

export default EducationDetail;
