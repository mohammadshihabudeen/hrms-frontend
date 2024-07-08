import React from "react";

interface Experience {
    id: number;
    companyName: string;
    startDate: string;
    endDate: string;
    position: string;
    document: string | null;
}

interface ExperienceCardProps {
    experience: Experience;
    onDelete: (id: number) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onDelete }) => {
    const handleViewDocument = () => {
        if (experience.document) {
            window.open(experience.document, '_blank');
        }
    };

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
                    onClick={handleViewDocument}
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

export default ExperienceCard;
