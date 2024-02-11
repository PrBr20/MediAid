import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PiClockCountdownFill } from "react-icons/pi";
import { TbCalendarStats } from "react-icons/tb";
import { TbDeviceWatchStats2 } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { BASE_URL } from "@/config";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "date-fns";
import AvgStar from "@/assets/images/avgstar.png";

const Medilab = () => {
  const { state, setState } = useContext(AuthContext);
  // console.log(state);

  const [specialization, setSpecialization] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState({
    name: "",
    rating: 0,
    feeLower: 0,
    feeUpper: 1000,
    specialization: "all",
    timerange: "all",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      let params = {};

      // Conditionally add parameters to the object
      if (search.name != "") params.name = search.name;
      if (search.rating) params.rating = search.rating;
      if (search.feeLower > -1) params.feeLower = search.feeLower;
      if (search.feeUpper) params.feeUpper = search.feeUpper;
      if (search.specialization != "all")
        params.specialization = search.specialization;
      if (search.timerange != "all") params.timerange = search.timerange;

      const queryString = new URLSearchParams(params).toString();

      const res1 = await fetch(`${BASE_URL}/doctor/search?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      console.log(queryString);

      const res2 = await fetch(`${BASE_URL}/specialization`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (!res1.ok) {
        throw new Error(result1.message);
      }
      if (!res2.ok) {
        throw new Error(result.message);
      }

      const result1 = await res1.json();
      const result2 = await res2.json();

      console.log(result1.data);

      setDoctors(result1.data);
      setSpecialization(result2.data);
    };

    if (state.user) {
      fetchDoctors();
    }
  }, [search]);

  const handleChange = (name, value) => {
    if (name == "feeUpper") {
      setSearch({ ...search, feeLower: 0 });
      setSearch({ ...search, [name]: value[0] });
    } else setSearch({ ...search, [name]: value });
  };
  console.log(search);

  // console.log(state);

  return (
    <div className="mx-4 my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          style={{ backgroundColor: '#fff4f6' }} // Set background color here
        
        >
          <div className="flex justify-center mb-2">
            <img
              src={doctor.photo}
              alt="Doctor"
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialization.name} Specialist</p>
          </div>
          <div className="flex items-center mb-2">
            <img src={AvgStar} alt="Average Star" className="w-6 h-6 mr-2" />
            <p className="font-bold">{doctor.averageStars.toFixed(2)}</p>
          </div>
          <div className="flex items-center mb-2">
            <PiClockCountdownFill className="text-orange-400 mr-1" />
            <p className="text-xs">{doctor.patientCount} Patients</p>
          </div>
          <div className="flex items-center mb-2">
            <TbCalendarStats className="text-orange-400 mr-1" />
            <p className="text-xs">Joined on {doctor.createdAt.split("T")[0]}</p>
          </div>
          <div className="flex items-center mb-2">
            <TbDeviceWatchStats2 className="text-orange-400 mr-1" />
            <p className="text-xs">{doctor.slotCount} slots available</p>
          </div>
          <hr className="border-gray-200 my-2" />
          <div className="flex justify-between">
            <h1 className="text-red-500 font-extrabold">
              Fee: {doctor.fee} Taka
            </h1>
            <h1 className="font-bold hover:scale-110 transition-transform">
              <Link to={`/doctors/${doctor._id}`}>View More</Link>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Medilab;