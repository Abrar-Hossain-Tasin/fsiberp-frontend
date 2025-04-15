import React, { useState, useEffect } from "react";

const ActionPurposeView = ({ action, setAction, type }) => {
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
    setCheckedOptions((prev) => {
      const updatedOptions = checked
        ? [...prev, name]
        : prev.filter((option) => option !== name);

      // Update action based on the current checked options
      let updatedAction = [...updatedOptions];
      if (updatedOptions.includes("Other") && otherValue) {
        updatedAction.push(otherValue);
      }

      setAction(updatedAction);
      return updatedOptions;
    });
  };

  useEffect(() => {
    // Initialize checkedOptions based on the action prop
    const initialChecked = Array.isArray(action)
      ? action.filter((item) => options.some((option) => option.name === item))
      : [];

    setCheckedOptions(initialChecked);

    if (initialChecked.includes("Other")) {
      const otherInputValue = action.find(
        (item) => !options.some((option) => option.name === item)
      );
      setOtherValue(otherInputValue || "");
    } else {
      setOtherValue("");
    }
  }, [action]);

  const handleOtherInputChange = (event) => {
    const value = event.target.value;
    setOtherValue(value);

    // Update action when "Other" input changes
    if (checkedOptions.includes("Other")) {
      const updatedAction = [...checkedOptions];
      updatedAction.push(value); // Include the current value of "Other"
      setAction(updatedAction);
    }
  };

  return (
    <div>
      <table className="w-full my-5 text-sm">
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
                  <div key={option.name}>
                    <input
                      type="checkbox"
                      id={option.name}
                      name={option.name}
                      checked={checkedOptions.includes(option.name)}
                      onChange={type === "view" ? "" : handleCheckboxChange}
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

export default ActionPurposeView;
