import React from "react";
import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthContext from "@/context/AuthContext";
import { addDays } from "date-fns";
import { BASE_URL } from "@/config";

const AddLabTests = () => {
    const { state } = useContext(AuthContext);
    const id = state?.user._id;


    const [test, setTest] = useState({
        Lab: id,
        name: "",
        description: "",
        image: "",
        price: 0,


    });

    const handleSelectChange = (name, value) => {
        setTest({ ...signupData, [name]: value });
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        setLoading(true);
        const data = await uploadImagetoCloudinary(file);
        setLoading(false);

        toast({
            title: "Image Uploaded Successfully",
            description: "Image upload done, you can now add test",
        });

        console.log(data.url);
        setTest({ ...test, photo: data.url });
    };
    const handleAddTest = async (e) => {
        e.preventDefault();
        console.log(test);
    
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(test),
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
            title: "Test added successfully",
            description: "Add test successfull",
          });
        }
    
        console.log(result);
      };

    return (
        <div className="flex-col space-y-10">
            <h1 className="font-bold text-3xl">Add Test</h1>
            <hr className="border-black" />

            <div className="space-y-1">
                <label className="font-medium leading-none" htmlFor="">
                    Test Name :
                </label>
                <Input
                    id="name"
                    type="name"
                    className="border-black"
                    value={test.name}
                    onChange={(e) => handleSelectChange("name", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                    This is the display name that will be shown to other users.
                </p>
            </div>

            <div className="space-y-1">
                <label className="font-medium leading-none" htmlFor="">
                    Price :
                </label>
                <Input
                    id="price"
                    type="price"
                    className="border-black"
                    value={test.price}
                    onChange={(e) => handleSelectChange("name", e.target.price)}
                />
                <p className="text-xs text-muted-foreground">
                    Add price.
                </p>
            </div>

            <div className="space-y-1">
                <label className="font-medium leading-none" htmlFor="">
                    Description :
                </label>
                <Input
                    id="description"
                    type="description"
                    className="border-black"
                    value={test.description}
                    onChange={(e) => handleSelectChange("name", e.target.description)}
                />
                <p className="text-xs text-muted-foreground">
                    Add Description.
                </p>
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

            <Button onClick={handleAddTest} className="w-full">
                ADD TEST
            </Button>
        </div>
    );
};

export default AddLabTests;
