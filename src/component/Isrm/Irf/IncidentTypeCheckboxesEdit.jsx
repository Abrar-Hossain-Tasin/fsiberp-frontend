import React from "react";

const checkboxOptions = [
  {
    label: "Lost or stolen equipment or software or information",
    value: "Lost or stolen equipment or software or information",
  },
  { label: "Malicious code e.g. virus", value: "Malicious code e.g. virus" },
  {
    label: "Unauthorized access to computing resources",
    value: "Unauthorized access to computing resources",
  },
  {
    label: "Unauthorized physical access",
    value: "Unauthorized physical access",
  },
  { label: "Fraud or forgery", value: "Fraud or forgery" },
  {
    label: "Obscene or offensive material",
    value: "Obscene or offensive material",
  },
  {
    label: "Illegal or unauthorized software/information",
    value: "Illegal or unauthorized software/information",
  },
  { label: "Other from of IT misuse", value: "Other from of IT misuse" },
  {
    label: "It unavailability/poor performance",
    value: "It unavailability/poor performance",
  },
  { label: "Software problem/failure", value: "Software problem/failure" },
  {
    label: "Physical/environmental incident e.g. fire",
    value: "Physical/environmental incident e.g. fire",
  },
  {
    label: "Information confidentially breach",
    value: "Information confidentially breach",
  },
  { label: "Corruption of information", value: "Corruption of information" },
  {
    label: "Unavailability of information",
    value: "Unavailability of information",
  },
  {
    label: "Credit or debit card data involved",
    value: "Credit or debit card data involved",
  },
  { label: "Others", value: "Others" },
];

const IncidentTypeCheckboxesEdit = ({ typeOfIncident, setTypeOfIncident }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setTypeOfIncident((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    typeOfIncident;
  };

  return (
    <form className="flex flex-wrap gap-1 text-sm py-2 font-[500]">
      {checkboxOptions.map((option) => (
        <label key={option.value} className="mr-4">
          <input
            className="mx-2"
            type="checkbox"
            value={option.value}
            checked={typeOfIncident.includes(option.value)} // Check if the value is in the array
            onChange={handleCheckboxChange}
          />
          {option.label}
        </label>
      ))}
    </form>
  );
};

export default IncidentTypeCheckboxesEdit;
