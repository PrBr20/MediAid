import React from "react";
import { useState, useEffect, useContext } from "react";
import AddSlots from "./AddSlots";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AllSlots from "./AllSlots";
import { Outlet } from "react-router-dom";

const MySlots = () => {
  const [navClass, setNavClass] = useState("All Slots");

  const handleclick = (e) => {
    if (e.target.id == "allslots") setNavClass("All Slots");
    else if (e.target.id == "addslots") setNavClass("Add Slots");
  };

  return (
    <div className="flex-col space-y-5">
      <h1 className="font-bold text-3xl">My Slots</h1>

      <div className="navigation rounded-lg overflow-hidden">
        <ul className="menu flex items-center">
          <li
            id="allslots"
            className={`menu-item p-[10px] hover:cursor-pointer font-bold text-lg ${
              navClass == "Qualification" ? "bg-orange-300" : ""
            }`}
            onClick={handleclick}
          >
            All Slots
          </li>
          <li
            id="addslots"
            className={`menu-item p-[10px] hover:cursor-pointer font-bold text-lg ${
              navClass == "Reviews" ? "bg-orange-300" : ""
            }`}
            onClick={handleclick}
          >
            Add Slots
          </li>
        </ul>
        <hr className="border-black" />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MySlots;
