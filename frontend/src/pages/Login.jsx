import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginImage from "@/assets/images/login.svg";
import { BASE_URL } from "@/config";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
import { Navigate } from "react-router-dom";
import Loader from "@/assets/gifs/loader.gif";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { set } from "date-fns";

const Login = () => {
  const { state, setState } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const [loginData, setloginData] = React.useState({
    email: "",
    password: "",
  });

  const [signupData, setsignupData] = React.useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    phone:"",
    gender: "male",
    role: "",
    fee: "",
    specialization: "",
  });

  const [specialization, setSpecialization] = React.useState([]);

  useEffect(() => {
    const fectchSp = async () => {
      const res1 = await fetch(`${BASE_URL}/specialization`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result1 = await res1.json();

      console.log(result1);

      setSpecialization(result1.data);
    };

    fectchSp();
  }, []);

  useEffect(() => {
    if (signupData.role == "patient" || signupData == "mediLab") {
      setsignupData({ ...signupData, fee: "" });
    }
  }, [signupData.role]);

  const handleSelectChange = (name, value) => {
    setsignupData({ ...signupData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const data = await uploadImagetoCloudinary(file);
    setLoading(false);

    toast({
      title: "Image Uploaded Successfully",
      description: "Image upload done, you can now sign up",
    });

    console.log(data.url);
    setsignupData({ ...signupData, photo: data.url });
  };

  console.log(signupData);

  const navigate = useNavigate();

  const handleLoginChange = (name, value) => {
    setloginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await res.json();

    if (!res.ok) {
      toast({
        title: "Login Unsuccessful",
        description: "Enter correct email and password to login",
      });
      throw new Error(result.message);
    } else {
      toast({
        title: "Logged in successfully",
        description: "You have successfully logged in",
      });
    }

    console.log(result);

    setState({ user: result.data, role: result.role, token: result.token, cartSize: result.data.cartSize});
    // navigate("/doctors");
    if (result.role == "patient" || result.role == "doctor") navigate("/doctors");
    else if(result.role == "company") navigate('/medishop');
    else if(result.role == "lab") navigate('/medilab');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signupData);

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const result = await res.json();

    if (!res.ok) {
      toast({
        title: "Some Error Occured",
        description: "Please fill up all fields correctly and try again",
      });
      throw new Error(result.message);
    } else {
      toast({
        title: "Signed up successfully",
        description: "Signup successfull, please login to continue",
      });
    }

    console.log(result);
  };

  return (
    <div className="h-[900px] flex shadow-2xl rounded-2xl mx-[150px] my-[50px] bg-[url('@/assets/images/bg_image_blue.jpg')]">
      <div className="w-1/2 shadow-2xl rounded-2xl flex items-center justify-center">
        <img src={LoginImage} alt="" className="w-3/4" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Tabs
          defaultValue="Login"
          className="w-[400px] flex flex-col items-center justify-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="Login" className="w-full">
            <Card className="h-[800px]">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login with your email and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    className="border-black"
                    placeholder="yahoo@gmail.com"
                    value={loginData.email}
                    onChange={(e) => handleLoginChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input
                    type="password"
                    className="border-black"
                    value={loginData.password}
                    onChange={(e) =>
                      handleLoginChange("password", e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="SignUp" className="w-full">
            <Card className="h-[800px]">
              <CardHeader>
                <CardTitle>SignUp</CardTitle>
                <CardDescription>
                  Create an account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="info">Role</Label>
                  <Select
                    name="role"
                    value={signupData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger className=" border-black">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="medilab">Medilab</SelectItem>
                      <SelectItem value="company">Medicine Manufacturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">
                    {signupData.role != "medilab" &&
                    signupData.role != "medishop"
                      ? "Name"
                      : "Company Name"}
                  </Label>
                  <Input
                    id="name"
                    type="name"
                    className="border-black"
                    value={signupData.name}
                    onChange={(e) => handleSelectChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="mail"
                    type="email"
                    className="border-black"
                    placeholder="yahoo@gmail.com"
                    value={signupData.email}
                    onChange={(e) =>
                      handleSelectChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input
                    id="pass"
                    type="password"
                    className="border-black"
                    value={signupData.password}
                    onChange={(e) =>
                      handleSelectChange("password", e.target.value)
                    }
                  />
                </div>
                {/* {signupData.role != "medilab" &&
                  signupData.role != "medishop" && ( */}
                <div className="space-y-1">
                  <Label
                    htmlFor="info"
                    className={`${
                      signupData.role != "doctor" &&
                      signupData.role != "patient"
                        ? "text-gray-400"
                        : "text-black"
                    }`}
                  >
                    Gender
                  </Label>
                  <Select
                    name="gender"
                    value={signupData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                    className={`border ${
                      signupData.role != "doctor" &&
                      signupData.role != "patient"
                        ? "border-gray-400"
                        : "border-black"
                    }`}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          signupData.role != "doctor" &&
                          signupData.role != "patient"
                            ? ""
                            : "Select you gender"
                        }
                      />
                    </SelectTrigger>
                    {signupData.role != "medilab" &&
                      signupData.role != "medishop" && (
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      )}
                  </Select>
                </div>
                {/* )} */}
                <div className="space-y-1">
                  <Label
                    htmlFor="new"
                    className={`${signupData.role != "doctor"
                      ? "text-gray-400"
                      : "text-black"
                      }`}
                  >
                    Fee
                  </Label>
                  <Input
                    type="text"
                    value={signupData.fee}
                    onChange={(e) =>
                      setsignupData({ ...signupData, fee: e.target.value })
                    }
                    placeholder={
                      signupData.role != "doctor" ? "" : "Enter fee in taka"
                    }
                    readOnly={signupData.role != "doctor"}
                    className={`border ${signupData.role != "doctor"
                      ? "border-gray"
                      : "border-black"
                      }`}
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="new"
                    className={`${signupData.role != "doctor"
                      ? "text-gray-400"
                      : "text-black"
                      }`}
                  >
                    Specialization
                  </Label>
                  <Select
                    name="specialization"
                    onValueChange={(value) =>
                      setsignupData({
                        ...signupData,
                        specialization: value._id,
                      })
                    }
                    className={`border ${signupData.role != "doctor"
                      ? "border-gray-400"
                      : "border-black"
                      }`}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          signupData.role != "doctor"
                            ? ""
                            : "Select a Specialization"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {signupData.role == "doctor" &&
                        specialization.map((sp, index) => (
                          <SelectItem key={index} value={sp}>
                            {sp.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                  ></Input>
                  <div className="flex items-center justify-center">
                    {loading && (
                      <img src={Loader} alt="" className="w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSignup} className="w-full">
                  SignUp
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
