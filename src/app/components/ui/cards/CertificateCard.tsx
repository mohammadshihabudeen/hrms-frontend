import React from 'react';
import DocumentViewButton from '../buttons/DocumentViewButton';

interface Certificate {
    id: number;
    courseTitle: string;
    startDate: string;
    endDate: string;
    courseProvider: string;
    document: string | null;
}

interface CertificateDetailProps {
    certificate: Certificate;
    onDelete: (id: number) => void;
}

const CertificateDetail: React.FC<CertificateDetailProps> = ({ certificate, onDelete }) => {
    const handleViewDocument = () => {
        if (certificate.document) {
            window.open(certificate.document, '_blank');
        }
    };

    return (
        <div className="relative gradient-card-gradient border border-gray-200 rounded-lg p-4 m-4 w-full sm:w-72 shadow-lg text-white">
            <h3 className="text-lg font-semibold">
                Course Title: {certificate.courseTitle}
            </h3>
            <p className="mt-2">
                Duration: {new Date(certificate.startDate).toLocaleDateString()} -{' '}
                {new Date(certificate.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2">Course Provider: {certificate.courseProvider}</p>
            {certificate.document ? (
                <DocumentViewButton
                    clickHandler={handleViewDocument}
                    isDisabled={!certificate.document} text="View Document"  />
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

export default CertificateDetail;
