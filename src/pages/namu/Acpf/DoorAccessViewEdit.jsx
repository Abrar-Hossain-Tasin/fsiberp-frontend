import React, { useState, useEffect } from "react";

const DoorAccessViewEdit = ({ doorAccess, setDoorAccess, type }) => {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [otherValue, setOtherValue] = useState("");

  const options = [
    { name: "MainDoor", label: "Main Door" },
    { name: "Cash", label: "Cash" },
    // { name: "Vault", label: "Vault" },
    { name: "Other", label: "Other" },
  ];

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    setCheckedOptions((prev) => {
      const updatedOptions = checked
        ? [...prev, name]
        : prev.filter((option) => option !== name);

      // Update doorAccess based on the current checked options
      let updatedDoorAccess = [...updatedOptions];
      if (updatedOptions.includes("Other") && otherValue) {
        updatedDoorAccess.push(otherValue);
      }

      setDoorAccess(updatedDoorAccess);
      return updatedOptions;
    });
  };

  useEffect(() => {
    // Initialize checkedOptions based on the doorAccess prop
    const initialChecked = Array.isArray(doorAccess)
      ? doorAccess.filter((item) =>
          options.some((option) => option.name === item)
        )
      : [];

    setCheckedOptions(initialChecked);

    if (initialChecked.includes("Other")) {
      const otherInputValue = doorAccess.find(
        (item) => !options.some((option) => option.name === item)
      );
      setOtherValue(otherInputValue || "");
    } else {
      setOtherValue("");
    }
  }, [doorAccess]);

  const handleOtherInputChange = (event) => {
    const value = event.target.value;
    setOtherValue(value);

    // Update doorAccess when "Other" input changes
    if (checkedOptions.includes("Other")) {
      const updatedDoorAccess = [...checkedOptions];
      updatedDoorAccess.push(value); // Include the current value of "Other"
      setDoorAccess(updatedDoorAccess);
    }
  };

  return (
    <td rowSpan={2} className="border border-black pl-24 px-5 py-2">
      <div className="font-[500] ">
        {options.map((option) => (
          <div key={option.name}>
            <input
              type="checkbox"
              id={option.name}
              name={option.name}
              checked={checkedOptions.includes(option.name)}
              onChange={type === "view" ? () => {} : handleCheckboxChange}
            />
            <label htmlFor={option.name} className="mx-2">
              {option.label}
            </label>
            {option.name === "Other" && (
              <input
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                id="Other"
                type="text"
                value={otherValue}
                onChange={handleOtherInputChange}
                disabled={!checkedOptions.includes("Other")}
                placeholder="Enter other access..."
                autoComplete="off"
              />
            )}
          </div>
        ))}
      </div>
    </td>
  );
};

export default DoorAccessViewEdit;
