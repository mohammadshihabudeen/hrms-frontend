import React, { useState } from "react";
interface EducationDetailProps {
  level: string;
  certificate: string | null;
  onEdit: (file: File) => void;
}

const EducationDetail: React.FC<EducationDetailProps> = ({
  level,
  certificate,
  onEdit,
}) => {
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
            <button
              className="px-4 mr-8 py-2 my-2 bg-blue-600 text-white rounded cursor-pointer"
              onClick={() => window.open(certificate)}
              disabled={!certificate}
            >
              View
            </button>
          ) : (
            <p className="text-white text-sm">Upload documents to view</p>
          )}
          <button
            className="px-4 py-2 my-2 bg-green-600 text-white rounded cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationDetail;
