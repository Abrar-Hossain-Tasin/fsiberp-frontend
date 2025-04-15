const SubmitButton = ({ onClick }) => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <p
          className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
          onClick={onClick}
        >
          Submit
        </p>
      </div>
    </>
  );
};

export default SubmitButton;
