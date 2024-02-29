import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { PiClockCountdownFill } from "react-icons/pi";
import { TbCalendarStats } from "react-icons/tb";
import { TbDeviceWatchStats2 } from "react-icons/tb";
import TestDescription from "@/components/TestDetails/Description";
import TestReviews from "@/components/TestDetails/Reviews";
import { MyContext } from "@/context/MyContext";
import { Outlet } from "react-router-dom";
import MedCat from "@/assets/images/medcategory.svg";
import StarIcon from "@/assets/images/avgstar.png";
import ReviewIcon from "@/assets/images/reviews.png";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import TestAppointment from "./TestAppointment";
import { set } from "date-fns";
// import { Description } from "@radix-ui/react-dialog";

const TestDetails = () => {
  const { id } = useParams();

  const { state } = useContext(AuthContext);

  const [test, setTest] = useState(null);

  const [appointments, setAppointments] = useState(null);

  const [navClass, setNavClass] = useState("Description");

  const handleclick = (e) => {
    if (e.target.id == "Des") setNavClass("Description");
    else if (e.target.id == "Rev") setNavClass("Reviews");
  };


  useEffect(() => {
    const fetchTest = async () => {
      // let params = {};
      // params.testId=id

      // const queryString = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/test/fetch/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

        // const queryString = new URLSearchParams({ test: id }).toString();
        // const res2 = await fetch(`${BASE_URL}/test/appointments?${queryString}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${state.token}`,
        //   },
        // });

      if (!res.ok) {
        throw new Error(result.message);
      }

        // if (!res2.ok) {
        //   throw new Error(result.message);
        // }

      const result1 = await res.json();
        // const result2 = await res2.json();

      setTest(result1.data);
        // setAppointments(result2.data);
    };
    fetchTest();
  }, []);

  console.log(test);

  return (
    test != null && (
      <div className="flex mx-[180px] mt-[40px] space-x-10">
        <div className="w-2/3 flex-col space-y-3">
          <h1 className="text-3xl font-bold">{test.name}</h1>
          {/* <h1 className="text-xl font-bold">Phone: 0{mediLab.phone}</h1> */}
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
            <img src={test.image} alt="" className="h-[400px]" />
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
                <TestDescription test={test} />
                
              )}
              {navClass == "Reviews" && <TestReviews test={test} />}
            </div>
          </div>
        </div>
     {/*   <div className="w-1/3 ">
          <TestAppointment apps={appointments} test={test}></TestAppointment>
        </div> */}
      </div>
    )
  );
};

export default TestDetails;
