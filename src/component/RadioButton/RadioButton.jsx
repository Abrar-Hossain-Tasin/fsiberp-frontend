const RadioButton = ({
  id,
  name,
  value,
  htmlFor,
  labeltext,
  className,
  ml,
  onChange,
  checked,
  domainuser,
}) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={` ${ml}`}
        onChange={onChange}
        checked={checked}
        disabled={domainuser === "1" && value === "Create"}
      />
      <label htmlFor={htmlFor} className={className}>
        {labeltext}
      </label>
    </>
  );
};

export default RadioButton;
