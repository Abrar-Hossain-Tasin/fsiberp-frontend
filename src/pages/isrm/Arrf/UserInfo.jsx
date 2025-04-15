import { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api";

const UserInfo = ({ userid }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/access/view/${userid}`);
        const result = await response.json();
        setData(result);
        data;
      } catch (err) {
        // Handle errors
        setError(err);
      } finally {
        // Ensure that loading is set to false in both success and error cases
        setLoading(false);
      }
    };

    fetchData();
  }, [userid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div className="mt-4">
      <table className="w-full  border ">
        <thead className="text-sm">
          <tr>
            <th className="py-2 px-4 border border-black">Branch/Division</th>
            <th className="py-2 px-4 border border-black">Unit/Department</th>
            <th className="py-2 px-4 border border-black">Employee Name</th>
            <th className="py-2 px-4 border border-black">Employee ID</th>
            <th className="py-2 px-4 border border-black">Designation</th>
            <th className="py-2 px-4 border border-black">Phone No</th>
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          <tr>
            <td className="py-2 px-4 border border-black">{data.department}</td>
            <td className="py-2 px-4 border border-black">{data.unit}</td>
            <td className="py-2 px-4 border border-black">{data.username}</td>
            <td className="py-2 px-4 border border-black">{data.userid}</td>
            <td className="py-2 px-4 border border-black">
              {data.designation}
            </td>
            <td className="py-2 px-4 border border-black">{data.contactno}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
