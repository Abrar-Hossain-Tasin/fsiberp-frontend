const Textarea = ({
  width,
  placeholder,
  id,
  rows,
  margin_left,
  type,
  Childvalue,
  onTextAreaValue,
  my,
  mt,
  value,
  disabled,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <textarea
          rows={rows}
          cols="30"
          type="text"
          id={id}
          value={value}
          // value={Childvalue}
          className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full placeholder-opacity-100 text-center"
          placeholder={placeholder}
          // onChange={(e) => {
          //   setChildValue(e.target.value);
          // }}
          onChange={onTextAreaValue}
          disabled={disabled}
          required
        />
      </div>
    </>
  );
};

export default Textarea;
