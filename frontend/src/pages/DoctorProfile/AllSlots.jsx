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
import { set } from "date-fns";

const AllSlots = () => {
  const { state } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch(
        `${BASE_URL}/doctor/timeslots/${state.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(result.message);
      }
      const result = await res.json();

      setSlots(result.data);

      console.log(result.data);
    };

    if (state.user) {
      fetchSlots();
    }
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your slots.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead >Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{slot.date.split('T')[0]}</TableCell>
              <TableCell>
                {slot.starthr}:{slot.startmin}
              </TableCell>
              <TableCell>
                {slot.endhr}:{slot.endmin}
              </TableCell>
              <TableCell >
                {slot.done == 0 ? "Available" : "Booked"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell >All days</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AllSlots;
