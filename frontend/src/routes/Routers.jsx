import React from "react";

import About from "../pages/About";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors/Doctors";
import MediShop from "../pages/MediShop/MediShop";
import Medilab from "../pages/MediLab/Medilab";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Login from "../pages/Login";
import UserDoctorProfile from "../pages/DoctorProfile/UserDoctorProfile";
import UserPatientProfile from "../pages/PatientProfile/UserPatientProfile";
import { Routes, Route } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import Prescription from "@/components/Prescription/Prescription";

const Routers = () => {
  const { state } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/medishop" element={<MediShop />} />
      <Route path="/medilab" element={<Medilab />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      {state?.role == "patient" && (
        <Route path="/user" element={<UserPatientProfile />} />
      )}
      {state?.role == "doctor" && (
        <Route path="/user" element={<UserDoctorProfile />} />
      )}
      <Route path="/prescription" element={<Prescription />} />
    </Routes>
  );
};

export default Routers;
