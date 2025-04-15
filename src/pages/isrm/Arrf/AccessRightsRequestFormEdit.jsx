import { format } from "date-fns";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

// import CurrentDate from "../../component/Date";
import ApprovedTable from "./ApprovedTable";
import UserInfo from "./UserInfo";

import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import AccountTypeEdit from "./AccountTypeEdit";
import FormHeader from "./FormHeader";
const AccessRightsRequestFormEdit = () => {
  const [formData, setFormData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [actype, setActype] = useState("");
  const [acpurpose, setAcpurpose] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [infosystem, setInfosystem] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  let { userId, formId, id } = useParams();
  const currentDate = Date();

  const navigate = useNavigate();
  // Fetch Employee data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${Base_api}/api/user/emplist/${userid}`);
  //       const data = await response.json();
  //       setEmpList(data);
  //       setFilteredOptions(data);
  //       // (filteredOptions.username);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [userid]);
  // // Fetch Form data
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${Base_api}/api/user/viewform/${userId}/${formId}/${id}`
  //       );
  //       const formData2 = await response.json();
  //       setFormData(formData2);
  //       // setFilteredOptions(formData2);
  //       (formData2);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getData();
  // }, [userid]);
  // Fetch Employee data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/access/emplist/${userid}`
        );
        const data = await response.json();
        setEmpList(data);
        setFilteredOptions(data);
        // (filteredOptions.username);
        ({ data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  // Fetch Form data
  useEffect(() => {
    const getData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId;
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        // setFilteredOptions(formData2);
        formData;
        if (data.acpurpose[0] === "other") {
          setOtherValue(data.acpurpose[data.acpurpose.length - 1]);
        }
        // Ensure acpurpose is an array
        if (data.acpurpose) {
          setCheckedOptions(data.acpurpose);
        }
        formData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [userid]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    const filtered = empList.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };

  const handleOptionClick = (username, userid) => {
    setSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    setUnitheaduserid(userid);
    setUnitheadusername(username);
  };

  const handleOtherCheckboxChange = (e) => {
    setIsOtherChecked(e.target.checked);
  };

  // const handleOtherInputChange = (e) => {
  //   setOtherValue(e.target.value);
  //   setAcpurpose([e.target.value]);
  // };

  const handleacpurposeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAcpurpose([...acpurpose, value]);
    } else {
      setAcpurpose(acpurpose.filter((purpose) => purpose !== value));
    }
  };
  const handleactypeChange = (event) => {
    setActype(event.target.value);

    if (actype === "permanent") {
      setFromDate(null);
      setToDate(null);
      setFromTime(null);
      setToTime(null);
    }
  };

  useEffect(() => {
    setActype(formData.actype);
    if (actype === "permanent") {
      setFromDate(null);
      setToDate(null);
      setFromTime(null);
      setToTime(null);
    } else {
      setFromDate(formData.tempdatefrom);
      setToDate(formData.tempdateto);
      setFromTime(formData.temptimefrom);
      setToTime(formData.temptimeto);
    }

    if (formData.acpurpose) {
      setAcpurpose(formData.acpurpose);
    }
    setSearchTerm(`${formData.unitheadusername} - ${formData.unitheaduserid}`);
    setInfosystem(formData.infosystem);
    setUnitheaduserid(formData.unitheaduserid);
    setUnitheadusername(formData.unitheadusername);
  }, [formData]);

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleFromTimeChange = (time) => {
    setFromTime(time);
  };

  const handleToTimeChange = (time) => {
    setToTime(time);
  };
  const handleUpdate = async () => {
    otherValue;
    const formattedFromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null;
    const formattedToDate = toDate ? format(toDate, "yyyy-MM-dd") : null;

    // Initialize acpurpose array
    const purposes = [...checkedOptions];

    // If "other" is checked, add the otherValue to the purposes array
    if (checkedOptions.includes("other") && otherValue) {
      purposes.push(otherValue);
    }

    // Remove duplicates if necessary
    const uniquePurposes = [...new Set(purposes)];

    try {
      const formData = {
        actype,
        acpurpose: uniquePurposes, // Use the updated array here
        unitheaduserid,
        unitheadusername,
        infosystem,
        tempdatefrom: formattedFromDate,
        tempdateto: formattedToDate,
        temptimefrom: fromTime,
        temptimeto: toTime,
      };
      formData;
      const response = await fetch(
        `${Base_api}/api/access/update/${decryptId(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      response;

      if (response.ok) {
        toast.success("Form Updated successfully!", {
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
  const options = [
    { name: "monitoring", label: "Monitoring" },
    { name: "administration", label: "Administration" },
    { name: "read", label: "Read" },
    { name: "write", label: "Write" },
    { name: "execute", label: "Execute" },
    { name: "other", label: "Other" },
  ];

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;

    if (name === "other") {
      setCheckedOptions(checked ? ["other"] : []);
    } else {
      setCheckedOptions((prev) => {
        // Ensure prev is an array
        const currentOptions = Array.isArray(prev) ? prev : [];
        if (checked) {
          return [...currentOptions, name];
        } else {
          return currentOptions.filter((option) => option !== name);
        }
      });
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <section className="mb-5">
        <div className="bg-white  rounded-lg shadow-[0_5px_10px_0px_gray]">
          <div>
            {/* <h3 className="text-center font-bold text-xl pt-5 mt-3 mb-3">
              Access Rights Request Form
            </h3> */}

            <div className="mt-4 mx-10 w-[716px] pt-5">
              <div className="">
                <FormHeader />

                <div className="flex justify-between mt-2 mx-2">
                  <div>
                    <p>Reference: FSIB/HO/ICTD/ARRF</p>
                  </div>
                  <div className="flex items-end justify-end gap-2">
                    <label className="font-bold">Date: </label>
                    {new Date(currentDate).toLocaleDateString("en-GB")}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md">
                    To be completed by respective Requestor
                  </h4>

                  <UserInfo userid={userid} />
                  <AccountTypeEdit
                    actype={actype}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    fromTime={fromTime}
                    setFromTime={setFromTime}
                    toTime={toTime}
                    setToTime={setToTime}
                    handleactypeChange={handleactypeChange}
                    handleFromDateChange={handleFromDateChange}
                    handleToDateChange={handleToDateChange}
                    handleFromTimeChange={handleFromTimeChange}
                    handleToTimeChange={handleToTimeChange}
                  />

                  <div className="mt-3">
                    <table className="w-full">
                      <tr className="text-sm">
                        <th className="border px-4 py-2 border-black">
                          Account Purpose:
                        </th>
                        <th className="border px-4 py-2 border-black">
                          Approved by (Manager/Department Head/Unit Head)
                        </th>
                      </tr>
                      <tr className="">
                        <td
                          rowSpan="2"
                          className="border px-4 py-2 border-black"
                        >
                          <div>
                            {options.map((option) => (
                              <div key={option.name}>
                                <input
                                  type="checkbox"
                                  id={option.name}
                                  name={option.name}
                                  checked={checkedOptions.includes(option.name)}
                                  onChange={handleCheckboxChange}
                                  disabled={
                                    checkedOptions.includes("other") &&
                                    option.name !== "other"
                                  }
                                />
                                <label htmlFor={option.name} className="pl-2">
                                  {option.label}
                                </label>
                                {option.name === "other" && (
                                  <input
                                    type="text"
                                    className="w-full outline outline-1 outline-black focus:outline-1 focus-visible:outline-1 p-1 rounded"
                                    value={
                                      !checkedOptions.includes("other")
                                        ? ""
                                        : otherValue
                                    }
                                    onChange={handleOtherInputChange}
                                    disabled={!checkedOptions.includes("other")}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="border px-4 py-2 border-black">
                          <div className="relative">
                            <input
                              type="text"
                              id="search-input"
                              name="search"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Search Here!"
                              value={searchTerm}
                              onChange={handleInputChange}
                            />
                            {showOptions && (
                              <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                {filteredOptions.map((item) => (
                                  <li
                                    key={item.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                      handleOptionClick(
                                        item.username,
                                        item.userid
                                      )
                                    }
                                  >
                                    {item.username} - {item.userid}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="border px-4 py-2 border-black">
                          Status : <strong>Pending</strong>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div className="mt-2">
                    <div className="font-bold">
                      <label htmlFor="" className="p-1">
                        Access to Information System [Product and User
                        Level/Category Description (if any)] :
                      </label>
                    </div>
                    <textarea
                      id="w3review"
                      name="w3review"
                      rows="4"
                      cols="50"
                      className="mt-2 w-full outline outline-1 outline-black focus:outline-1 focus-visible:outline-1 p-2"
                      placeholder="Please provide,access to Information System [Product and User Level/Category Description (if any)]"
                      value={infosystem}
                      onChange={(e) => setInfosystem(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-3">
                    To be completed by Admin
                  </h4>
                  <ApprovedTable userid={userid} />
                </div>
                <div className="flex justify-center items-center ">
                  <p
                    className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
                    onClick={handleUpdate}
                  >
                    Update
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccessRightsRequestFormEdit;
