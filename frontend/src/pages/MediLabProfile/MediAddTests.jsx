import React from "react";
import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/config";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
  import Loader from "@/assets/gifs/loader.gif";
  import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";




const AddLabTests = () => {
    const { state } = useContext(AuthContext);
    const id = state?.user._id;
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();


    const [test, setTest] = React.useState({
        Lab: id,
        name: "",
        description: "",
        image: "",
        price: 0,


    });

    const handleSelectChange = (name, value) => {
        setTest({ ...test , [name]: value });
        console.log(test);
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
        setTest({ ...test, image: data.url });
    };
    const handleAddTest = async (e) => {
        e.preventDefault();
        console.log(test);
    
        const res = await fetch(`${BASE_URL}/mediLab/addtests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
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
                    type="number"
                    className="border-black"
                    value={test.price}
                    onChange={(e) => handleSelectChange("price", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                    Add price.
                </p>
            </div>

            <div className="space-y-1">
                <label className="font-medium leading-none" htmlFor="">
                    Description :
                </label>
                <Textarea
                    id="description"
            
                    className="border-black"
                    value={test.description}
                    onChange={(e) => handleSelectChange("description", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                    Add Description.
                </p>
            </div>
         
          
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                    id="image"
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
