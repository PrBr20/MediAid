import React from "react";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import DoctorSideBar from "../DoctorProfile/DoctorSideBar";
import PatientSideBar from "../PatientProfile/PatientSideBar";
import MediLabSideBar from "../MediLabProfile/MediLabSideBar";
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
      {state?.role == "mediLab" && (
        <MediLabSideBar></MediLabSideBar>
      )}
      <div className="border-r border-gray-500 h-full min-h-[500px] "></div>
      <div className="w-3/4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserProfile;
