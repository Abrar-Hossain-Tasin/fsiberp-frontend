import Logo from "../../../BMS/assets/logo_fsib.png";

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
    <div className="flex flex-col mt-5">
      <h3 className="text-center font-bold text-xl mt-5">{headformname}</h3>

      <table className="min-w-full border-collapse border border-gray-300 mt-2">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2 text-left" rowSpan={4}>
              <div className="flex justify-center">
                <img src={Logo} alt="" className="w-[350px] p-1" />
              </div>
            </td>

            {/* <td className="border border-gray-300 text-center">
              <p className="text-sm">
              Document No : <strong>{documentno}</strong>
              </p>
              </td> */}
          </tr>

          <tr>
            <td className="border border-gray-300 text-center ">
              {branchname}
              <h1 className="font-bold text-xl ">{bankname}</h1>
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 text-center font-bold">
              <h1 className="font-bold text-xl ">{formname}</h1>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mt-2 mx-2">
        <div>
          <p>L.Folio No./{referenceValue}</p>
        </div>
        <div className="flex items-end justify-end">
          <strong>Submitted Date:</strong>
          <p className="ml-1">{submitDate || currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default BmsFormsHeader;
