import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect } from "react";
import { selectIsAdminAuthorized, setSession } from "../../../store/slices/sessionSlice";
import { RootState } from "../../../store/store";
import SendMailButton from "../buttons/SendMailButton";

interface DetailCardProps {
  name: string;
  icon: React.ReactNode;
  sicon: React.ReactNode;
  isEditing: boolean;
  selectedEmployee: any;
  details: Array<{ name: string; icon: React.ReactNode; value: string; options?: string[] }>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PersonelDetailCard: React.FC<DetailCardProps> = ({
  name,
  icon,
  sicon,
  isEditing,
  selectedEmployee,
  details,
  handleInputChange,
}) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const isAdminAuthorized = useAppSelector((state: RootState) => selectIsAdminAuthorized(state));

  useEffect(() => {
    if (session) {
      dispatch(setSession(session));
    }
  }, [session, dispatch]);

  return (
    <div className="card bg-white shadow-md rounded-lg mb-8">
      <div className="card_header flex justify-between items-center mb-4">
        <div className="text-xl font-bold">{name}</div>
        <div className="flex items-center">
          {isAdminAuthorized && (
            <>
              {icon}
              {isEditing && sicon}
            </>
          )}
        </div>
      </div>
      <div className="card_body flex">
        <div className="flex-shrink-0">
          <Image
            src={selectedEmployee.profile}
            alt="Profile"
            className="w-20 h-20 rounded-full ml-4 mt-7 Eimg"
            width="50"
            height="50"
          />
        </div>
        <div className="card_content ml-4 w-full grid grid-cols-3 gap-4">
          {details.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex items-center mb-1">
                {item.icon}
                {isEditing ? (
                  item.options ? (
                    <select
                      name={item.name}
                      value={item.value}
                      onChange={handleInputChange}
                      className="border border-gray-300 focus:outline-none rounded w-70 p-1 selectF"
                    >
                      {item.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="border border-gray-300 focus:outline-none rounded w-70 p-1 pinput"
                      type="text"
                      name={item.name}
                      value={item.value}
                      onChange={handleInputChange}
                    />
                  )
                ) : (
                  <div>{item.value}</div>
                )}
              </div>
            </div>
          ))}
          <SendMailButton email={selectedEmployee.email} employeeName={selectedEmployee.employeeName} employeeId={selectedEmployee.employeeId} />
        </div>
      </div>
    </div>
  );
};
