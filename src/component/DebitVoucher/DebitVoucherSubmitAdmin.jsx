import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bmsApiEighty } from "../../../utils/api/Base_api";

const DebitVoucherSubmitAdmin = ({ userID, onUserDataFetched }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${bmsApiEighty}/api/debit/emp/${userID}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        if (result.message === "No User Found") {
          toast.error("Contact With Software Team, ICT Division", {
            autoClose: 3000,
          });
          setData(null);
          onUserDataFetched(null); // Notify parent about no user
        } else {
          setData(result);
          onUserDataFetched(result); // Notify parent about valid user
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
        To be completed by Respective Personnel
      </h4>
      {/* Render table with user data */}
      <table className="w-full rounded bg-gray-300">
        <thead className="text-sm" style={{ fontWeight: "800" }}>
          <tr>
            <th className="border border-black p-2 w-[15%]">
              2nd Man/Manager Operation
            </th>
            <th className="border border-black p-2 w-[15%]">
              Division Head/Unit Head/Manager
            </th>
            <th className="border border-black p-2 w-[15%]">FAD Second Man</th>
            <th className="border border-black p-2 w-[15%]">FAD Head</th>
            <th className="border border-black p-2 w-[15%]">Disburse By</th>
          </tr>
        </thead>
        <tbody className="text-sm" style={{ fontWeight: "600" }}>
          <tr>
            <td className="border border-black p-2 text-center">
              {data?.secman || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {data?.unithead || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {data?.fadsecmanname || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {data?.fadheadUsername || "N/A"}
            </td>
            <td className="border border-black p-2 text-center">
              {data?.implby || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-center">
              Status: <strong>{data?.status || "Pending"}</strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status: <strong>{data?.status || "Pending"}</strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status: <strong>{data?.fadsecondmanstatus || "Pending"}</strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status: <strong>{data?.fadheadstatus || "Pending"}</strong>
            </td>
            <td className="border border-black p-2 text-center">
              Status: <strong>{data?.status || "Pending"}</strong>
            </td>
          </tr>
          <tr className="text-center">
            <td className="border border-black p-2">
              Comment: {data?.comment || "No comment"}
            </td>
            <td className="border border-black p-2">
              Comment: {data?.comment || "No comment"}
            </td>
            <td className="border border-black p-2">
              Comment: {data?.comment || "No comment"}
            </td>
            <td className="border border-black p-2">
              Comment: {data?.comment || "No comment"}
            </td>
            <td className="border border-black p-2">
              Comment: {data?.comment || "No comment"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DebitVoucherSubmitAdmin;
