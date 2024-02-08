import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import UserProfile from "@/pages/User/UserProfile";
import Prescription from "@/components/Prescription/Prescription";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routers />
        {/* <UserProfile/> */}
        {/* <Prescription></Prescription> */}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
