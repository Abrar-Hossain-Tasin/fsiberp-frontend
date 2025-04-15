import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Base_api } from "../../utils/api/Base_api";
import { encryptId } from "./encryption/Encrypted";

const SelectRowTable = () => {
  const [isOpenPending, setIsOpenPending] = useState(true);
  const [pendingForm, setPendingForm] = useState([]);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectRow, setSelectRow] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const navigate = useNavigate();

  // Handle toggling of sections
  const handlePending = () => {
    setIsOpenPending((prev) => !prev);
  };

  // Fetch data
  const fetchData = async (type) => {
    try {
      const response = await fetch(`${Base_api}/api/admin/${type}/${userid}`);
      const data = await response.json();
      if (type === "pending") {
        setPendingForm(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("pending");
  }, [userid]);

  // Pagination Logic
  const paginate = (array, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPagePending(page);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  // Sort Function
  const sortDescending = (array) => {
    return array.sort((a, b) => (a.submittime < b.submittime ? 1 : -1));
  };

  const filteredPendingForm = sortDescending(
    pendingForm.filter(
      (item) =>
        item.userid.includes(searchTerm) || item.branchcode.includes(searchTerm)
    )
  );

  const handleSelectRowChange = (event) => {
    const { value, checked } = event.target;
    const item = filteredPendingForm.find(
      (item) => item.id.toString() === value
    );

    if (checked) {
      setSelectRow((prev) => [...prev, { id: item.id, formId: item.formid }]);
      selectRow;
    } else {
      setSelectRow((prev) => prev.filter((row) => row.id !== item.id));
    }
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allSelected = filteredPendingForm.map((item) => ({
        id: item.id,
        formId: item.formid,
      }));
      setSelectRow(allSelected);
    } else {
      setSelectRow([]);
    }
  };

  const handleSelectedRowSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${Base_api}/api/approval/${userid}/1006/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formUpdates: selectRow,
            status: "Accepted",
            comment: "ok",
          }),
        }
      );
      response;

      if (response.ok) {
        toast.success("Form Submitted successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        console.error("Error submitting form:aa", await response.json());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const handleSelectedRowSubmit = async () => {
  //   try {
  //     const response = await fetch(
  //       `${Base_api}/api/approval/${userid}/1006/1`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: { formUpdates: selectRow, status: "Accepted", comment: "ok" },
  //       }
  //     );
  //     ({
  //       formUpdates: selectRow,
  //       status: "Accepted",
  //       comment: "",
  //     });
  //     const result = await response.json();
  //     ("Submission result:", response);

  //     if (response.ok) {
  //       toast.success("Approved successfully!");
  //     } else {
  //       (response);
  //       toast.error("Approved unsuccessful!");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  return (
    <div>
      <div className="flex gap-5 w-full px-10 py-5">
        <div
          onClick={handlePending}
          className={`p-4 w-full cursor-pointer shadow-[0_5px_10px_0px_gray] ${
            isOpenPending ? "bg-yellow-500" : ""
          } bg-yellow-100 rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
        >
          <DashboardCustomizeOutlinedIcon
            className={`${
              isOpenPending ? "text-white" : "text-yellow-500"
            } w-10 h-10 mr-4`}
          />
          <div>
            <p
              className={`text-lg font-semibold ${
                isOpenPending ? "text-white" : ""
              }`}
            >
              Pending
            </p>
            <p
              className={`text-2xl font-bold ${
                isOpenPending ? "text-white" : ""
              }`}
            >
              {pendingForm.length}
            </p>
          </div>
        </div>
      </div>
      <div>
        {isOpenPending && (
          <div className="relative overflow-hidden sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
            <div className="flex justify-between">
              <div>
                <label htmlFor="search_id" className="mr-2 font-bold">
                  Search:{" "}
                </label>
                <input
                  type="text"
                  id="search_id"
                  placeholder="Search by User ID or Branch Code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4 text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-[300px] rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                />
              </div>
              <button
                onClick={handleSelectedRowSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Approve Selected
              </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-2 py-2 rounded-s-lg">SN</th>
                  <th className="px-2 py-2">PF Id</th>
                  <th className="px-2 py-2">Employee Name</th>
                  <th className="px-2 py-2">Form Name</th>
                  <th className="px-2 py-2">Submission Date & Time</th>
                  <th className="px-2 py-2">Branch Code</th>
                  <th className="px-2 py-2">Action</th>
                  <th className="flex gap-2 justify-center items-center py-2 px-2 rounded-e-lg h-full">
                    <label htmlFor=""> Select All</label>
                    <input
                      type="checkbox"
                      onChange={handleSelectAllChange}
                      checked={
                        selectRow.length === filteredPendingForm.length &&
                        filteredPendingForm.length > 0
                      }
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginate(
                  filteredPendingForm,
                  currentPagePending,
                  itemsPerPage
                ).map((item, index) => (
                  <tr
                    key={item.id} // Use item.id as key for better performance
                    className="odd:bg-white even:bg-gray-100 border-b"
                  >
                    <td className="px-2 py-1">
                      {(currentPagePending - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-2 py-1">
                      <strong>{item.userid}</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>{item.username}</strong>
                    </td>
                    <td className="px-2 py-1">{item.formname}</td>
                    <td className="px-2 py-1">
                      {new Date(item.submittime).toLocaleString()}
                    </td>
                    <td className="px-2 py-1">{item.branchcode}</td>
                    <td className="px-2 py-1 flex gap-1">
                      <button
                        className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                        onClick={() =>
                          navigate(
                            `/view/${encryptId(item.userid)}/${encryptId(
                              item.formid
                            )}/${encryptId(item.id)}`
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-1">
                      <input
                        type="checkbox"
                        id={`selectRow-${item.id}`} // Unique ID for each checkbox
                        value={item.id}
                        checked={selectRow.some((row) => row.id === item.id)} // Check if the id is included
                        onChange={handleSelectRowChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPagePending}
              totalPages={totalPages(filteredPendingForm)}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Pagination Component remains unchanged
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg shadow-md">
      <div className="flex items-center">
        <label className="mr-3 text-gray-700 font-semibold">
          Items per page:
        </label>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 text-white rounded-md ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          Previous
        </button>
        <span className="font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-2 px-4 py-2 text-white rounded-md ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectRowTable;
