const LabelInput = ({
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
    <>
      <label htmlFor={htmlFor} className="font-semibold text-gray-700 mb-1">
        {labeltext}
      </label>
      <input
        type={type}
        id={id}
        className="border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete="off"
        required={required}
        multiple={multiple}
      />
    </>
  );
};

export default LabelInput;
