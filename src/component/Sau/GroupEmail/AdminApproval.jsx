import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../../pages/AdminDashboard/encryption/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";

const AdminApprovalGroupEmail = ({
  userid,
  fname,
  sname,
  tname,
  iby,
  fnameperson,
  snameperson,
  tnameperson,
  ibynameperson,
  fnamestatus,
  snamestatus,
  tnamestatus,
  ibypersonstatus,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { userId, formId, id } = useParams();

  useEffect(() => {
    fetch(`${Base_api}/api/grp_email/view/${userid}`)
      .then((response) => {
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        data;
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Fetch error:", error); // Log the error for debugging
      });
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId;

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div className=" overflow-x-auto font-[500] text-[#1b3c1c] bg-slate-200/95 ">
      <table className="min-w-full border text-sm">
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
            <th className="py-2 px-4 border border-black">Implemented By</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          <tr>
            <td className="py-2 px-4 border border-black">
              {formData.isrmheadusername || "Md. Mostafejur Rahman"}
            </td>
            <td className="py-2 px-4 border border-black">
              {formData.citousername || "Md. Mushfiqur Rahman"}
            </td>
            <td className="py-2 px-4 border border-black">
              {formData.implbyunitheadusername || "Mohammad Mamunur Rashid"}
            </td>
            <td className="py-2 px-4 border border-black">
              {formData.implementedbyusername || "System Administration Unit"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  formData.isrmheadstatus === "Accepted"
                    ? "text-green-600"
                    : formData.isrmheadstatus === "Rejected"
                    ? "text-red-600"
                    : ""
                }
              >
                {formData.isrmheadstatus || "Pending"}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  formData.citostatus === "Accepted"
                    ? "text-green-600"
                    : formData.citostatus === "Rejected"
                    ? "text-red-600"
                    : ""
                }
              >
                {formData.citostatus || "Pending"}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  formData.implbyunitheadstatus === "Accepted"
                    ? "text-green-600"
                    : formData.implbyunitheadstatus === "Rejected"
                    ? "text-red-600"
                    : ""
                }
              >
                {formData.implbyunitheadstatus || "Pending"}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  formData.implementedbystatus === "Done"
                    ? "text-green-600"
                    : formData.implementedbystatus === "Rejected"
                    ? "text-red-600"
                    : ""
                }
              >
                {formData.implementedbystatus || "Pending"}
              </strong>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              {formData.isrmheadcmnt || "Comment:"}
            </td>
            <td className="py-2 px-4 border border-black">
              {formData.citocmnt || "Comment:"}
            </td>
            <td className="py-2 px-4 border border-black">
              {formData.implbyunitheadcmnt || "Comment:"}
            </td>
            <td className="py-2 px-4 border border-black"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminApprovalGroupEmail;
