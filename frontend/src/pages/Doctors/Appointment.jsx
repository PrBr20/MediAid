import React from "react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

const Appointment = ({ apps , doctor}) => {
  const { state } = useContext(AuthContext);
  
  const [date, setDate] = useState(new Date());

  const [slots, setSlots] = useState([]);

  const [targetApp, setTargetApp] = useState(null);

  console.log(doctor)
  console.log(state.token);

  // useEffect(() => {
  //   setSlots([]);
  //   console.log(apps.length)
  //   console.log(slots.length)
  //   console.log(date.getDate())
  //   apps.map((app) => new Date(app.date).getDate() == date.getDate() ? setSlots([...slots, app]) : null);
  // }, [date]);

  const handleChange = (value) => {
    setTargetApp(value);
  };

  const handleTakeAppointment = async (value) => {
    const res = await fetch(`${BASE_URL}/appointment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        doctor: doctor._id,
        ticketPrice: 1000,
        timeSlot: targetApp._id,
      }),
    });

    if (!res.ok) {
      throw new Error(result.message);
    }

    const result = await res.json();

    console.log(result);
  }

  return (
    <div className="flex-col space-y-5">
      <h1 className="text-2xl font-bold">Slot Availability</h1>
      <div className="flex-col space-y-2">
        <h1 className="font-bold text-lg">Select Date : </h1>
        <div className="DatePicker">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal border border-black",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex-col space-y-2">
        <h1 className="font-bold text-lg">Location : </h1>
        <p>Popular Diagnostic Center, Shantinagar Mor, Dhaka</p>
      </div>
      <div className="flex-col space-y-2">
        <h1 className="font-bold text-lg">Select Slot : </h1>
        <div className="SlotSelector">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[280px] border border-black">
              <SelectValue placeholder="Select a slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Slots</SelectLabel>
                {apps.map(
                  (app, index) =>
                    new Date(app.date).getDate() == date.getDate() && (
                      <SelectItem key={index} value={app}>
                        {app.starthr}:{app.startmin} - {app.endhr}:{app.endmin}
                      </SelectItem>
                    )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="w-[280px]" onClick={handleTakeAppointment}>Take Appointment</Button>
    </div>
  );
};

export default Appointment;
