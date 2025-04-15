import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const ApprovedTable = ({ userid }) => {
  let { userId, formId, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptId(userId)}/${decryptId(
            formId
          )}/${decryptId(id)}`
        );
        const formData2 = await response.json();

        "API Response:", formData2; // Log the response

        setData(formData2);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };
    getData();
  }, [userId, formId, id]); // Updated dependencies

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border">
        <thead className="text-sm">
          <tr>
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
            <td className="py-2 px-4 border border-black">
              {data.isrmheadusername}
            </td>
            <td className="py-2 px-4 border border-black">
              {data.citousername}
            </td>
            <td className="py-2 px-4 border border-black">
              {data.implementedbystatus === "Pending"
                ? "Information Security & Risk Management Unit"
                : data.implementedbyusername}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  data.isrmheadstatus === "Accepted"
                    ? "text-green-700"
                    : data.isrmheadstatus === "Rejected"
                    ? "text-red-700"
                    : ""
                }
              >
                {data.isrmheadstatus}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  data.citostatus === "Accepted"
                    ? "text-green-700"
                    : data.citostatus === "Rejected"
                    ? "text-red-700"
                    : ""
                }
              >
                {data.citostatus}
              </strong>
            </td>

            <td className="py-2 px-4 border border-black">
              Status:{" "}
              <strong
                className={
                  data.implementedbystatus === "Done"
                    ? "text-green-700 "
                    : "text-black"
                }
              >
                {data.implementedbystatus}
              </strong>
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              Comment:{" "}
              <strong
                className={
                  data.isrmheadstatus === "Accepted"
                    ? "text-green-700"
                    : data.isrmheadstatus === "Rejected"
                    ? "text-red-700"
                    : ""
                }
              >
                {data.isrmheadcmnt}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Comment:{" "}
              <strong
                className={
                  data.citostatus === "Accepted"
                    ? "text-green-700"
                    : data.citostatus === "Rejected"
                    ? "text-red-700"
                    : ""
                }
              >
                {data.citocmnt}
              </strong>
            </td>
            <td className="py-2 px-4 border border-black"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedTable;
