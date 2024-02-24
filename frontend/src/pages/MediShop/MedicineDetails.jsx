import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import StarIcon from "@/assets/images/avgstar.png";
import ReviewIcon from "@/assets/images/reviews.png";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MyContext } from "@/context/MyContext";
import { BASE_URL } from "@/config";
import MedCat from "@/assets/images/medcategory.svg";

const MedicineDetails = () => {
  const { medid } = useParams();

  console.log(medid);

  const { state } = useContext(AuthContext);

  const [navClass, setNavClass] = useState("overview");

  const [medicine, setMedicine] = useState(null);

  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      const res = await fetch(`${BASE_URL}/medicine/fetchone/${medid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      const result1 = await res.json();

      if (!res.ok) {
        throw new Error(result1.message);
      }

      setMedicine(result1.data);
    };
    if (state.user) {
      fetchMedicine();
    }
  }, []);

  console.log(review);

  return (
    medicine && (
      <div className="flex-col mx-[180px] mt-[40px] space-x-10">
        <div className="h-[200px] bg-black w-full relative p-10 rounded-lg">
          <div className="flex w-1/2 justify-between">
            <p className="font-bold text-3xl text-white">{medicine.name}</p>
            <div className="mt-2">
              <Badge variant="secondary">{medicine.type}</Badge>
            </div>
          </div>

          <div className="flex space-x-1">
            <img src={MedCat} className="w-[25px] h-[25px]" alt="" />
            <p className="text-white font-bold text-lg">{medicine.category}</p>
          </div>

          <div className="flex space-x-5 mt-[5px]">
            <div className="flex space-x-1 items-center justify-center">
              <img src={StarIcon} className="w-[25px] h-[25px]" alt="" />
              <p className="text-white text-sm font-bold">
                {medicine.avgStars.toFixed(2)}
              </p>
            </div>
            <div className="flex space-x-1">
              <img src={ReviewIcon} className="w-[25px] h-[25px]" alt="" />
              <p className="text-white text-sm pt-[2px] font-bold">
                {medicine.reviewCount} reviews
              </p>
            </div>
          </div>

          <div>
            <p className="text-white font-bold">{medicine.manufacturer.name}</p>
          </div>
        </div>
        <img
          src={medicine.image}
          className="w-[400px] absolute right-[220px] top-[150px] rounded-2xl"
          alt=""
        />

        <div className="flex space-x-2 mt-5">
          <NavLink
            to="overview"
            className={(navClass) =>
              navClass.isActive ? setNavClass("overview") : null
            }
          >
            <div
              className={`flex items-center space-x-2   ${
                navClass == "overview"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              } px-2 rounded-full cursor-pointer`}
            >
              <h1 className="font-semibold">Overview</h1>
            </div>
          </NavLink>
          <NavLink
            to="reviews"
            className={(navClass) =>
              navClass.isActive ? setNavClass("reviews") : null
            }
          >
            <div
              className={`flex items-center space-x-2   ${
                navClass == "reviews"
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              } px-2 rounded-full cursor-pointer`}
            >
              <h1 className="font-semibold">Reviews </h1>
            </div>
          </NavLink>
        </div>
        <hr className="border border-black mt-2 w-1/2" />
        <div className="w-1/2">
          <MyContext.Provider value={medicine}>
            <Outlet />
          </MyContext.Provider>
        </div>
      </div>
    )
  );
};

export default MedicineDetails;
