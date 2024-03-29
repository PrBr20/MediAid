import React from "react";
import About from "../pages/About";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Login from "../pages/Login";
import UserDoctorProfile from "../pages/DoctorProfile/UserDoctorProfile";
import UserPatientProfile from "../pages/PatientProfile/UserPatientProfile";
import UserMedishopProfile from "../pages/MedishopProfile/UserMedishopProfile";
import { Routes, Route } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import Prescription from "@/components/Prescription/Prescription";
import TestReviews from "@/components/TestDetails/Reviews";
import TestDescription from "@/components/TestDetails/Description";
import MediShop from "@/pages/MediShop/MediShop";
import Dashboard from "@/pages/Profile/Dashboard";
import MyAppointments from "@/pages/Profile/MyAppointments";
// import LabDashboard from "@/pages/Profile/LabDashBoard";
// import MyLabAppointments from "@/pages/Profile/MyLabAppointments";
import MediLabSettings from "../pages/MediLabProfile/MediLabSettings";
import Settings from "@/pages/Profile/Settings";
import MyDoctors from "@/pages/PatientProfile/MyDoctors";
import MyPatients from "@/pages/DoctorProfile/MyPatients";
import MyReports from "@/pages/PatientProfile/MyReports";
import AllSlots from "@/pages/DoctorProfile/AllSlots";
import AddSlots from "@/pages/DoctorProfile/AddSlots";
import MedicineDetails from "../pages/MediShop/MedicineDetails";
import Overview from "../pages/MediShop/Overview";
import MedReview from "../pages/MediShop/MedReview";
import MediLabs from "../pages/MediLab/MediLab";
import MediLabDetails from "../pages/MediLab/MediLabDetails";
import UserMediLabProfile from "../pages/MediLabProfile/UserMediLabProfile";
// import MyLabPatients from "@/pages/MediLabProfile/MyLabPatient";
import AllLabTests from "@/pages/MediLabProfile/MediAlltests";
import AddLabTests from "@/pages/MediLabProfile/MediAddTests";

import AddMedicine from "../pages/MedishopProfile/AddMedicine";
import AllMedicine from "../pages/MedishopProfile/AllMedicine";
import Cart from "../pages/Cart/Cart";
import MyOrders from "../pages/PatientProfile/MyOrders";
import TestProfile from "../pages/TestProfile/TestProfile";
import AddTestSlot from "../pages/TestProfile/AddTestSlot";
import AllTestSlot from "../pages/TestProfile/AllTestSlot";
import TestAppointment from "../pages/TestProfile/TestProfileAppointment";
import TestProfileAppointment from "../pages/TestProfile/TestProfileAppointment";
import TestDetails from "@/pages/MediLab/TestDetails";
import MyLabAppointments from "@/pages/PatientProfile/MyLabAppointments";

const Routers = () => {
  const { state } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/medilab" element={<MediLabs />} />
      <Route path="/medilabs/:id" element={<MediLabDetails />} />
      <Route path="/medilabs/allTests/:id" element={<AllLabTests />} />
      <Route path="/user/allTests/:id" element={<AllLabTests />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path= "/tests/:id" element={<TestDetails/>}/> */}
      <Route path="/tests/reviews/:id" element={<TestReviews />} />

      {state?.role == "doctor" && (
        <Route path="/user" element={<UserDoctorProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<MyPatients />} />
          <Route path="appointments/*" element={<MyAppointments />}></Route>
          <Route path="allslots" element={<AllSlots />} />
          <Route path="addslots" element={<AddSlots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}
      {state?.role == "lab" && (
        <Route path="/user" element={<UserMediLabProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="patients" element={<MyPatients />} />
          <Route path="appointments" element={<MyAppointments />} />*/}
          <Route path="alltests" element={<AllLabTests />} />
          <Route path="addtests" element={<AddLabTests />} />
          <Route path="settings" element={<MediLabSettings />} />
        </Route>
      )}

      {state?.role == "patient" && (
        <Route path="/user" element={<UserPatientProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<MyDoctors />} />
          <Route path="appointments/*" element={<MyAppointments />} />
          <Route path="labappointments/*" element={<MyLabAppointments />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<MyOrders />} />
        </Route>
      )}

      <Route path="/testprofile/:id" element={<TestProfile />}>
        <Route path="addslots" element={<AddTestSlot />} />
        <Route path="allslots" element={<AllTestSlot />} />
        <Route path="appointments/*" element={<TestProfileAppointment />} />
      </Route>

      <Route path="/test/:id" element={<TestDetails />} />

      {state?.role == "company" && (
        <Route path="/user" element={<UserMedishopProfile />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medicines/addmedicine" element={<AddMedicine />} />
          <Route path="medicines/allmedicine" element={<AllMedicine />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}
      <Route path="/prescription" element={<Prescription />} />
      <Route path="/medishop" element={<MediShop />} />
      <Route path="/medicine/:medid" element={<MedicineDetails />}>
        <Route path="overview" element={<Overview />} />
        <Route path="reviews" element={<MedReview />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Routers;
