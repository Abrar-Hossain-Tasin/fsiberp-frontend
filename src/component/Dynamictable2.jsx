import { useEffect, useState } from "react";

const Dynamictable2 = ({ userid }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/access/view/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the response to inspect it
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full  border ">
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
            <th className="py-2 px-4 border border-black">Implemented by</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          <tr>
            <td className="py-2 px-4 border border-black">{data.usergrp}</td>
            <td className="py-2 px-4 border border-black">{data.createdby}</td>
            <td className="py-2 px-4 border border-black">
              Implementer Unit Head
            </td>
            <td className="py-2 px-4 border border-black">
              Information Security & Risk Management Unit
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-black">
              Status : <strong>{data.password}</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status : <strong>{data.password}</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status : <strong>Pending</strong>
            </td>
            <td className="py-2 px-4 border border-black">
              Status : <strong>Pending</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dynamictable2;
