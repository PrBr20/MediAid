import React from "react";
import { useContext } from "react";
import { MyContext } from "@/context/MyContext";
import parse from "html-react-parser";

const Overview = () => {
  const med = useContext(MyContext);

  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      {/* <pre>{med.overview}</pre> */}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          font: "Exo 2",
          fontFamily: "sans-serif",
        }}
      >
        {med.overview}
      </pre>
    </div>
  );
};

export default Overview;
