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

const MediLabs = () => {
  const [loading, setLoading] = useState(false);
  const { state, setState } = useContext(AuthContext);
  // console.log(state);

  // const [specialization, setSpecialization] = useState([]);

  //  const [doctors, setDoctors] = useState([]);
  const [mediLabs, setMediLabs] = useState([]);

  const [search, setSearch] = useState({
    name: "",
    rating: 0,
    phone: "",
    // feeLower: 0,
    // feeUpper: 1000,
    // specialization: "all",
    timerange: "all",
  });

  useEffect(() => {
    const fetchMediLab = async () => {
      let params = {};

      // Conditionally add parameters to the object
      if (search.name != "") params.name = search.name;
      // if (search.rating) params.rating = search.rating;
      // if (search.phone != "") params.phone = search.phone;
      // if (search.feeLower > -1) params.feeLower = search.feeLower;
      // if (search.feeUpper) params.feeUpper = search.feeUpper;
      // if (search.specialization != "all")
      //   params.specialization = search.specialization;
      // if(search.phone) params.phone = search.phone;
      // if (search.timerange != "all") params.timerange = search.timerange;

      const queryString = new URLSearchParams(params).toString();

      const res1 = await fetch(`${BASE_URL}/mediLab/search?${queryString}`, {


        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });
      // const temp = "check medilab"
      // console.log(temp)
      console.log(queryString);

      // const res2 = await fetch(`${BASE_URL}/specialization`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${state.token}`,
      //   },
      // });

      if (!res1.ok) {
        throw new Error(result1.message);
      }
      // if (!res2.ok) {
      //   throw new Error(result.message);
      // }


      // const result2 = await res2.json();
      const result1 = await res1.json();

      console.log(result1.data);

      setMediLabs(result1.data);
      // setSpecialization(result2.data);
    };

    if (state.user) {
      fetchMediLab();
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
    <div className="flex">

      <div className="w-5/6 p-4">
        <h1 className="text-3xl font-bold my-8 pl-10">ALL MEDILAB</h1>

        {loading && (
          <div className="flex justify-center items-center">
            {" "}
            <Lottie options={defaultOptions} height={50} width={50} />{" "}
          </div>
        )}

        <div className="mx-4 my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {mediLabs.map((mediLab, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              style={{ backgroundColor: '#fff4f6' }} // Set background color here

            >
              <div className="flex justify-center mb-2">
                <img
                  src={mediLab.photo}
                  alt="mediLab"
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="mb-2">
                <h2 className="text-xl font-bold">{mediLab.name}</h2>
                <p className="text-gray-500">Phone: 0{mediLab.phone} </p>
              </div>
              <div className="flex items-center mb-2">
                <img src={AvgStar} alt="Average Star" className="w-6 h-6 mr-2" />
                <p className="font-bold">{mediLab.averageStars.toFixed(2)}</p>
              </div>
              <div className="flex items-center mb-2">
                <PiClockCountdownFill className="text-orange-400 mr-1" />
                <p className="text-xs">{mediLab.patientCount} Patients</p>
              </div>
              <div className="flex items-center mb-2">
                <TbCalendarStats className="text-orange-400 mr-1" />
                <p className="text-xs">Joined on {mediLab.createdAt.split("T")[0]}</p>
              </div>
              <div className="flex items-center mb-2">
                <TbDeviceWatchStats2 className="text-orange-400 mr-1" />
                <p className="text-xs">{mediLab.slotCount} slots available</p>
              </div>
              <hr className="border-gray-200 my-2" />
              <div className="flex justify-between">
                <h1 className="text-red-500 font-extrabold">
                  {/* Fee: {doctor.fee} Taka */}
                  <Link to={`/medilabs/allTests/${mediLab._id}`}>View Tests</Link>
                
                </h1>
                <h1 className="font-bold hover:scale-110 transition-transform">
                  <Link to={`/medilabs/${mediLab._id}`}>View More</Link>
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/6 p-4">
        <div className="flex mt-10 mb-10">

          <input
            type="text"
            placeholder="Search by name"
            value={search.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border-b-2 border-black focus:outline-none w-[300px]"
          />
          <button className="rounded-full bg-orange-500 hover:bg-orange-600">
            <FaSearch />
          </button>




        </div>
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

export default MediLabs;
