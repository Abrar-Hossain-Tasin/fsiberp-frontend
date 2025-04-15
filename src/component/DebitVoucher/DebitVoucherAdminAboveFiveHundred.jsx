import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { bmsApiEighty } from "../../../utils/api/Base_api";

const DebitVoucherAdminAboveFiveHundred = ({ userID, onUserDataFetched }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${bmsApiEighty}/api/debit/emp/${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
    <>
      <div>
        <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by Respective Personnel
        </h4>
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
              <td className="border border-black p-2">
                <h3 className="text-center font-semibold">
                  {data?.secman || "N/A"}
                </h3>
              </td>
              <td className="border border-black p-2">
                <h3 className="text-center font-semibold">
                  {data?.unithead || "N/A"}
                </h3>
              </td>
              <td className="border border-black p-2">
                <h3 className="text-center font-semibold">
                  {data?.dmd || "N/A"}
                </h3>
              </td>
              <td className="border border-black p-2">
                <h3 className="text-center font-semibold">
                  {data?.amd || "N/A"}
                </h3>
              </td>
              <td className="border border-black p-2">
                <h3 className="text-center font-semibold">
                  {data?.implby || "N/A"}
                </h3>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                <h3 className="text-center text-[#383838]">
                  Status: <strong>{data?.status || "Pending"}</strong>
                </h3>
              </td>

              <td className="border border-black p-2">
                <h3 className="text-center text-[#383838]">
                  Status: <strong>{data?.status || "Pending"}</strong>
                </h3>
              </td>

              <td className="border border-black p-2">
                <h3 className="text-center text-[#383838]">
                  Status: <strong>{data?.dmdstatus || ""}</strong>
                </h3>
              </td>

              <td className="border border-black p-2">
                <h3 className="text-center text-[#383838]">
                  Status: <strong>{data?.amdstatus || ""}</strong>
                </h3>
              </td>

              <td className="border border-black p-2">
                <h3 className="text-center text-[#383838]">
                  Status: <strong>{data?.status || "Pending"}</strong>
                </h3>
              </td>
            </tr>
            <tr className="text-center">
              <td className="border border-black p-2">
                <p className="text-[#383838]">
                  Comment: {data?.comment || "No comment"}
                </p>
              </td>
              <td className="border border-black p-2">
                <p className="text-[#383838]">
                  Comment: {data?.comment || "No comment"}
                </p>
              </td>
              <td className="border border-black p-2">
                <p className="text-[#383838]">
                  Comment: {data?.comment || "No comment"}
                </p>
              </td>
              <td className="border border-black p-2">
                <p className="text-[#383838]">
                  Comment: {data?.comment || "No comment"}
                </p>
              </td>
              <td className="border border-black p-2">
                <p className="text-[#383838]">
                  Comment: {data?.comment || "No comment"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DebitVoucherAdminAboveFiveHundred;
