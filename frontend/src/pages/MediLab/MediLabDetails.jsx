import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { PiClockCountdownFill } from "react-icons/pi";
import { TbCalendarStats } from "react-icons/tb";
import { TbDeviceWatchStats2 } from "react-icons/tb";
import Description from "@/components/MediLabDetails/Description";
import LabReviews from "@/components/MediLabDetails/Reviews";
// import Appointment from "./Appointment";
import { set } from "date-fns";

const MediLabDetails = () => {
  const { id } = useParams();

  const { state } = useContext(AuthContext);

  const [mediLab, setMediLab] = useState(null);

//   const [appointments, setAppointments] = useState(null);

  const [navClass, setNavClass] = useState("Description");

  const handleclick = (e) => {
    if (e.target.id == "Des") setNavClass("Description");
    else if (e.target.id == "Rev") setNavClass("Reviews");
  };

  useEffect(() => {
    const fetchMediLab = async () => {
      const res = await fetch(`${BASE_URL}/mediLab/fetch/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

    //   const queryString = new URLSearchParams({ mediLab: id }).toString();
    //   const res2 = await fetch(`${BASE_URL}/mediLab/tests/search?${queryString}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${state.token}`,
    //     },
    //   });

      if (!res.ok) {
        throw new Error(result1.message);
      }

    //   if (!res2.ok) {
    //     throw new Error(result2.message);
    //   }

      const result1 = await res.json();
    //   const result2 = await res2.json();

      setMediLab(result1.data);
    //   setAppointments(result2.data);
    };
    fetchMediLab();
  }, []);

  console.log(mediLab);

  return (
    mediLab != null && (
      <div className="flex mx-[180px] mt-[40px] space-x-10">
        <div className="w-2/3 flex-col space-y-3">
          <h1 className="text-3xl font-bold">{mediLab.name}</h1>
          <h1 className="text-xl font-bold">Phone: 0{mediLab.phone}</h1>
          {/* <div className="flex my-[10px]">
            <div className="flex mr-[10px] space-x-1">
              <PiClockCountdownFill className="text-orange-400 " />
              <p className="text-xs"> {doctor.patientCount} Patients</p>
            </div>
            <div className="flex mx-[10px] space-x-1">
              <TbCalendarStats className="text-orange-400 " />
              <p className="text-xs">
                {" "}
                Joined on {doctor.createdAt.split("T")[0]}{" "}
              </p>
            </div>
            <div className="flex mx-[10px]">
              <TbDeviceWatchStats2 className="text-orange-400 space-x-1" />
              <p className="text-xs"> {doctor.slotCount} slots available</p>
            </div>
          </div> */}
          <div className="border border-black rounded-xl overflow-hidden justify-center flex bg-slate-100">
            <img src={mediLab.photo} alt="" className="h-[400px]" />
          </div>
          <div className="navigation border rounded-lg overflow-hidden">
            <ul className="menu flex items-center">
              <li
                id="Des"
                className={`menu-item p-[10px] hover:cursor-pointer font-bold text-xl ${
                  navClass == "Description" ? "bg-orange-300" : ""
                }`}
                onClick={handleclick}
              >
                Overview
              </li>
              <li
                id="Rev"
                className={`menu-item p-[10px] hover:cursor-pointer font-bold text-xl ${
                  navClass == "Reviews" ? "bg-orange-300" : ""
                }`}
                onClick={handleclick}
              >
                Reviews
              </li>
            </ul>
            <hr className="border-black" />

            <div>
              {navClass == "Description" && (
                <Description mediLab={mediLab} />
                
              )}
              {navClass == "Reviews" && <LabReviews mediLab={mediLab} />}
            </div>
          </div>
        </div>
        {/* <div className="w-1/3 ">
          <Appointment apps={appointments} doctor={doctor}></Appointment>
        </div> */}
      </div>
    )
  );
};

export default MediLabDetails;
