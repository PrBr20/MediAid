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
import Loader from "@/assets/gifs/page_loader.json";
import Lottie from 'react-lottie';

const Doctors = () => {
  const { state, setState } = useContext(AuthContext);
  // console.log(state);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [loading, setLoading] = useState(false);

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
      if (search.feeLower >= 1) params.feeLower = search.feeLower;
      if (search.feeUpper) params.feeUpper = search.feeUpper;
      if (search.specialization != "all")
        params.specialization = search.specialization;
      if (search.timerange != "all") params.timerange = search.timerange;

      const queryString = new URLSearchParams(params).toString();

      setLoading(true);

      const res1 = await fetch(`${BASE_URL}/doctor/search?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      setLoading(false);

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
        throw new Error(result2.message);
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

  return (
    <div className="mx-[180px] mt-[40px] flex">
      <div className="flex flex-col w-2/3">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text">All Doctors</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Search by name"
              value={search.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-b-2 border-black focus:outline-none w-[300px]"
            />
            <Button
              size="icon"
              className="rounded-full bg-orange-500 hover:bg-orange-600"
            >
              <FaSearch />
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            {" "}
            <Lottie options={defaultOptions} height={50} width={50} />{" "}
          </div>
        )}

        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="flex my-[10px] h-[150px] rounded-lg border border-slate-400 overflow-hidden"
          >
            <div className="w-1/3 h-full">
              <img
                src={doctor.photo}
                alt="Doctor"
                className="top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-[20px]">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold ">{doctor.name}</h1>
                  <h1 className="font-bold text-xl">
                    {doctor.specialization?.name} Specialist
                  </h1>
                </div>
                <div className="flex space-x-1 items-center justify-center">
                  <img src={AvgStar} className="w-[30px] h-[30px]" alt="" />
                  <p className="font-bold pt-2">
                    {doctor.averageStars != null
                      ? doctor.averageStars.toFixed(2)
                      : (0.0).toFixed(2)}
                  </p>
                  {/* <p className="font-bold pt-2">{doctor.averageStars.toFixed(2)}</p> */}
                </div>
              </div>
              <div className="flex my-[10px]">
                <div className="flex mr-[10px]">
                  <PiClockCountdownFill className="text-orange-400 " />
                  <p className="text-xs"> {doctor.patientCount} Patients</p>
                </div>
                <div className="flex mx-[10px]">
                  <TbCalendarStats className="text-orange-400 " />
                  <p className="text-xs">
                    {" "}
                    Joined on {doctor.createdAt.split("T")[0]}{" "}
                  </p>
                </div>
                <div className="flex mx-[10px]">
                  <TbDeviceWatchStats2 className="text-orange-400 " />
                  <p className="text-xs"> {doctor.slotCount} slots available</p>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between my-[10px]">
                <h1 className="text-red-500 font-extrabold ">
                  Fee : {doctor.fee} Taka
                </h1>
                <h1 className="font-bold hover:scale-110 transition-transform">
                  <Link to={`/doctors/${doctor._id}`}>view more</Link>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-1/3 container space-y-4">
        <h1 className="font-bold text-lg">Specialization</h1>
        <RadioGroup
          defaultValue="comfortable"
          value={search.specialization}
          onValueChange={(value) => handleChange("specialization", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"all"} id="r1" />
            <Label htmlFor="r1">All</Label>
          </div>
          {specialization.map((sp, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={sp._id} id="r1" />
              <Label htmlFor="r1">{sp.name}</Label>
            </div>
          ))}
        </RadioGroup>

        <h1 className="font-bold text-lg">Slot Availability</h1>

        <RadioGroup
          defaultValue="comfortable"
          value={search.timerange}
          onValueChange={(value) => handleChange("timerange", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r1" />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="today" id="r2" />
            <Label htmlFor="r2">Today</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="r3" />
            <Label htmlFor="r3">This week</Label>
          </div>
        </RadioGroup>

        <h1 className="font-bold text-lg">Fee</h1>

        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-lg">
            {search.feeLower}-{search.feeUpper}
          </h1>

          <Slider
            min={0}
            max={1000}
            value={[search.feeUpper]}
            className="w-[200px]"
            step={100}
            onValueChange={(value) => {
              setSearch({
                ...search,
                feeUpper: value[0],
              });
            }}
          />
        </div>

        <h1 className="font-bold text-lg">Review</h1>

        <RadioGroup
          defaultValue="comfortable"
          value={search.rating.toString()}
          onValueChange={(value) => handleChange("rating", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="r1" />
            <Label htmlFor="r1">5 star</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="r2" />
            <Label htmlFor="r2">4+ star</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="r3" />
            <Label htmlFor="r3">3+ star</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="r3" />
            <Label htmlFor="r3">2+ star</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="r3" />
            <Label htmlFor="r3">1+ star</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="r3" />
            <Label htmlFor="r3">None</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Doctors;
