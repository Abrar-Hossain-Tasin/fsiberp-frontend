const CheckboxOption = ({ label, value, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id={value}
        name="type_of_incident"
        value={value}
        className="mr-2"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value} className="text-gray-700">
        {label}
      </label>
    </div>
  );
};

const IncidentTypeCheckboxesTwo = ({ potentialImpact, setPotentialImpact }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPotentialImpact([...potentialImpact, value]);
    } else {
      setPotentialImpact(
        potentialImpact.filter((incident) => incident !== value)
      );
    }
  };

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

  return (
    <div className="ml-2">
      {checkboxOptions.map((option, index) => (
        <CheckboxOption
          key={index}
          label={option.label}
          value={option.value}
          checked={potentialImpact.includes(option.value)}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default IncidentTypeCheckboxesTwo;
