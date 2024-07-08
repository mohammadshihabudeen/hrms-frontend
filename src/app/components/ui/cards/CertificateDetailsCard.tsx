import React from 'react';
import DatePicker from 'react-datepicker';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder }) => {
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

interface DatePickerInputProps {
    label: string;
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ label, selected, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <DatePicker
                selected={selected}
                onChange={onChange}
                placeholderText={placeholder}
                dateFormat="yyyy/MM/dd"
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );
};

interface FileInputProps {
    label: string;
    onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{label}</label>
            <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );
};

export { DatePickerInput, FileInput, TextInput };

