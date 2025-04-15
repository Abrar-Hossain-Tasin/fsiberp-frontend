import React from "react";

const checkboxOptions = [
  { label: "None", value: "None" },
  { label: "Loss/Compromise of data", value: "Loss/Compromise of data" },
  { label: "Disclosure of data", value: "Disclosure of data" },
  { label: "Damage of systems", value: "Damage of systems" },
  { label: "System Downtime", value: "System Downtime" },
  { label: "Financial loss", value: "Financial loss" },
  {
    label: "Loss cooling system/ Humidity system",
    value: "Loss cooling system/ Humidity system",
  },
  {
    label: "Violation of legislation / regulation",
    value: "Violation of legislation / regulation",
  },
  {
    label:
      "Damage to the Integrity/ Delivery of Critical Goods, Service or information",
    value:
      "Damage to the Integrity/ Delivery of Critical Goods, Service or information",
  },
  { label: "Network Outage", value: "Network Outage" },
  { label: "Loss on high availability", value: "Loss on high availability" },
  { label: "Loss Power", value: "Loss Power" },
  { label: "Unknown at this time", value: "Unknown at this time" },
  { label: "Others", value: "Impact_Others" },
];

const ImpactPotentialImpactSubmit = ({
  potentialImpact,
  setPotentialImpact,
}) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setPotentialImpact((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    potentialImpact;
  };

  return (
    <form>
      <div className="flex py-2 gap-1 flex-wrap">
        {checkboxOptions.map((option) => (
          <label key={option.value} className="mr-4 text-sm font-[500]">
            <input
              className="mx-2"
              type="checkbox"
              value={option.value}
              onChange={handleCheckboxChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </form>
  );
};

export default ImpactPotentialImpactSubmit;
