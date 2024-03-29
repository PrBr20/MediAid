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

const MediLabSideBar = () => {
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
          <p className="text-[12px] text-gray-500">Phone: 0{state?.user.phone}</p>
        </div>
      </div>
      
      <Label className="font-bold text-base text-gray-400 pl-2">Tests</Label>

      <NavLink
        to="alltests"
        className={(navClass) =>
          navClass.isActive ? setNavClass("alltests") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "alltests"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <TbReport className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">All Tests</h1>
        </div>
      </NavLink>

      <NavLink
        to="addtests"
        className={(navClass) =>
          navClass.isActive ? setNavClass("addtests") : null
        }
      >
        <div
          className={`flex items-center space-x-2   ${
            navClass == "addtests"
              ? "bg-orange-500 text-white"
              : "hover:bg-gray-100"
          } p-2 rounded-full cursor-pointer`}
        >
          <TbReport className="w-[25px] h-[25px]" />
          <h1 className="font-semibold">Add Tests</h1>
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

export default MediLabSideBar;
