import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiDashboard3Line } from "react-icons/ri";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Label } from "@/components/ui/label";

const DoctorSideBar = () => {
  const { state } = useContext(AuthContext);

  const [navClass, setNavClass] = useState("dashboard");

  console.log(state?.user);
  return (
    <div className="w-1/5 h-[500px] flex flex-col space-y-2">
      <div className="flex space-x-5 items-center my-[10px]">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src={state?.user.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="items-center">
          <h1 className="text-md">{state?.user.name}</h1>
          <p className="text-[12px] text-gray-500">Specialist</p>
        </div>
      </div>
      <NavLink
        to="dashboard"
        className={(navClass) =>
          navClass.isActive ? setNavClass("dashboard") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "dashboard"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <RiDashboard3Line className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">Dashboard</h1>
        </div>
      </NavLink>
      <NavLink
        to="patients"
        className={(navClass) =>
          navClass.isActive ? setNavClass("patients") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "patients"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <AiOutlineMedicineBox className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">My Patients</h1>
        </div>
      </NavLink>

      <NavLink
        to="appointments"
        className={(navClass) =>
          navClass.isActive ? setNavClass("appointments") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "appointments"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <MdOutlineEventNote className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">Appointments</h1>
        </div>
      </NavLink>

      <hr className="border border-black" />

      <Label className="font-bold text-base text-gray-400 pl-2">My Slots</Label>

      <NavLink
        to="allslots"
        className={(navClass) =>
          navClass.isActive ? setNavClass("allslots") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "allslots"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <TbReport className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">All Slots</h1>
        </div>
      </NavLink>

      <NavLink
        to="addslots"
        className={(navClass) =>
          navClass.isActive ? setNavClass("addslots") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "addslots"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <TbReport className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">Add Slots</h1>
        </div>
      </NavLink>

      <hr className="border border-black" />

      <NavLink
        to="settings"
        className={(navClass) =>
          navClass.isActive ? setNavClass("settings") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "settings"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <IoSettingsOutline className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">Settings</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default DoctorSideBar;
