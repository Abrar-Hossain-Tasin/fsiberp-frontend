import React from "react";

const LabelTextarea = ({
  htmlFor,
  labeltext,
  name,
  id,
  rows,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="font-semibold text-gray-700 mb-1">
        {labeltext}
      </label>
      <textarea
        name={name}
        id={id}
        className="border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete="off"
      ></textarea>
    </>
  );
};

export default LabelTextarea;
