import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { BASE_URL } from "@/config";
import DeleteIcon from "@/assets/images/delete.svg";
import { useToast } from "@/components/ui/use-toast"

const AllSlots = () => {
  const { state } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [slotchange, setSlotChange] = useState(false)

  const { toast } = useToast();
  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch(
        `${BASE_URL}/doctor/timeslots?doctor=${state.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setSlots(result.data);

      console.log(result.data);
    };

    if (state.user) {
      fetchSlots();
    }
  }, [slotchange]);

  const handleRemoveSlot = (slot) => async () => {
    const res = await fetch(
      `${BASE_URL}/doctor/timeslots/${slot._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    else {
      toast({
        title: "Slot removed successfully",
        description: "You can view your slots in all slots",
      })

      setSlotChange(!slotchange)
    }
  }

  return (
    <div className="flex-col space-y-5">
      <h1 className="font-bold text-3xl">All Slots</h1>
      <hr className="border-black" />

      <Table>
        <TableCaption>A list of your slots.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>All Seats</TableHead>
            <TableHead>Occupied</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {new Date(slot.date.split("T")[0]).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {slot.starthr}:{slot.startmin}
              </TableCell>
              <TableCell>
                {slot.endhr}:{slot.endmin}
              </TableCell>
              <TableCell>{slot.patientCount}</TableCell>
              <TableCell>{slot.occupied}</TableCell>
              <TableCell>
                {slot.occupied == 0 ? (
                  <div onClick={handleRemoveSlot(slot)}>
                    <img
                      src={DeleteIcon}
                      className="w-[20px] h-[20px] hover:scale-150 transition-transform"
                      alt=""
                    />
                  </div>
                ) : "Booked"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AllSlots;
