import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const MyAppointments = () => {
  const [slots, setslots] = useState([]);
  const { state } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  const { "*": group } = useParams();

  const navigate = useNavigate();
  const handleAppointment = async (app) => {
    navigate("/prescription", { state: { app: app } });
  };

  useEffect(() => {
    const fetchSlots = async () => {
      let curdate = new Date().toISOString().split("T")[0];
      const res = await fetch(
        `${BASE_URL}/appointment/doctor/${state.user._id}?group=${group}&date=${curdate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      setslots(result.data);
    };

    const fetchAppointments = async () => {
      let curdate = new Date().toISOString().split("T")[0];
      console.log(curdate);
      const res = await fetch(
        `${BASE_URL}/appointment/patient/${state.user._id}?group=${group}&date=${curdate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      console.log(result);

      setAppointments(result.data);
    };

    if (state.user && state.role == "doctor") {
      fetchSlots();
    } else if (state.user && state.role == "patient") {
      fetchAppointments();
    }
  }, [group]);

  console.log(slots);

  return (
    <div className="flex-col space-y-5">
      <h1 className="font-bold text-3xl">Appointments</h1>
      <hr className="border-black" />

      {state.role == "doctor" &&
        slots.map((slot) => (
          <div>
            <h1 className="text-lg font-bold italic">
              {new Date(slot.date.split("T")[0]).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h1>
            <h1 className="text-sm font-bold italic">
              From : {slot.starthr}:{slot.startmin} &nbsp;&nbsp; To :{" "}
              {slot.endhr}:{slot.endmin}
            </h1>
            <div className="flex flex-row flex-wrap">
              {slot.appointments.map((app, index) => (
                <div className="flex-col m-[10px] w-[230px] rounded-lg border border-slate-400 overflow-hidden">
                  <div className="flex justify-center items-center">
                    <img
                      src={
                        state.role == "doctor"
                          ? app.user.photo
                          : app.doctor.photo
                      }
                      className="h-[100px] w-[100px] aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="flex-col space-y-1 p-3">
                    <p className="font-bold text-base text-center">
                      {state.role === "doctor"
                        ? app.user.name
                        : app.doctor.name}
                    </p>
                    <p className="font-bold text-base text-center">
                      {state.role === "doctor"
                        ? `Serial : ${app.serial}`
                        : null}
                    </p>
                    <div>
                      {/* <p className="text-sm">Date : {app.slot.date.split("T")[0]}</p> */}
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">
                        {/* Start : {app.slot.starthr}:{app.slot.startmin} */}
                      </p>
                      <p className="text-sm">
                        {/* End : {app.slot.endhr}:{app.slot.endmin} */}
                      </p>
                    </div>
                    {group == "current" && (
                      <Button
                        onClick={() => {
                          handleAppointment(app);
                        }}
                        className="w-full"
                      >
                        Add Prescription
                      </Button>
                    )}

                    {group == "upcoming" && null}

                    {group == "past" && (
                      <Button
                        onClick={() => {
                          handleAppointment(app);
                        }}
                        className="w-full"
                      >
                        View Prescription
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {state.role == "patient" && (
        <div className="flex flex-row flex-wrap">
          {appointments.map((app, index) => (
            <div className="flex-col m-[10px] w-[230px] rounded-lg border border-slate-400 overflow-hidden">
              <div className="flex justify-center items-center">
                <img
                  src={
                    state.role == "doctor" ? app.user.photo : app.doctor.photo
                  }
                  className="h-[100px] w-[100px] aspect-square"
                  alt=""
                />
              </div>
              <div className="flex-col space-y-1 p-3">
                <p className="font-bold text-base text-center">
                  {state.role === "doctor" ? app.user.name : app.doctor.name}
                </p>
                <div>
                  <p className="text-sm">
                    Date : {app.slot.date.split("T")[0]}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">
                    Start : {app.slot.starthr}:{app.slot.startmin}
                  </p>
                  <p className="text-sm">
                    End : {app.slot.endhr}:{app.slot.endmin}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    handleAppointment(app);
                  }}
                  className="w-full"
                >
                  View Prescription
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
