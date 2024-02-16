import React from "react";
import About from "../pages/About";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Login from "../pages/Login";
import UserDoctorProfile from "../pages/DoctorProfile/UserDoctorProfile";
import UserPatientProfile from "../pages/PatientProfile/UserPatientProfile";
import { Routes, Route } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import Prescription from "@/components/Prescription/Prescription";
import MediShop from "@/pages/MediShop/MediShop";
import Dashboard from "@/pages/Profile/Dashboard";
import MyAppointments from "@/pages/Profile/MyAppointments";
import LabDashboard from "@/pages/Profile/LabDashBoard";
import MyLabAppointments from "@/pages/Profile/MyLabAppointments";
import Settings from "@/pages/Profile/Settings";
import MyDoctors from "@/pages/PatientProfile/MyDoctors";
import MyPatients from "@/pages/DoctorProfile/MyPatients";
import MyReports from "@/pages/PatientProfile/MyReports";
import AllSlots from "@/pages/DoctorProfile/AllSlots";
import AddSlots from "@/pages/DoctorProfile/AddSlots";
import MedicineDetails from "../pages/MediShop/MedicineDetails";
import Overview from "../pages/MediShop/Overview";
import MedReview from "../pages/MediShop/MedReview";
import Medilab from "../pages/MediLab/MediLab";
// import MediLabDetails from "../pages/MediLab/MediLabDetails";
import UserMediLabProfile from "../pages/MediLabProfile/UserMediLabProfile";
import MyLabPatients from "@/pages/MediLabProfile/MyLabPatient";
import AllLabSlots from "@/pages/MediLabProfile/MediAllSlots";
import AddLabSlots from "@/pages/MediLabProfile/MediAddSlots";


const Routers = () => {
  const { state } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/mediLab" element={<Medilab />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />

      {state?.role == "doctor" && (
        <Route path="/user" element={<UserDoctorProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<MyPatients />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="allslots" element={<AllSlots />} />
          <Route path="addslots" element={<AddSlots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}

      {state?.role == "patient" && (
        <Route path="/user" element={<UserPatientProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<MyDoctors />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}

      {state?.role == "mediLab" && (
        <Route path="/user" element={<UserMediLabProfile />}>
          <Route path="LabDashboard" element={<LabDashboard />} />
          <Route path="LabPatients" element={<MyLabPatients />} />
          <Route path="LabAppoinments" element={<MyLabAppointments />} />
          <Route path="allLabslots" element={<AllLabSlots />} />
          <Route path="addLabslots" element={<AddLabSlots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}

      <Route path="/prescription" element={<Prescription />} />
      <Route path="/medishop" element={<MediShop />} />
      <Route path="/medicine/:medid" element={<MedicineDetails />}>
        <Route path="overview" element={<Overview />} />
        <Route path="reviews" element={<MedReview />} />
      </Route>
    </Routes>
  );
};

export default Routers;
