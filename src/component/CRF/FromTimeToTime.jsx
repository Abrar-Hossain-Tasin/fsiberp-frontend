import React from "react";

const FromTimeToTime = ({
  type,
  step,
  id,
  endtype,
  endstep,
  endid,
  impltimestart,
  setImpltimestart,
  impltimeend,
  setImpltimeend,
}) => {
  const handleFromTimeChange = (event) => {
    setImpltimestart(event.target.value);
  };
  const handleToTimeChange = (event) => {
    setImpltimeend(event.target.value);
  };

  return (
    <>
      <div className="flex space-x-10">
        <div className="flex">
          <label htmlFor="from_time" className="mt-[19px] mr-[5px]">
            <strong>From:</strong>{" "}
          </label>
          <input
            type={type}
            step={step}
            id={id}
            className="text-[#514f4f] border-2 border-[#d2d2e4] w-32 p-1 mt-3  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            onChange={handleFromTimeChange}
          />{" "}
          <br /> <br />
        </div>

        <div className="flex">
          <label htmlFor="to_time" className="mt-[19px] mr-[5px]">
            <strong>To:</strong>{" "}
          </label>
          <input
            type={endtype}
            step={endstep}
            id={endid}
            className="text-[#514f4f] border-2 border-[#d2d2e4] w-32 p-1 mt-3  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            onChange={handleToTimeChange}
          />{" "}
          <br /> <br />
        </div>
      </div>
    </>
  );
};

export default FromTimeToTime;
