import React from "react";

const LabelwithInput = ({
  labelhtmlfor,
  labelname,
  inputtype,
  inputid,
  inputname,
  width,
  margin_left,
  margin_top,
  placeholder,
  mb,
  onChange,
  value,
}) => {
  return (
    <>
      <label htmlFor={labelhtmlfor} className={`${mb}`}>
        <strong>{labelname}</strong>
      </label>

      <input
        type={inputtype}
        id={inputid}
        name={inputname}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`text-[#514f4f] border-2 border-[#d2d2e4]   p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] ${width} ${margin_left} ${margin_top}`}
      />
    </>
  );
};

export default LabelwithInput;
