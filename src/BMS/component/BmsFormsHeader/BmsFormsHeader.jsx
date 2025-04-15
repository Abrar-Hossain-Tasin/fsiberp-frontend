import Logo from "../../../BMS/assets/logo.png";

const BmsFormsHeader = ({
  bankname,
  documentno,
  versionno,
  effecteddate,
  lastpage,
  formname,
  formrefno,
  rdiv,
  rformname,
  headformname,
  submitDate,
  referenceValue,
  branchname,
}) => {
  // Get the current date in a readable format
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="flex flex-col mt-5 p-3 text-[#1b3c1c] bg-[#CFE2F3]">
      <div className="flex">
        <img
          src={Logo}
          alt=""
          className="w-[100px] p-2 border-2 border-black border-r-0"
        />

        <div className="text-center border border-black font-bold w-full">
          <h1 className="border border-black pt-[12px] h-[52px] pl-[4px] text-[20px] pr-[4px] text-[#073763]">
            FIRST SECURITY ISLAMI BANK PLC
          </h1>
          <h2 className="border border-black py-[2.5px] text-[18px] text-[#073763]">
            {formname}
          </h2>
          <h3 className="border border-black  p-[4px] text-[16px] text-[#073763]">
            {branchname}
          </h3>
        </div>
      </div>

      <div className="flex justify-between mt-4 mx-2  text-[#073763]">
        <div>
          <p className="text-[16px]">
            <strong>L.Folio No./{referenceValue}</strong>
          </p>
        </div>
        <div className="flex items-end justify-end">
          <strong className="text-[16px]">Submitted Date : </strong>{" "}
          <strong>
            <p className="ml-1">{submitDate || currentDate}</p>
          </strong>{" "}
        </div>
      </div>
    </div>
    // </section>
  );
};

export default BmsFormsHeader;
