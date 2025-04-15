import { useEffect, useState } from "react";
import { bmsApiEighty } from "../../../utils/api/Base_api";

const UserLoginDetails = ({ userid, setBranchname }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${bmsApiEighty}/api/debit/view/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the response to inspect it
        setData(data);
        setBranchname(data.department);
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
    <table className="w-full border h-[150px] bg-gray-200  ">
      <thead className="text-sm">
        <tr>
          <th
            className="py-2 px-2 border border-black w-[20px]"
            style={{ fontWeight: "800" }}
          >
            Branch/Division
          </th>
          <th
            className="py-2 px-2 border border-black w-[20px]"
            style={{ fontWeight: "800" }}
          >
            Unit/Department
          </th>
          <th
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "800" }}
          >
            Employee Name
          </th>
          <th
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "800" }}
          >
            Employee PF ID
          </th>
          <th
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "800" }}
          >
            Designation
          </th>
          <th
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "800" }}
          >
            Phone No
          </th>
          <th
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "800" }}
          >
            Date of Join
          </th>
        </tr>
      </thead>
      <tbody className="text-sm text-center">
        <tr>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.department}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.unit}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.username}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.userid}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.designation}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.contactno}
          </td>
          <td
            className="py-2 px-2 border border-black"
            style={{ fontWeight: "600" }}
          >
            {data.dateofjoining}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserLoginDetails;
