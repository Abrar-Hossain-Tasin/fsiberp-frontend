import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../pages/AdminDashboard/encryption/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";

const AdminApprovalStatusEmail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const { userId, formId, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFormData(data);
        data; // Log the fetched data
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!formData) return <p>No data available</p>;

  const {
    saheadusername,
    isrmheadusername,
    citousername,
    implementedbyusername,
    saheadstatus,
    isrmheadstatus,
    citostatus,
    implementedbystatus,
    saheadcmnt,
    isrmheadcmnt,
    citocmnt,
    implementedbycmnt,
  } = formData;

  return (
    <div className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded mt-4">
      <table className="min-w-full border">
        <thead className="text-sm">
          <tr>
            <th className="py-2 px-4 border border-black">
              Checked By AD In charge
            </th>
            <th className="py-2 px-4 border border-black">
              Recommended by Head of ISRM Unit/CISO
            </th>
            <th className="py-2 px-4 border border-black">
              Approval by HOICTD/CTO/CIO/CITO
            </th>
            <th className="py-2 px-4 border border-black">Implemented by</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          <tr>
            <td className="py-2 px-4 border border-black">{saheadusername}</td>
            <td className="py-2 px-4 border border-black">
              {isrmheadusername}
            </td>
            <td className="py-2 px-4 border border-black">{citousername}</td>
            <td className="py-2 px-4 border border-black">
              {implementedbyusername
                ? implementedbyusername
                : "System Administration Unit"}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  saheadstatus === "Accepted"
                    ? "text-green-600" // Tailwind CSS class for green text
                    : saheadstatus === "Rejected"
                    ? "text-red-600" // Tailwind CSS class for red text
                    : ""
                }
              >
                {saheadstatus}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  isrmheadstatus === "Accepted"
                    ? "text-green-600" // Tailwind CSS class for green text
                    : isrmheadstatus === "Rejected"
                    ? "text-red-600" // Tailwind CSS class for red text
                    : ""
                }
              >
                {isrmheadstatus}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  citostatus === "Accepted"
                    ? "text-green-600" // Tailwind CSS class for green text
                    : citostatus === "Rejected"
                    ? "text-red-600" // Tailwind CSS class for red text
                    : ""
                }
              >
                {citostatus}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  implementedbystatus === "Done"
                    ? "text-green-600" // Tailwind CSS class for green text
                    : implementedbystatus === "Rejected"
                    ? "text-red-600" // Tailwind CSS class for red text
                    : ""
                }
              >
                {implementedbystatus}
              </strong>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              Comment: <strong>{saheadcmnt}</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Comment: <strong>{isrmheadcmnt}</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Comment: <strong>{citocmnt}</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Comment: <strong>{implementedbycmnt}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminApprovalStatusEmail;
