// FormElements.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    placeholderText: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
    selectedDate,
    onChange,
    placeholderText,
}) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            placeholderText={placeholderText}
            dateFormat="yyyy/MM/dd"
            className="w-full px-3 py-2 border rounded"
        />
    );
};

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );
};

interface FileInputProps {
    onChange: (file: File | null) => void;
    label:string;
}

export const FileInput: React.FC<FileInputProps> = ({ onChange,label }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );
};
