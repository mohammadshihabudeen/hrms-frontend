"use client";
import { Employee, updateEmployee } from '@/app/store/slices/employeeSlice';
import { RootState } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaArrowLeft, FaBirthdayCake, FaBriefcase, FaFlag, FaGraduationCap, FaMapMarkerAlt, FaMars, FaPencilAlt, FaPeopleCarry, FaPhone, FaSave, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

type params = {
    params: { id: string }
};

const EmployeeDetail = ({ params: { id } }: params) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const selectedEmployee = useSelector((state: RootState) =>
        state.employees.employees.find(emp => emp.id === id)
    );

    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingEmployment, setIsEditingEmployment] = useState(false);
    const [updatedEmployee, setUpdatedEmployee] = useState<Employee | undefined>(undefined);

    useEffect(() => {
        if (selectedEmployee) {
            setUpdatedEmployee(selectedEmployee);
        }
    }, [selectedEmployee]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedEmployee({ ...updatedEmployee!, [name]: value });
    };

    const handlePersonalEditToggle = () => {
        setIsEditingPersonal(!isEditingPersonal);
    };

    const handleEmploymentEditToggle = () => {
        setIsEditingEmployment(!isEditingEmployment);
    };

    const handleSave = () => {
        if (updatedEmployee) {
            dispatch(updateEmployee(updatedEmployee));
            setIsEditingPersonal(false);
            setIsEditingEmployment(false);
        }
    };

    const handleBack = () => {
        router.push('/pages/Employees');
    };

    if (!selectedEmployee) {
        return (
            <div>
                <h2>Employee not found</h2>
                <p>No employee with the ID {id} exists.</p>
            </div>
        );
    }

    return (
        <>
            <button className="backButton  px-3 py-1 rounded text-sm flex items-center" onClick={handleBack}>
                <FaArrowLeft className="mr-1" /> Back
            </button>
            <div className="max-w-lg  mt-8">
                <div className="card bg-white shadow-md rounded-lg mb-8">
                    <div className="card_header flex justify-between items-center mb-4">
                        <div className="text-xl font-bold">Personal Details</div>
                        <div className="flex items-center">
                            <FaPencilAlt className="text-white-500 cursor-pointer pencil" onClick={handlePersonalEditToggle} />
                            {isEditingPersonal && (
                                <FaSave className="text-white-500 cursor-pointer save" onClick={handleSave} />
                            )}
                        </div>
                    </div>
                    <div className="card_body flex">
                        <div className="flex-shrink-0">
                            <img src={selectedEmployee.profile} alt="Profile" className="w-20 h-20 rounded-full ml-4 mt-7 Eimg" />
                        </div>
                        <div className="card_content ml-4 w-full grid grid-cols-3 gap-4">
                            {[
                                { name: "employeeName", icon: <FaMars className='mx-3 ic '/>, value: updatedEmployee?.employeeName || '' },
                                { name: "marriedStatus", icon: <FaUser  className='mx-3 ic'/>, value: updatedEmployee?.marriedStatus || '' },
                                { name: "degree", icon: <FaGraduationCap className='mx-3 ic' />, value: updatedEmployee?.degree || '' },
                                { name: "location", icon: <FaMapMarkerAlt  className='mx-3 ic'/>, value: updatedEmployee?.location || '' },
                                { name: "dob", icon: <FaBirthdayCake  className='mx-3 ic' />, value: updatedEmployee?.dob || '' },
                                { name: "country", icon: <FaFlag  className='mx-3 ic'/>, value: updatedEmployee?.country || '' },
                                { name: "phone", icon: <FaPhone  className='mx-3 ic'/>, value: updatedEmployee?.phone || '' }
                            ].map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <div className="flex items-center mb-1">
                                        {item.icon}
                                        {isEditingPersonal ? (
                                            <input
                                                className="border border-gray-300 focus:outline-none rounded w-70 p-1 pinput"
                                                type="text"
                                                name={item.name}
                                                value={item.value}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <div>{`${item.value}`}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="card1 bg-white shadow-md rounded-lg mb-8">
                    <div className="card_header flex justify-between items-center mb-4">
                        <div className="text-xl font-bold edname">Employment Details</div>
                        <div className="flex items-center">
                            <FaPencilAlt className="text-white-500 cursor-pointer  pencil" onClick={handleEmploymentEditToggle} />
                            {isEditingEmployment && (
                                <FaSave className="text-white-500 cursor-pointer save" onClick={handleSave} />
                            )}
                        </div>
                    </div>
                    <div className="card_body flex">
                        <div className="card_content1 ml-4 w-full grid grid-cols-1 gap-4 justify-between">
                            {[
                                { label: "Job Title ", name: "jobTitle", icon: <FaBriefcase  className='mx-3 ic'/>, value: updatedEmployee?.jobTitle || '' , className: "data"},
                                { label: "Department ", name: "department", icon: <FaPeopleCarry  className='mx-3 ic'/>, value: updatedEmployee?.department || '',className: "data1" }
                            ].map((item, idx) => (
                                <div key={idx}  className='mb-4'>
                                    <div className="flex items-center mb-1">
                                        {item.icon} {item.label}
                                    {isEditingEmployment ? (
                                        <input
                                            className={`border border-gray-300 focus:outline-none rounded w-full p-1 einput ${item.className}`}
                                            type="text"
                                            name={item.name}
                                            value={item.value}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <div className={item.className}>{item.value}</div>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetail;
