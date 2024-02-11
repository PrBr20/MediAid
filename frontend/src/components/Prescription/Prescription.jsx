import React, { useState } from "react";
import Symptoms from "@/assets/images/symptoms.svg";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tests from "@/assets/images/tests.svg";
import { Button } from "@/components/ui/button";
import Advice from "@/assets/images/advice.svg";
import Medicines from "@/assets/images/medicines.svg";
import Doses from "@/assets/images/Doses.svg";
import Details from "@/assets/images/details.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "@/config";
import { useNavigate } from "react-router-dom";

const Prescription = () => {
  const location = useLocation();
  const app = location.state.app;

  const { state } = useContext(AuthContext);

  const navigate = useNavigate();

  const [newpres, setNewpres] = useState({
    weight: 70,
    prescribedMeds: {
      medicineName: "",
      category: "",
      dosage: "",
      details: "",
      type: "",
    },
    symptoms: "",
    diagnosis: "",
    advice: "",
    tests: "",
  });

  const handleChange = (name, value) => {
    setNewpres({ ...newpres, [name]: value });
  };

  const handleMedChange = (name, value) => {
    setNewpres({
      ...newpres,
      ...newpres,
      prescribedMeds: {
        ...newpres.prescribedMeds,
        [name]: value,
      },
    });
  };

  const [newPresArr, setNewPresArr] = useState({
    weight: 70,
    prescribedMeds: [],
    symptoms: [],
    diagnosis: [],
    advice: [],
    tests: [],
  });

  const handleAdd = (name) => {
    console.log(newpres[name]);
    console.log(newPresArr);

    // Create a new copy of newPresArr
    const newPresArrCopy = { ...newPresArr };

    // Check if newPresArrCopy[name] is an array
    if (Array.isArray(newPresArrCopy[name])) {
      // If it is, append newpres[name] to it
      newPresArrCopy[name] = [...newPresArrCopy[name], newpres[name]];
    } else {
      // If it's not, initialize it as an array containing newpres[name]
      newPresArrCopy[name] = [newpres[name]];
    }
    // Update newPresArr with the new copy
    setNewPresArr(newPresArrCopy);

    if (name === "prescribedMeds") {
      setNewpres({
        ...newpres,
        prescribedMeds: {
          medicineName: "",
          category: "",
          dosage: "",
          details: "",
          type: "",
        },
      });
    } else {
      setNewpres({ ...newpres, [name]: "" });
    }

    console.log(newPresArrCopy);
  };

  // useEffect(() => {
  //   if(state.role == "patient") {
  //     setNewpres(app.prescription);
  //     console.log(app.prescription);
  //     console.log(newPresArr);
  //   }
  // }, []);

  useEffect(() => {
    if (state.role == "patient") {
      setNewpres(app.prescription);
      setNewPresArr(app.prescription);
    }
  }, []);

  useEffect(() => {
    console.log(newPresArr);
  }, [newPresArr]);


  console.log(app._id);
  const handleSubmitPrescription = async () => {
    const res = await fetch(`${BASE_URL}/prescription/${app._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(newPresArr),
    });

    const result = await res.json();

    if (!res.ok) {
      toast({
        title: "Prescription not submitted",
        description: "Try again",
      })
      throw new Error(result.message);
    }
    else {
      toast({
        title: "Prescription submitted",
        description: "Sent to the patient",
      })
    }

    console.log(result.data);
    navigate("/user");
  };

  return (
    <div className="flex mx-[180px] mt-[40px] space-x-10 ">
      <div className="w-1/4 flex-col space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Symptoms</CardTitle>
            <CardDescription>Short detail of the symptoms</CardDescription>
          </CardHeader>
          {newPresArr.symptoms.map((symptom, index) => (
            <CardContent key={index}>
              <div className="flex space-x-3">
                <img src={Symptoms} className="w-[20px] h-[20px]" />
                <p>{symptom}</p>
              </div>
            </CardContent>
          ))}
          {state.role === "doctor" ? (
            <CardFooter>
              <div className="flex-col space-y-3">
                <Input
                  value={newpres.symptoms}
                  onChange={(e) => handleChange("symptoms", e.target.value)}
                  className="w-[220px]"
                ></Input>
                <Button
                  onClick={() => handleAdd("symptoms")}
                  className="w-full"
                >
                  Add Symptom
                </Button>
              </div>
            </CardFooter>
          ) : null}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tests</CardTitle>
            <CardDescription>Short detail of the tests</CardDescription>
          </CardHeader>
          {newPresArr.tests.map((test, index) => (
            <CardContent key={index}>
              <div className="flex space-x-3">
                <img src={Symptoms} className="w-[20px] h-[20px]" />
                <p>{test}</p>
              </div>
            </CardContent>
          ))}
          {state.role === "doctor" ? (
            <CardFooter>
              <div className="flex-col space-y-3">
                <Input
                  value={newpres.tests}
                  onChange={(e) => handleChange("tests", e.target.value)}
                  className="w-[220px]"
                ></Input>
                <Button onClick={() => handleAdd("tests")} className="w-full">
                  Add Test
                </Button>
              </div>
            </CardFooter>
          ) : null}
        </Card>
      </div>
      <div className="border-r border-gray-500 h-full min-h-[500px]"></div>
      <div className="w-2/4 ">
        <Card>
          <CardHeader>
            <Card>
              <CardHeader>
                <CardTitle>Patient Details : </CardTitle>
              </CardHeader>
              <CardContent className="flex-col space-y-1">
                <div className="flex justify-between">
                  {state.role === "doctor" && (
                    <p>Name : {location.state.app.user.name}</p>
                  )}
                  {state.role === "patient" && <p>Name : {state.user.name}</p>}
                  {state.role === "patient" && (
                    <p>Name : {newPresArr.weight}</p>
                  )}
                  {state.role === "doctor" && <p>Weight : 20</p>}
                </div>
                <div className="flex justify-between">
                  <p>Age : 20</p>
                  <p>Date : 24 January, 2024</p>
                </div>
              </CardContent>
            </Card>
          </CardHeader>
          <CardContent>
            <Card className="flex-col space-y-2">
              <CardHeader>
                <CardTitle>Rx : </CardTitle>
                <CardDescription>
                  Doses and details of prescribed Medicines
                </CardDescription>
                <hr className="border border-black" />
              </CardHeader>
              {newPresArr.prescribedMeds.map((med, index) => (
                <CardContent key={index}>
                  <div className="flex-col space-y-1">
                    <div className="flex space-x-3">
                      <img src={Medicines} className="w-[20px] h-[20px]" />
                      <p>
                        {med.type} : {med.medicineName}({med.category})
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <img src={Doses} className="w-[20px] h-[20px] " />
                      <p className="text-red-700 text-base">
                        Doses : {med.dosage}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <img src={Details} className="w-[18px] h-[18px] " />
                      <p className="text-sm italic">Details:{med.details}</p>
                    </div>
                  </div>
                </CardContent>
              ))}
              <CardContent>
                <hr className="border border-slate-200" />
              </CardContent>
              {state.role === "doctor" ? (
                <CardFooter>
                  <div className="flex-col space-y-3">
                    <div className="flex space-x-2 justify-between items-center">
                      <p>Name:</p>
                      <Input
                        value={newpres.prescribedMeds.medicineName}
                        onChange={(e) =>
                          handleMedChange("medicineName", e.target.value)
                        }
                        placeholder="Enter name of the medicine"
                        className="w-[270px]"
                      ></Input>
                    </div>
                    <div className="flex space-x-2 justify-between items-center">
                      <p>Category:</p>
                      <Input
                        value={newpres.prescribedMeds.category}
                        onChange={(e) =>
                          handleMedChange("category", e.target.value)
                        }
                        placeholder="Enter Medicine Category"
                        className="w-[270px]"
                      ></Input>
                    </div>
                    <div className="flex space-x-2 justify-between items-center">
                      <p>Type:</p>
                      <Select
                        name="type"
                        value={newpres.prescribedMeds.type}
                        onValueChange={(value) =>
                          handleMedChange("type", value)
                        }
                      >
                        <SelectTrigger className="border-black w-[270px]">
                          <SelectValue placeholder="Select medicine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tablet">Tablet</SelectItem>
                          <SelectItem value="Syrup">Syrup</SelectItem>
                          <SelectItem value="Capsule">Capsule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2 justify-between items-center">
                      <p>Doses:</p>
                      <div className="flex items-center justify-between w-[270px]">
                        <Input
                          value={newpres.prescribedMeds.dosage}
                          onChange={(e) =>
                            handleMedChange("dosage", e.target.value)
                          }
                          placeholder="Morning"
                        ></Input>
                      </div>
                    </div>
                    <div className="flex space-x-2 justify-between items-center">
                      <p>Details:</p>
                      <Input
                        value={newpres.prescribedMeds.details}
                        onChange={(e) =>
                          handleMedChange("details", e.target.value)
                        }
                        placeholder="Enter details of the medicine"
                        className="w-[270px]"
                      ></Input>
                    </div>
                    <Button
                      onClick={() => handleAdd("prescribedMeds")}
                      className="w-full"
                    >
                      Add Medicine
                    </Button>
                    <Button
                      onClick={() => handleSubmitPrescription()}
                      className="w-full"
                    >
                      Submit Prescription
                    </Button>
                  </div>
                </CardFooter>
              ) : null}
            </Card>
          </CardContent>
        </Card>
      </div>
      <div className="border-r border-gray-500 h-full min-h-[500px]"></div>
      <div className="w-1/4 flex-col space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
            <CardDescription>Short detail of the diagnosis</CardDescription>
          </CardHeader>
          {newPresArr.diagnosis.map((diag, index) => (
            <CardContent key={index}>
              <div className="flex space-x-3">
                <img src={Symptoms} className="w-[20px] h-[20px]" />
                <p>{diag}</p>
              </div>
            </CardContent>
          ))}
          {state.role === "doctor" ? (
            <CardFooter>
              <div className="flex-col space-y-3">
                <Input
                  value={newpres.diagnosis}
                  onChange={(e) => handleChange("diagnosis", e.target.value)}
                  className="w-[220px]"
                ></Input>
                <Button
                  onClick={() => handleAdd("diagnosis")}
                  className="w-full"
                >
                  Add Diagnosis
                </Button>
              </div>
            </CardFooter>
          ) : null}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advices</CardTitle>
            <CardDescription>Short detail of the tests</CardDescription>
          </CardHeader>
          {newPresArr.advice.map((adv, index) => (
            <CardContent key={index}>
              <div className="flex space-x-3">
                <img src={Symptoms} className="w-[20px] h-[20px]" />
                <p>{adv}</p>
              </div>
            </CardContent>
          ))}
          {state.role === "doctor" ? (
            <CardFooter>
              <div className="flex-col space-y-3">
                <Input
                  value={newpres.advice}
                  onChange={(e) => handleChange("advice", e.target.value)}
                  className="w-[220px]"
                ></Input>
                <Button onClick={() => handleAdd("advice")} className="w-full">
                  Add Advice
                </Button>
              </div>
            </CardFooter>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Prescription;
