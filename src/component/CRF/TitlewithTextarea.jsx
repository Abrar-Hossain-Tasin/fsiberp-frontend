const TitlewithTextarea = ({
  strongtext,
  title,
  placeholder,
  htmlFor,
  id,
  name,
  titlebottom,
  width,
  margin_left,
  margin_bottom,
  margin_top,
  onChange,
  type,
}) => {
  return (
    <>
      <div className={`font-bold text-sm ${titlebottom}`}>
        <label htmlFor={htmlFor} className="">
          {strongtext}
          {title}
        </label>
      </div>
      <textarea
        type={type}
        id={id}
        name={name}
        rows="1"
        cols="40"
        // className={`text-[#514f4f] border-2 border-[#d2d2e4] ${width} ${margin_left} ${margin_bottom} ${margin_top} p-1 rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]`}
        className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
        placeholder={placeholder}
        // onChange={handleAccessInfoValue}
        onChange={onChange}
      ></textarea>
    </>
  );
};

export default TitlewithTextarea;
