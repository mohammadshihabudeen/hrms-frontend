import React, { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import { RootState } from "../../../store/store";
import { setSession, selectIsAdminAuthorized } from "../../../store/slices/sessionSlice";

interface DetailCardProps {
  name: string;
  icon: React.ReactNode;
  sicon: React.ReactNode;
  isEditing: boolean;
  details: empdetails[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
interface empdetails {
  label: string;
  className: string;
  icon: React.ReactNode;
  value: string;
  name: string;
}
export const EmployeeDetailCard: React.FC<DetailCardProps> = ({
  name,
  icon,
  sicon,
  isEditing,
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
    <>
      <div className="card1 bg-white shadow-md rounded-lg mb-8">
        <div className="card_header flex justify-between items-center mb-4">
          <div className="text-xl font-bold edname">{name}</div>
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
          <div className="card_content1 ml-4 w-full grid grid-cols-1 gap-4 justify-between">
            {details.map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-center mb-1">
                  {item.icon} {item.label}
                  {isEditing ? (
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
    </>
  );
};
