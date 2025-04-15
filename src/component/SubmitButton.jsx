const SubmitButton = ({ onClick }) => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <p
          className="my-4 mt-2 text-center bg-green-700 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
          onClick={onClick}
        >
          Submit
        </p>
      </div>
    </>
  );
};

export default SubmitButton;
