import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchQuery: string;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeSearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch }) => {
    return (
        <div className="relative w-4/5 mx-auto my-12 search">
            <input
                className="w-11/12 p-4 bg-blue-100 rounded-lg border-none outline-none text-base text-gray-800 pl-10 searchbar"
                placeholder="Enter the name of the employee..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <FaSearch className="fa fa-search absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-600 text-lg" />
        </div>
    );
};

export default EmployeeSearchBar;
