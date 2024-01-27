import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/config";

const MyAppointments = () => {
  const { state } = useContext(AuthContext);

  const [appointments, setAppointments] = useState(null); 

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(`${BASE_URL}/appointment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(result.message);
      }

      console.log(res);

      const result = await res.json();

      setAppointments(result.data);
    };

    fetchAppointments();
  }, []);

  console.log(appointments);

  return (
    <div className="flex-col space-y-5">
      <h1 className="font-bold text-3xl">My Appointments</h1>
      <hr className="border-black" />
    </div>
  );
};

export default MyAppointments;
