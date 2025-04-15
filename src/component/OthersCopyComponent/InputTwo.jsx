const InputTwo = ({ type, id, name, width, placeholder, onChange }) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`text-[#eacccc] border-2 border-[#d2d2e4]  p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] ${width}`}
        onChange={onChange}
      />
    </>
  );
};

export default InputTwo;
