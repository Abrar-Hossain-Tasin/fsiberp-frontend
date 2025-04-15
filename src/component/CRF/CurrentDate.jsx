const CurrentDate = ({
  type,
  id,
  text,
  chngimplemation,
  setChngimplemation,
}) => {
  const handleDateChange = (event) => {
    setChngimplemation(event.target.value);
  };
  return (
    <>
      <div className="flex">
        <label htmlFor="date" className="mt-[19px] mr-[5px]">
          <strong>{text}</strong>{" "}
        </label>
        <input
          type={type}
          id={id}
          className="text-[#514f4f] border-2 border-[#d2d2e4] w-60 p-1 mt-3  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
          onChange={handleDateChange}
        />{" "}
        <br /> <br />
      </div>
    </>
  );
};

export default CurrentDate;
