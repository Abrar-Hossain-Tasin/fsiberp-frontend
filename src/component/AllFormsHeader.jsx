import Logo from "../assets/logo.png";

const AllFormsHeader = ({
  divname,
  formname,
  dno,
  vno,
  edate,
  fpageno,
  lpageno,
  rdiv,
  rformname,
  headformname,
  formrefno,
  submitdate,
  referenceValue,
}) => {
  // Get the current date in a readable format
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <section className="bg-slate-200/95 rounded">
        <div className="flex flex-col mt-2 p-3 text-[#1b3c1c]">
          <div className="flex">
            <img
              src={Logo}
              alt=""
              className="w-[100px] p-1 border border-custom-color"
            />

            <div className="text-center font-bold w-full">
              <h3 className="border border-custom-color pt-[12px] h-[52px] text-[18px]  pl-[4px] pr-[4px] text-[#1b3c1c]">
                FIRST SECURITY ISLAMI BANK PLC
              </h3>
              <h3 className="border border-custom-color py-[2.5px] text-[15px] text-[#1b3c1c]">
                {divname}
              </h3>
              <h3 className="border border-custom-color p-[4px] text-[16px] text-[#1b3c1c]">
                {formname}
              </h3>
            </div>

            <div>
              <div className="w-[164px] ">
                <p className="border border-custom-color p-1 text-xs font-[520]  text-[#1b3c1c]">
                  <strong>Document No.: {dno}</strong>
                </p>
                <h4 className="border border-custom-color p-1 text-xs font-[520] text-[#1b3c1c]">
                  <strong> Version No.: {vno}</strong>
                </h4>

                <h4 className="border border-custom-color py-[6px] px-1  text-xs font-[520] text-[#1b3c1c]">
                  <strong> Effective Date: {edate}</strong>
                </h4>

                <h4 className="border border-custom-color pt-[8px] p-1 text-xs font-[520] h-[34px] text-[#1b3c1c]">
                  <strong>
                    {" "}
                    Page {fpageno} of {lpageno}
                  </strong>
                </h4>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-2 mx-2 ">
            <div>
              <p className="text-[16px]">
                <strong>
                  Reference: FSIB/HO/{rdiv}/{rformname}
                  {formrefno}/{referenceValue}
                </strong>
              </p>
            </div>
            <div className="flex items-end justify-end">
              <strong className="text-[16px]">Submitted Date : </strong>{" "}
              <strong>
                <p className="ml-1 text-[16px]">
                  {submitdate ? submitdate : currentDate}
                </p>
              </strong>{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllFormsHeader;
