import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { BASE_URL } from "@/config";
import AvgStar from "@/assets/images/avgstar.png";
import { Badge } from "@/components/ui/badge";
import CategoryIcon from "@/assets/images/category.svg";
import ShopIcon from "@/assets/images/shop.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlueIcon from "@/assets/images/blue_icon.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "date-fns";
import Loader from "@/assets/gifs/page_loader.json";
import Lottie from "react-lottie";

const MediShop = () => {
  const { state, setState } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();

  const [opensheet, setOpenSheet] = useState(false);

  const [medicines, setMedicines] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [selectedMed, setSelectedMed] = useState([]);

  const [addedappointments, setAddedAppointments] = useState([]);

  const [prescriptionMode, setPrescriptionMode] = useState(false);

  const [search, setSearch] = useState({
    value: "",
    searchBy: "any",
  });

  const handleViewClick = (med) => {
    navigate(`/medicine/${med._id}/overview`);
  };

  const handleChange = (key, value) => {
    setSearch((prevSearch) => ({ ...prevSearch, [key]: value }));
  };

  const handleCheckboxChange = (isTrue, value) => {
    if (!isTrue)
      setSelectedMed((prevMed) => prevMed.filter((med) => med !== value));
    else setSelectedMed((prevMed) => [...prevMed, value]);
  };

  useEffect(() => {
    const fetchSelectedMed = async () => {
      let newSelectedMed = selectedMed;
      let newMedicines = [];

      for (let i = 0; i < newSelectedMed.length; i++) {
        let params = {};

        params.name = newSelectedMed[i];

        const queryString = new URLSearchParams(params).toString();

        setLoading(true);

        const res1 = await fetch(`${BASE_URL}/medicine/search?${queryString}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });

        setLoading(false);

        const result1 = await res1.json();

        if (!res1.ok) {
          throw new Error(result1.message);
        }

        for (let i = 0; i < result1.data.length; i++) {
          newMedicines.push(result1.data[i]);
        }
        newMedicines = [...new Set(newMedicines)];
      }
      setMedicines(newMedicines);
    };

    if (state.user) {
      fetchSelectedMed();
    }
  }, [selectedMed]);

  useEffect(() => {
    const fetchMedicines = async () => {
      let params = {};

      if (search.searchBy == "category" && search.value != "")
        params.category = search.value;
      else if (search.searchBy == "name" && search.value != "")
        params.name = search.value;

      const queryString = new URLSearchParams(params).toString();

      setLoading(true);

      const res1 = await fetch(`${BASE_URL}/medicine/search?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      setLoading(false);

      const result1 = await res1.json();

      if (!res1.ok) {
        throw new Error(result1.message);
      }

      setMedicines(result1.data);
    };

    if (state.user && addedappointments.length == 0) {
      fetchMedicines();
    }
  }, [search]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res1 = await fetch(`${BASE_URL}/appointment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });

      if (!res1.ok) {
        throw new Error(result1.message);
      }

      const result1 = await res1.json();
      console.log(result1)

      setAppointments(result1.appointments);
    };

    if (state.user && state.role == "patient") {
      fetchAppointments();
    }
  }, []);

  return (
    <div className="mx-[140px] mt-[40px] flex space-x-10 justify-between">
      <div className="w-1/5 flex-col space-y-2">
        <h1 className="text-lg font-bold">Prescription Corner</h1>
        <hr className="border border-black" />
        <div className="flex space-x-2 mt-5">
          {appointments.map(
            (app, index) =>
              addedappointments.includes(app._id) && (
                <Card className="w-full" key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{app.doctor.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(app.slot.date).toUTCString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex-col space-y-2">
                      {app.prescription.prescribedMeds.map((med, index) => (
                        <div
                          className="flex items-center space-x-2"
                          key={index}
                        >
                          <Checkbox
                            value={med.medicineName}
                            onCheckedChange={(value) => {
                              handleCheckboxChange(value, med.medicineName);
                            }}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {med.medicineName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      onClick={() => {
                        setAddedAppointments((prevAppointments) =>
                          prevAppointments.filter(
                            (appointment) => appointment !== app._id
                          )
                        );
                      }}
                    >
                      Remove Prescription
                    </Button>
                  </CardFooter>
                </Card>
              )
          )}
        </div>
        <Sheet
          open={opensheet}
          onOpenChange={(value) => {
            setOpenSheet(value);
          }}
        >
          <SheetTrigger asChild>
            {addedappointments.length == 0 && (
              <Button
                onClick={() => {
                  setOpenSheet(true);
                }}
                className="w-full"
              >
                View Prescription
              </Button>
            )}
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>All Prescriptions</SheetTitle>
              <SheetDescription>
                Click Add to search for the medicines
              </SheetDescription>
            </SheetHeader>
            {state.role == "patient" ? (
              <div className="flex-col space-y-2 mt-5">
                {appointments.map(
                  (app, index) =>
                    addedappointments.includes(app._id) == false && (
                      <Card className="w-full" key={index}>
                        <CardHeader>
                          <CardTitle className="text-xl">
                            {app.doctor.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {new Date(app.slot.date).toUTCString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-row flex-wrap space-x-3">
                            {app.prescription.prescribedMeds.map(
                              (med, index) => (
                                <div className="flex" key={index}>
                                  <img
                                    src={BlueIcon}
                                    className="w-[20px] h-[20px]"
                                    alt=""
                                  />
                                  <p className="text-sm">{med.medicineName}</p>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            type="submit"
                            className="w-full"
                            onClick={() => {
                              setAddedAppointments([
                                ...addedappointments,
                                app._id,
                              ]);
                              setOpenSheet(false);
                            }}
                          >
                            Add Prescription
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            ) : null}

            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col w-3/5 min-h-[500px]">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text">All Medicine</h1>
          {addedappointments.length == 0 && (
            <div className="flex">
              <input
                type="text"
                placeholder="Search by name"
                value={search.value}
                onChange={(e) => handleChange("value", e.target.value)}
                className="border-b-2 border-black focus:outline-none w-[300px]"
              />
              <Button
                size="icon"
                className="rounded-full bg-orange-500 hover:bg-orange-600"
              >
                <FaSearch />
              </Button>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            {" "}
            <Lottie options={defaultOptions} height={50} width={50} />{" "}
          </div>
        )}

        <div className="flex flex-row flex-wrap">
          {medicines.map((med, index) => (
            <div
              key={index}
              className="flex-col m-[5px] w-[290px] my-[10px] h-[250px] rounded-lg border border-slate-400 overflow-hidden"
            >
              <div className=" h-[120px]">
                <img
                  src={med.image}
                  alt="medicine"
                  className="top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-col p-[15px]">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text">{med.name}</h1>
                  <Badge>{med.type}</Badge>
                </div>
                <div className="flex space-x-1">
                  <img
                    src={CategoryIcon}
                    className="w-[20px] h-[20px]"
                    alt=""
                  />
                  <p className="font-bold text-sm">{med.category}</p>
                </div>
                <div className="flex space-x-1">
                  <img src={ShopIcon} className="w-[20px] h-[20px]" alt="" />
                  <p className="font-bold text-xs pt-1">{med.manufacturer.name}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center justify-between my-[10px]">
                  <div className="flex space-x-1 items-center justify-between">
                    <img src={AvgStar} className="w-[25px] h-[25px]" alt="" />
                    <p className="font-bold pt-1 text-sm">
                      {med.avgStars.toFixed(2)}
                    </p>
                  </div>
                  <h1
                    className="font-bold hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => handleViewClick(med)}
                  >
                    view more
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addedappointments.length == 0 && (
        <div className="flex flex-col w-1/5 container space-y-4">
          <h1 className="font-bold text-lg">Search Type</h1>
          <RadioGroup
            defaultValue="any"
            value={search.searchBy}
            onValueChange={(value) => handleChange("searchBy", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"any"} id="r1" />
              <Label htmlFor="r1">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"name"} id="r1" />
              <Label htmlFor="r1">Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={"category"} id="r1" />
              <Label htmlFor="r1">Category</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default MediShop;
