import React from "react";
import Qualifs from "@/assets/images/qualifs.svg";

const Qualification = ({ doctor }) => {
  return (
    <div className="bg-slate-100 p-5 flex-col space-y-3">
      <h1 className="font-bold text-lg">Qualifications</h1>
      <div>
        {doctor.qualifications.map((qualif, index) => (
          <div className="flex items-center space-x-3">
            <img src={Qualifs} alt="" className="w-[25px] h[25px" />
            <p className="text-sm">{qualif}</p>
          </div>
        ))}
      </div>
      <h1 className="font-bold text-lg">Experiences</h1>
      <div>
        {doctor.experiences.map((exp, index) => (
          <div className="flex items-center space-x-3">
            <img src={Qualifs} alt="" className="w-[25px] h[25px" />
            <p className="text-sm">{exp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qualification;
