import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { decryptId } from "../../../../pages/AdminDashboard/encryption/Encrypted";

import { bmsApiEighty } from "../../../../utils/api/Base_api";

const DebitVoucherDmdAmdAdmin = ({ userID, onUserDataFetched }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({});

  const [amddmd, setAmddmd] = useState({});

  const { userId, formId, id } = useParams();

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-600"; // Approved status styling
      case "Done":
        return "text-green-600";
      case "Rejected":
        return "text-red-600"; // Rejected status styling
      default:
        return "text-black"; // Pending status styling
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${bmsApiEighty}/api/bms_dashboard/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setFormData(result);

        // if (result.message === "No User Found") {
        //   toast.error("Contact With Software Team, ICT Division", {
        //     autoClose: 3000,
        //   });
        //   setData(null);
        //   onUserDataFetched(null); // Notify parent about no user
        // } else {
        //   setData(result);
        //   onUserDataFetched(result); // Notify parent about valid user
        // }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        // Fetching data from the new API endpoint
        const response = await fetch(
          `${bmsApiEighty}/api/debit/emp/${decryptedUserId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        // Assuming the result contains dmd and amd fields
        setAmddmd(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
        To be completed by Respective Personnel
      </h4>
      {/* Render table with user data */}
      <table className="w-full bg-gray-300">
        <thead className="text-sm" style={{ fontWeight: "800" }}>
          <tr>
            <th className="border border-black p-2 w-[15%]">
              2nd Man/Manager Operation
            </th>
            <th className="border border-black p-2 w-[15%]">
              Division Head/Unit Head/Manager
            </th>
            <th className="border border-black p-2 w-[15%]">DMD</th>
            <th className="border border-black p-2 w-[15%]">AMD</th>
            <th className="border border-black p-2 w-[15%]">Disburse By</th>
          </tr>
        </thead>
        <tbody className="text-sm" style={{ fontWeight: "600" }}>
          <tr>
            <td className="border border-black p-2 text-center">
              {formData?.secondmanusername || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {formData?.unitheadusername || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {amddmd?.dmd || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {amddmd?.amd || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {formData?.implementedbyusername || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-center">
              Status:{" "}
              <strong className={getStatusClass(formData?.secondmanstatus)}>
                {formData?.secondmanstatus || "Pending"}
              </strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status:{" "}
              <strong className={getStatusClass(formData?.unitheadstatus)}>
                {formData?.unitheadstatus || "Pending"}
              </strong>
            </td>

            {/* <td className="border border-black p-2 text-center">
              Status:{" "}
              <strong className={getStatusClass(formData?.dmdstatus)}>
                {formData?.amdsubdate === null ? formData?.dmdstatus : "N/A"}
              </strong>
             
            </td> */}

            <td className="border border-black p-2 text-center">
              Status:{" "}
              <strong className={getStatusClass(formData?.dmdstatus)}>
                {formData?.amdsubdate === null
                  ? formData?.dmdstatus === null
                    ? "Pending"
                    : formData?.dmdstatus
                  : "N/A"}
              </strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status:{" "}
              {/* <strong className={getStatusClass(formData?.amdstatus)}>
                {formData?.dmdsubdate === null ? formData?.amdstatus : "N/A"}
              </strong> */}
              <strong className={getStatusClass(formData?.amdstatus)}>
                {formData?.dmdsubdate === null
                  ? formData?.amdstatus === null
                    ? "Pending"
                    : formData?.amdstatus
                  : "N/A"}
              </strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status:{" "}
              <strong className={getStatusClass(formData?.implementedbystatus)}>
                {formData?.implementedbystatus === "Done"
                  ? "Disbursed"
                  : "Pending"}
              </strong>
            </td>
          </tr>
          <tr className="text-center">
            <td className="border border-black p-2">
              Comment:{" "}
              <strong>{formData?.secondmancmnt || "No comment"}</strong>
            </td>
            <td className="border border-black p-2">
              Comment:{" "}
              <strong> {formData?.unitheadcmnt || "No comment"}</strong>
            </td>
            <td className="border border-black p-2">
              Comment: <strong>{formData?.dmdcmnt || "No comment"}</strong>
            </td>
            <td className="border border-black p-2">
              Comment: <strong>{formData?.amdcmnt || "No comment"}</strong>
            </td>
            <td className="border border-black p-2">
              Comment:{" "}
              <strong>{formData?.implementedbycmnt || "No comment"}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DebitVoucherDmdAmdAdmin;
