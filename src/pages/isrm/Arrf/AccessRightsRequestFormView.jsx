import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../../../assets/logo.png";

import AccountType from "./AccountType";
import ApprovedTable from "./ApprovedTable";
import UserInfo from "./UserInfo";

import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminApproval from "../../../pages/AdminDashboard/AdminApproval";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const AccessRightsRequestFormView = () => {
  const [data, setData] = useState(null);
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
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [fieldsDisabled, setFieldsDisabled] = useState(true);

  const [checkedOptions, setCheckedOptions] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  let { userId, formId, id } = useParams();
  useEffect(() => {
    userId, formId, id;
  }, [userid]);

  // Fetch Employee data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/user/emplist/${userid}`);
        const data = await response.json();
        setEmpList(data);
        setFilteredOptions(data);
        // (filteredOptions.username);
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

        response.data;

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

  useEffect(() => {
    setActype(formData.actype);
    setFromDate(formData.tempdatefrom);
    setToDate(formData.tempdateto);
    setFromTime(formData.temptimefrom);
    setToTime(formData.temptimeto);

    if (formData.acpurpose) {
      setAcpurpose(formData.acpurpose);
    }
    setSearchTerm(`${formData.unitheadusername} - ${formData.unitheaduserid}`);
    setInfosystem(formData.infosystem);
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

  const handlePrint = () => {
    window.print(); // This will trigger the browser's print dialog
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
      <section>
        <div className="bg-white rounded-lg my-5 shadow-[0_5px_10px_0px_gray]">
          <div className="">
            {/* <h3 className="text-center font-bold text-xl pt-5 mt-3 mb-3">
              Access Rights Request Form
            </h3> */}
            <div className=" mx-10 w-[716px] ">
              <div className="pt-5">
                <div className="flex">
                  <img
                    src={Logo}
                    alt=""
                    className="w-[100px] p-1 border border-custom-color"
                  />

                  <div className="text-center font-bold w-[450px]">
                    <h3 className="border border-custom-color pt-[12px] h-[52px] pl-[4px] pr-[4px]">
                      FIRST SECURITY ISLAMI BANK PLC
                    </h3>
                    <h3 className="border border-custom-color">ICT Division</h3>
                    <h3 className="border border-custom-color  p-1">
                      Access Rights Request Form
                    </h3>
                  </div>

                  <div>
                    <div className="w-[164px]">
                      <p className="border border-custom-color p-1 text-xs">
                        Document No.: <strong>1001</strong>
                      </p>
                      <h4 className="border border-custom-color p-1 text-xs">
                        Version No.: <strong>03</strong>
                      </h4>

                      <h4 className="border border-custom-color p-1 text-xs">
                        Effective Date: <strong>08.10.2023</strong>
                      </h4>

                      <h4 className="border border-custom-color pt-[8px] p-1 text-xs h-[34px]">
                        Page <strong>1</strong> of <strong>1</strong>
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-2 mx-2">
                  <div>
                    <p>
                      Reference: FSIB/HO/ICTD/ARRF/{formData.referenceValue}
                    </p>
                  </div>
                  <div className="flex items-end justify-end">
                    <strong className="mr-1"> Date : </strong>{" "}
                    <span>{formData.submitdate}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <UserInfo userid={decryptId(userId)} />

                  <AccountType
                    actype={actype}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    fromTime={fromTime}
                    setFromTime={setFromTime}
                    toTime={toTime}
                    setToTime={setToTime}
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
                                  disabled
                                />
                                <label htmlFor={option.name} className="pl-2">
                                  {option.label}
                                </label>
                                {option.name === "other" && (
                                  <input
                                    type="text"
                                    className="w-full outline outline-1 outline-black focus:outline-1 focus-visible:outline-1 p-1 rounded"
                                    value={otherValue}
                                    onChange={handleOtherInputChange}
                                    disabled
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
                              disabled={fieldsDisabled}
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
                          <div>
                            Status :{" "}
                            <strong
                              className={
                                formData.unitheadstatus === "Accepted"
                                  ? "text-green-600"
                                  : ""
                              }
                            >
                              {formData.unitheadstatus}
                            </strong>
                          </div>
                          <div>
                            Comment : <strong>{formData.unitheadcmnt}</strong>
                          </div>
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
                      disabled={fieldsDisabled}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-4 pb-2">
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-3">
                    To be completed by Admin
                  </h4>
                  <ApprovedTable userid={userid} />
                </div>
              </div>

              <div className="mb-5">
                <AdminApproval
                  status={status}
                  setStatus={setStatus}
                  comment={comment}
                  setComment={setComment}
                />
              </div>
              {/* <PrintComponent /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccessRightsRequestFormView;
