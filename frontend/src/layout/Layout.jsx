import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import Prescription from "@/components/Prescription/Prescription";
import { Toaster } from "@/components/ui/toaster";
import MedicineDetails from "../pages/MediShop/MedicineDetails";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routers />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
