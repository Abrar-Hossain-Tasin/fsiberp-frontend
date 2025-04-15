import React from "react";
import ImplementedUnitHeadSearch from "../CRF/ImplementedUnitHeadSearch";

import { Base_api } from "../../utils/api/Base_api";

import { useEffect } from "react";

import { useState } from "react";

import { useParams } from "react-router-dom";

import { decryptId } from "../../../src/pages/AdminDashboard/encryption/Encrypted";

const DbAdminApproval = ({
  implbyunitheaduserid,
  setImplbyunitheaduserid,
  implbyunitheadusername,
  setImplbyunitheadusername,
  implbyunitheadsearchTerm,
  setImplbyunitheadSearchTerm,
  unit,
  setUnit,
  type,
  implementedbyusername,
  setImplementedbyusername,
}) => {
  const { userId, formId, id } = useParams();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (unit) {
      setImplementedbyusername(unit); // Update implementedbyusername when unit changes
    } else {
      setImplementedbyusername(""); // Reset to empty if no unit
    }
  }, [unit, setImplementedbyusername]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        ("abrar");
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId, type;
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);

        setImplementedbyusername(data.implementedbyusername);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);
  return (
    <>
      <div className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded">
        <div className="">
          <table className="min-w-full border">
            <thead className="text-sm">
              <tr>
                <th className="py-2 px-4 border border-black">
                  Recommended by Head of ISRM Unit/CISO
                </th>
                <th className="py-2 px-4 border border-black">
                  Approval by HOICTD/CTO/CIO/CITO
                </th>
                <th className="py-2 px-4 border border-black">
                  Implementer's Unit Head
                </th>
                <th className="py-2 px-4 border border-black">
                  Implemented by
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              <tr>
                <td className="py-2 px-4 border border-black">
                  Md. Mostafejur Rahman
                </td>
                <td className="py-2 px-4 border border-black">
                  Md. Mushfiqur Rahman
                </td>
                <td className="py-2 px-4 border border-black">
                  <ImplementedUnitHeadSearch
                    implbyunitheaduserid={implbyunitheaduserid}
                    setImplbyunitheaduserid={setImplbyunitheaduserid}
                    implbyunitheadusername={implbyunitheadusername}
                    setImplbyunitheadusername={setImplbyunitheadusername}
                    implbyunitheadsearchTerm={implbyunitheadsearchTerm}
                    setImplbyunitheadSearchTerm={setImplbyunitheadSearchTerm}
                    unit={unit}
                    setUnit={setUnit}
                    type={type}
                  />
                </td>
                <td className="py-2 px-4 border border-black">
                  {unit ||
                    formData.implementedbyusername ||
                    "Implementer's Unit Name"}
                </td>
              </tr>

              <tr>
                <td className="py-2 px-4 border border-black">
                  Status: <strong> Pending</strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Status: <strong> Pending</strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Status: <strong> Pending</strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Status: <strong> Pending</strong>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-black">
                  Comment: <strong> </strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Comment: <strong></strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Comment: <strong></strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  {/* Comment: <strong>Not Yet!</strong> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DbAdminApproval;
