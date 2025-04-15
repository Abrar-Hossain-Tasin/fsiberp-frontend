import { useEffect, useState } from "react";

import { Base_api } from "../../utils/api/Base_api.jsx";

const DomainAdminTable = ({
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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${Base_api}/api/domain/view/${userid}`)
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
    <>
      <section className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full  border ">
            <thead className="text-sm">
              <tr>
                <th className="py-2 px-4 border border-black">{fname}</th>
                <th className="py-2 px-4 border border-black">{tname}</th>

                <th className="py-2 px-4 border border-black">{sname}</th>
                <th className="py-2 px-4 border border-black">{iby}</th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              <tr>
                <td className="py-2 px-4 border border-black">
                  {data.chngpassword}
                </td>
                <td className="py-2 px-4 border border-black">
                  {data.usergrp}
                </td>

                <td className="py-2 px-4 border border-black">
                  {data.createdby}{" "}
                </td>

                <td className="py-2 px-4 border border-black">
                  {ibynameperson}
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
                  Status : <strong>{data.password}</strong>
                </td>

                <td className="py-2 px-4 border border-black">
                  Status : <strong>{data.password}</strong>
                </td>
                {/* <td className="py-2 px-4 border border-black">Working</td> */}
              </tr>

              <tr>
                <td className="py-2 px-4 border border-black">
                  Comment: <strong></strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Comment: <strong></strong>
                </td>
                <td className="py-2 px-4 border border-black">
                  Comment:<strong></strong>
                </td>

                <td className="py-2 px-4 border border-black">
                  Comment: <strong></strong>
                </td>
                {/* <td className="py-2 px-4 border border-black">Working</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DomainAdminTable;
