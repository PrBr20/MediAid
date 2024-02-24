import React from "react";
import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useToast } from "@/components/ui/use-toast";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
import { Label } from "@/components/ui/label";

const AddSlots = () => {
  const { state } = useContext(AuthContext);
  const id = state?.user._id;

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const [medicine, setMedicine] = useState({
    name: "",
    type: "",
    category: "",
    manufacturer: state.user._id,
    image: "",
    overview: "",
  });

  const handleChange = (name, value) => {
    setSlot({ ...slot, [name]: value });
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(medicine),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    console.log(result);
    toast({
      title: "Slots added successfully",
      description: "You can view your slots in all slots",
    });
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

  return (
    <div className="flex-col space-y-10 p-2">
      <h1 className="font-bold text-3xl">Add Medicine</h1>
      <hr className="border-black" />
      <div className="flex-col space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Name :
        </label>

        <Input
          value={medicine.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name of the medicine"
        ></Input>
      </div>

      <div className="flex-col space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Type :
        </label>

        <Input
          value={medicine.type}
          onChange={(e) => handleChange("type", e.target.value)}
          placeholder="Name of the medicine"
        ></Input>
      </div>

      <div className="flex-col space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Category :
        </label>

        <Input
          value={medicine.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Name of the medicine"
        ></Input>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" onChange={handleFileChange}></Input>
        <div className="flex items-center justify-center">
          {loading && <img src={Loader} alt="" className="w-[20px] h-[20px]" />}
        </div>
      </div>

      <div className="flex-col space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Overview :
        </label>

        <Input
          value={medicine.overview}
          onChange={(e) => handleChange("overview", e.target.value)}
          placeholder="Name of the medicine"
        ></Input>
      </div>

      <Button onClick={handleAddMedicine}>Add Medicine</Button>
    </div>
  );
};

export default AddSlots;
