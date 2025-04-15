import React from "react";

const Input = ({ type, placeholdertext, value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholdertext}
      // className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
    />
  );
};

export default Input;
