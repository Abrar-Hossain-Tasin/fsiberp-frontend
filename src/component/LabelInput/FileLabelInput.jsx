import React from "react";

const FileLabelInput = ({
  htmlFor,
  labeltext,
  type,
  id,
  placeholder,
  onChange,
  value,
  required,
  multiple,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-semibold text-gray-700 mb-1">
        {labeltext}
      </label>
      <input
        type={type}
        id={id}
        className="border border-gray-300 rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600 mt-1 w-5"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete="off"
        required={required}
        multiple={multiple}
      />
    </div>
  );
};

export default FileLabelInput;
