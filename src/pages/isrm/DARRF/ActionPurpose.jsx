import React, { useEffect, useState } from "react";

const ActionPurpose = ({ action, setAction }) => {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [otherValue, setOtherValue] = useState("");
  const options = [
    { name: "Grant", label: "Grant" },
    { name: "Delete", label: "Delete" },
    { name: "Modify", label: "Modify" },
    { name: "Other", label: "Other" },
  ];

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    setCheckedOptions((prev) =>
      checked ? [...prev, name] : prev.filter((option) => option !== name)
    );
  };

  useEffect(() => {
    // Create the action array based on checked options
    let updatedAction = [...checkedOptions];

    if (checkedOptions.includes("Other") && otherValue) {
      updatedAction = [...updatedAction, otherValue];
    }

    setAction(updatedAction);
    updatedAction;
  }, [checkedOptions, otherValue, setAction]);

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border border-black py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2} className="border border-black px-5 py-2">
              <div className="font-[500] flex justify-center gap-5 items-center">
                {options.map((option) => (
                  <div key={option.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.name}
                      name={option.name}
                      checked={checkedOptions.includes(option.name)}
                      onChange={handleCheckboxChange}
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ActionPurpose;
