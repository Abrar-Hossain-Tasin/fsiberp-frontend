import { format } from "date-fns";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import DynamicTable3 from "../../../component/DynamicTable3";
import Dynamictable from "../../../component/Dynamictable";
import Dynamictable2 from "../../../component/Dynamictable2";

import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../../../utils/api/Base_api";

const AccessRightsRequestForm = () => {
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

  const navigate = useNavigate();

  const tableClassName = "border px-4 py-2 border-black";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/access/emplist/${userid}`
        );
        const data = await response.json();
        setEmpList(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const handleOtherInputChange = (e) => {
    setOtherValue(e.target.value);
    setAcpurpose([e.target.value]);
  };

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
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
    toDate;
  };

  const handleFromTimeChange = (time) => {
    setFromTime(time);
  };

  const handleToTimeChange = (time) => {
    setToTime(time);
    toTime;
  };

  const handleSubmit = async () => {
    const formattedFromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null;
    const formattedToDate = toDate ? format(toDate, "yyyy-MM-dd") : null;
    const formattedFromTime = fromTime ? format(fromTime, "HH:mm:ss") : null;
    const formattedToTime = toTime ? format(toTime, "HH:mm:ss") : null;

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
        temptimefrom: formattedFromTime,
        temptimeto: formattedToTime,
      };

      const response = await fetch(`${Base_api}/api/access/save/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      response;
      formData;

      if (response.ok) {
        toast.success("Form submitted successfully!", {
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
          navigate("/isrm");
        }, 3000);
      } else {
        console.error("Error submitting form:", await response.json());
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
      setCheckedOptions(
        checked
          ? [...checkedOptions, name]
          : checkedOptions.filter((option) => option !== name)
      );
    }
  };
  return (
    <>
      <ToastContainer />
      <section className="pb-5">
        <div className="bg-white pb-5 rounded-xl shadow-[0_5px_10px_0px_gray]">
          <div>
            {/* <h3 className="text-center font-bold text-xl mt-3 mb-3">
              Access Rights Request Form
            </h3> */}

            <div className="mt-4 mx-10 w-[716px]">
              <AllFormsHeader
                divname="ICT Division"
                formname="Access Rights Request Form"
                dno="1001"
                vno="3.0"
                edate="08.10.2023"
                fpageno="1"
                lpageno="1"
                rdiv="ICT Division"
                rformname="ARRF"
                // headformname="Access Rights Request Form"
              />
            </div>

            <div className="mt-4 mx-10 w-[716px]">
              <div className="">
                <div className="mt-4">
                  <Dynamictable userid={userid} />
                  <div className="mt-4">
                    <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md">
                      To be completed by respective Requestor
                    </h4>
                  </div>
                  <DynamicTable3
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

                  <div className="my-4">
                    <table className="w-full">
                      <tr>
                        <th className={`${tableClassName}`} colSpan={2}>
                          Access to Information System (Choose One)
                        </th>
                      </tr>

                      <tr>
                        <td className={`${tableClassName}`}>
                          <input type="checkbox" id="n_v" />
                          <label htmlFor="n_v" className="ml-1">
                            Network Device
                          </label>
                        </td>

                        <td className={`${tableClassName}`}>
                          <div className="flex justify-center">
                            <textarea
                              id="n_v"
                              name="n_v"
                              rows="1"
                              cols="50"
                              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1  w-3/4  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                              placeholder="Network Device Description"
                            ></textarea>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={`${tableClassName}`}>
                          <input type="checkbox" id="s_v" />
                          <label htmlFor="s_v" className="ml-1">
                            Security Device
                          </label>
                        </td>

                        <td className={`${tableClassName}`}>
                          <div className="flex justify-center">
                            <textarea
                              id="s_v"
                              name="s_v"
                              rows="1"
                              cols="50"
                              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1  w-3/4  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                              placeholder="Security Device Description"
                            ></textarea>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={`${tableClassName}`}>
                          <input type="checkbox" id="server" />
                          <label htmlFor="server" className="ml-1">
                            Server/Storage
                          </label>
                        </td>

                        <td className={`${tableClassName}`}>
                          <div className="flex justify-center">
                            <textarea
                              id="server"
                              name="server"
                              rows="1"
                              cols="50"
                              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1  w-3/4  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                              placeholder="Server/Storage Description"
                            ></textarea>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={`${tableClassName}`}>
                          <input type="checkbox" id="db" />
                          <label htmlFor="db" className="ml-1">
                            Database
                          </label>
                        </td>

                        <td className={`${tableClassName}`}>
                          <div className="flex justify-center">
                            <textarea
                              id="db"
                              name="db"
                              rows="1"
                              cols="50"
                              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1  w-3/4  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                              placeholder="Database Description"
                            ></textarea>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={`${tableClassName}`}>
                          <input type="checkbox" id="software" />
                          <label htmlFor="software" className="ml-1">
                            Software/Application
                          </label>
                        </td>

                        <td className={`${tableClassName}`}>
                          <div className="flex justify-center">
                            <textarea
                              id="software"
                              name="software"
                              rows="1"
                              cols="50"
                              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1  w-3/4  rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                              placeholder="Software/Application Description"
                            ></textarea>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

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
                        <td rowSpan={2} className="border  border-black px-5">
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
                                <label htmlFor={option.name}>
                                  {option.label}
                                </label>
                                {option.name === "other" && (
                                  <input
                                    type="text"
                                    className="w-full outline outline-1 outline-black focus:outline-1 focus-visible:outline-1 p-1 rounded"
                                    placeholder="if selected others"
                                    value={otherValue}
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
                              autoComplete="off"
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
                      rows="1"
                      cols="50"
                      className="mt-2 w-full outline outline-1 outline-black focus:outline-1 focus-visible:outline-1 p-2"
                      placeholder="Please provide,access to Information System [Product and User Level/Category Description (if any)]"
                      onChange={(e) => setInfosystem(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-3">
                    To be completed by Admin
                  </h4>
                  <Dynamictable2 userid={userid} />
                </div>

                <div className="flex justify-center items-center ">
                  <p
                    className="mb-4 mt-2 text-center bg-green-700 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
                    onClick={handleSubmit}
                  >
                    Submit
                  </p>

                  <div>{/* <Print /> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccessRightsRequestForm;
