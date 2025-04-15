import React from "react";
import Logo from "../../../assets/logo.png";
const FormHeader = ({
  DivisionName,
  FormName,
  DocumentNo,
  VersionNo,
  EffectiveDate,
  PageNo,
  TotallPage,
  ReferenceDivision,
  ReferenceFormName,
  HeadfFormName,
}) => {
  return (
    <div>
      <table className=" w-full border border-black">
        <thead>
          <tr>
            <th rowSpan={4} width={100}>
              <img src={Logo} alt="" className="w-[100px] p-1" />
            </th>
            <th rowSpan={2} className="border border-black">
              FIRST SECURITY ISLAMI BANK PLC
            </th>
            <td className="border border-black text-left">
              Document No.: <strong>1001</strong>
            </td>
          </tr>
          <tr>
            <td className="border border-black text-left">
              Version No.: <strong>03</strong>
            </td>
          </tr>
          <tr>
            <th className="border border-black">ICT Division</th>
            <td className="border border-black text-left">
              Effective Date: <strong>08.10.2023</strong>
            </td>
          </tr>
          <tr>
            <th className="border border-black">Access Rights Request Form</th>
            <td className="border border-black text-left">
              Page <strong>1</strong> of <strong>1</strong>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default FormHeader;
