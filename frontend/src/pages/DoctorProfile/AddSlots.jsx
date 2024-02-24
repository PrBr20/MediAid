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

const AddSlots = () => {
  const { state } = useContext(AuthContext);
  const id = state?.user._id;
  const { toast } = useToast();

  // const { toast } = useToast();

  const [slot, setSlot] = useState({
    doctor: id,
    slotDate: "",
    starthr: "",
    startmin: "",
    endhr: "",
    endmin: "",
    patientCount: "",
    location: "",
  });

  const handleChange = (name, value) => {
    setSlot({ ...slot, [name]: value });
  };

  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const handleAddSlot = async (e) => {
    e.preventDefault();

    for (var d = date.from; d <= date.to; d.setDate(d.getDate() + 1)) {
      const dd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      console.log(dd);

      const newSlot = { ...slot, slotDate: dd };

      console.log(newSlot);

      const res = await fetch(`${BASE_URL}/doctor/timeslots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(newSlot),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      console.log(result);
    }
    toast({
      title: "Slots added successfully",
      description: "You can view your slots in all slots",
    });
  };

  return (
    <div className="flex-col space-y-10 p-2">
      <h1 className="font-bold text-3xl">Add Slots</h1>
      <hr className="border-black" />
      <div className="flex-col space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Pick Date Range :
        </label>

        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-muted-foreground">
          This is the display name that will be shown to other users.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="w-1/4">
          <label className="font-medium leading-none" htmlFor="">
            Enter Starting Time :
          </label>
          <div className="flex items-center justify-center space-x-2">
            <Input
              value={slot.starthr}
              onChange={(e) => handleChange("starthr", e.target.value)}
              placeholder="HH"
            ></Input>
            <p className="font-bold">:</p>
            <Input
              value={slot.startmin}
              onChange={(e) => handleChange("startmin", e.target.value)}
              placeholder="MM"
            ></Input>
          </div>
          <p className="text-xs text-muted-foreground">
            Change you email address.
          </p>
        </div>

        <div className="w-1/4">
          <label className="font-medium leading-none" htmlFor="">
            Enter Ending Time :
          </label>
          <div className="flex items-center justify-center space-x-2">
            <Input
              value={slot.endhr}
              onChange={(e) => handleChange("endhr", e.target.value)}
              placeholder="HH"
            ></Input>
            <p className="font-bold">:</p>
            <Input
              value={slot.endmin}
              onChange={(e) => handleChange("endmin", e.target.value)}
              placeholder="MM"
            ></Input>
          </div>
          <p className="text-xs text-muted-foreground">
            Change you email address.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="space-y-1 flex-col">
          <label className="font-medium leading-none" htmlFor="">
            Location :
          </label>
          <Input
            value={slot.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location"
            className="w-[300px]"
          ></Input>
        </div>

        <div className="space-y-1">
          <label className="font-medium leading-none" htmlFor="">
            Patient Count :
          </label>
          <Input
            value={slot.patientCount}
            onChange={(e) => handleChange("patientCount", e.target.value)}
            placeholder="Enter number"
            className="w-[190px]"
          ></Input>
        </div>
      </div>

      <Button onClick={handleAddSlot}>Add Slot</Button>
    </div>
  );
};

export default AddSlots;
