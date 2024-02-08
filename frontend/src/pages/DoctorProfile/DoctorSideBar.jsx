import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiDashboard3Line } from "react-icons/ri";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";

const DoctorSideBar = ({handleClick}) => {
  const { state } = useContext(AuthContext);

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
      <div
        id="Dash"
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-orange-500 hover:text-white p-2 rounded-full cursor-pointer"
      >
        <RiDashboard3Line className="w-[25px] h-[25px]" />
        <h1 className="font-semibold">Dashboard</h1>
      </div>
      <div
        id="Pats"
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-orange-500 hover:text-white p-2 rounded-full cursor-pointer"
      >
        <AiOutlineMedicineBox className="w-[25px] h-[25px]" />
        <h1 className="font-semibold">My Patients</h1>
      </div>
      <div
        id="Appoints"
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-orange-500 hover:text-white p-2 rounded-full cursor-pointer"
      >
        <MdOutlineEventNote className="w-[25px] h-[25px]" />
        <h1 className="font-semibold">Appointments</h1>
      </div>
      <div
        id="Slots"
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-orange-500 hover:text-white p-2 rounded-full cursor-pointer"
      >
        <TbReport className="w-[25px] h-[25px]" />
        <h1 className="font-semibold">My Slots</h1>
      </div>
      <div
        id="Sets"
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-orange-500 hover:text-white p-2 rounded-full cursor-pointer"
      >
        <IoSettingsOutline className="w-[25px] h-[25px]" />
        <h1 className="font-semibold">Settings</h1>
      </div>
    </div>
  );
};

export default DoctorSideBar;
