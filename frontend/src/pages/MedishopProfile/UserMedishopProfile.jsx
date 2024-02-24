import React from "react";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import PatientSideBar from "../PatientProfile/PatientSideBar";
import MedishopSideBar from "../MedishopProfile/MedishopSideBar"
import { Outlet } from "react-router-dom";

const UserProfile = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="mx-[180px] mt-[40px] min-h-[500px] flex justify-between">
      {state?.role == "patient" && (
        <PatientSideBar ></PatientSideBar>
      )}
      {state?.role == "doctor" && (
        <DoctorSideBar ></DoctorSideBar>
      )}
      {state?.role == "company" && (
        <MedishopSideBar ></MedishopSideBar>
      )}
      <div className="border-r border-gray-500 h-full min-h-[500px] "></div>
      <div className="w-3/4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserProfile;
