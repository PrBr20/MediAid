import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
  const [userdata, setUserData] = useState(null);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BASE_URL}/doctor/fetch/${state.user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setUserData(result.data);
    };

    if (state.user && state.role == "doctor") {
      fetchUser();
    }
  }, []);

  console.log(userdata);

  return (
    userdata != null && (
      <div className="flex-col space-y-5">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <hr className="border-black" />

        <div className="flex space-x-3 justify-between">
          <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3 bg-blue-300">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total Patients
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{userdata.patientCount}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3 bg-blue-300">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Joined on</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">
                {new Date(userdata.createdAt.split("T")[0]).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3 bg-blue-300">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Average Stars
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">
                {userdata.avgStars.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
