import React, { useEffect, useState } from "react";

const DemoTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const itemsOptions = [5, 10, 50]; // Options for items per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <div className="">
        {/* Set a max height for scrolling */}
        <table className="w-full text-left table-auto min-w-max h-72">
          <thead className="sticky top-0 bg-slate-50">
            <tr>
              {["Name", "Username", "Email", "Phone", "Website"].map(
                (header) => (
                  <th key={header} className="border-b border-slate-200">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="even:bg-slate-300 hover:bg-slate-50 border-b border-slate-200"
              >
                <td className="p-4 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    {user.name}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{user.username}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{user.email}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{user.phone}</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">{user.website}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
              currentPage === 1 ? "text-gray-400" : "text-slate-500"
            } bg-white border border-slate-200 rounded hover:bg-slate-50 transition duration-200 ease`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
                currentPage === index + 1
                  ? "text-white bg-slate-800"
                  : "text-slate-500 bg-white border border-slate-200"
              } rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
              currentPage === totalPages ? "text-gray-400" : "text-slate-500"
            } bg-white border border-slate-200 rounded hover:bg-slate-50 transition duration-200 ease`}
          >
            Next
          </button>
        </div>
        <div className="flex justify-between items-center px-4 py-3">
          <div>
            <label htmlFor="itemsPerPage" className="mr-2 text-sm">
              Rows per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded p-1"
            >
              {itemsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-slate-500">
            Showing{" "}
            <b>
              {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, users.length)}
            </b>{" "}
            of {users.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTable;

// import React from "react";

// const DemoTable = () => {
//   return (
//     <div className="bg-white p-5 shadow-[0_0_10px_black] h-72">
//       <table>
//         <thead>
//           <tr>
//             <th className="border border-slate-600 p-2">ID</th>
//             <th className="border border-slate-600 p-2">Name</th>
//             <th className="border border-slate-600 p-2">PF</th>
//             <th className="border border-slate-600 p-2">Phone</th>
//           </tr>
//         </thead>

//         <tbody className="overflow-auto">
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td>Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//           <tr>
//             <td className="border border-slate-600 p-2">01</td>
//             <td className="border border-slate-600 p-2">Zia</td>
//             <td className="border border-slate-600 p-2">06886</td>
//             <td className="border border-slate-600 p-2">0145645656</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DemoTable;
