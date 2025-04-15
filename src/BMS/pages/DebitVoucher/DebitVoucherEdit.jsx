import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BmsFormsHeader from "../../component/BmsFormsHeader/BmsFormsHeader";
import UserLoginDetails from "../../component/LoginUserInfo/UserLoginDetails";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify// Import CSS for Toastify

import { bmsApiEightyOne } from "../../../utils/api/Base_api";
import { decryptId } from "../Encrypted/Encrypted.jsx";

import DebitVoucherAdminAboveFiveHundred from "../../component/DebitVoucher/DebitVoucherAdminAboveFiveHundred";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelInput from "../../component/LabelInput/LabelInput";
import LabelTextarea from "../../component/LabelTextarea/LabelTextarea";

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import DebitVoucherViewAdmin from "../../component/DebitVoucher/DebitVoucherViewAdmin/DebitVoucherViewAdmin";

const DebitVoucherEdit = () => {
  const convertAmountToWords = (amount) => {
    const words = numberToWords(Number(amount)) + " taka";
    const formattedWords = `${words.charAt(0).toUpperCase() + words.slice(1)}`;
    return formattedWords;
  };

  const numberToWords = (num) => {
    const a = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const b = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const c = ["", "hundred", "thousand", "lakh", "crore"];

    if (num === 0) return "zero";
    let words = "";

    if (num >= 10000000) {
      words += numberToWords(Math.floor(num / 10000000)) + " crore ";
      num %= 10000000;
    }
    if (num >= 100000) {
      words += numberToWords(Math.floor(num / 100000)) + " lakh ";
      num %= 100000;
    }
    if (num >= 1000) {
      words += numberToWords(Math.floor(num / 1000)) + " thousand ";
      num %= 1000;
    }
    if (num >= 100) {
      words += numberToWords(Math.floor(num / 100)) + " hundred ";
      num %= 100;
    }
    if (num > 19) {
      words += b[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      words += a[num] + " ";
    }

    return words.trim();
  };
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const { userId, formId, id } = useParams();

  const [files, setFiles] = useState([]);

  const [voucherType, setVoucherType] = useState("");

  const [formData, setFormData] = useState({});

  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [desTo, setDesTo] = useState("");
  const [desFrom, setDesFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [branchname, setBranchname] = useState("");

  const [travelType, setTravelType] = useState([]);

  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitHeadUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [secondmanuserid, setSecondManUserid] = useState(null);

  const [secondmanusername, setSecondmanUsername] = useState("");

  const [searchTermTwo, setSearchTermTwo] = useState("");

  const [amountInWords, setAmountInWords] = useState("");

  const [receiver, setReceiver] = useState("");

  const [userData, setUserData] = useState(null);

  const [document, setDocument] = useState([]);

  const [implementedbyusername, setImplementedbyusername] = useState("");

  const navigate = useNavigate();

  const handleVoucherChange = (event) => {
    setVoucherType(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    setDocument(files); // Set documents to the array of files
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Update amount state
    setAmount(value);

    // Convert to words only if the value is a valid number
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      // Convert to words and capitalize the first letter
      const words = convertAmountToWords(numericValue);
      setAmountInWords(words + " only");
    } else {
      // Reset amountInWords if the input is not a valid number
      setAmountInWords("");
    }
  };

  const handleTravelTypeChange = (event) => {
    const { name, checked } = event.target;
    setTravelType((prev) => {
      if (checked) {
        return [...prev, name]; // Add selected travel type
      } else {
        return prev.filter((type) => type !== name); // Remove unselected travel type
      }
    });
  };

  const handleUserDataFetched = (data) => {
    setUserData(data);

    if (data) {
      setSecondmanUsername(data.secman);
      setUnitHeadUsername(data.unithead);

      // setFadHeadUsername(data.fadheadUsername);

      // setFadSecondManUsername(data.fadsecmanname);

      // setAmdUsername(data.amdusername);
      // setDmdUsername(data.dmdusername);
      setImplementedbyusername(data.implby);
    } else {
      // Reset the usernames if no user data is found
      // setSecondmanUsername("");
      setUnitHeadUsername("");
      // setFadHeadUsername("");
      // setFadSecondManUsername("");
      // setAmdUsername("");
      // setDmdUsername("");
      setImplementedbyusername("");
    }
  };

  // const removeFile = async (fileIndex) => {
  //   setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
  //   try {
  //     const response = await fetch(
  //       `${bmsApiEightyOne}/api/debit/removefile/${decryptId(id)}/${fileIndex}`,
  //       {
  //         method: "DELETE", // Use PUT for updates
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const removeFile = async (fileName, index) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
    try {
      const response = await fetch(
        `${bmsApiEightyOne}/api/debit/removefile/${decryptId(id)}/${index}`,
        {
          method: "DELETE", // Use PUT for updates
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${bmsApiEightyOne}/api/bms_dashboard/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);

        if (data.voucherType) {
          setVoucherType(data.voucherType); // Set the voucherType from the fetched data
        }

        setPurpose(data.purpose);

        const fetchedAmount = data.amount; // Assuming this is a number
        setAmount(fetchedAmount);
        setAmountInWords(convertAmountToWords(fetchedAmount));

        // setAmount(data.amount);

        setDateTo(data.dateTo);
        setDateFrom(data.dateFrom);
        setVehicle(data.vehicle);

        setReceiver(data.receiver);

        setDesTo(data.desTo);
        setDesFrom(data.desFrom);
        setTravelType(data.travelType);

        // Populate form fields with existing data
        setUnitheaduserid(data.unitheaduserid);
        setUnitHeadUsername(data.unitheadusername);
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);

        setSecondManUserid(data.secondmanuserid);
        setSecondmanUsername(data.secondmanusername);
        setSearchTermTwo(`${data.secondmanusername} - ${data.secondmanuserid}`);

        const documentPaths = data.documentPaths;
        // setDocuments(data.documentDownloadUrl);

        const a = documentPaths.map((item) => item.split("~"));
        const b = a.map((item) => item[item.length - 1]);
        setFiles(b);

        // Ensure dooraccess is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (document.length > 0) {
      document.forEach((file) => {
        formData.append("documents", file); // Append each document
      });
    }

    formData.append("desTo", desTo);
    formData.append("desFrom", desFrom);
    if (dateTo) {
      formData.append("dateTo", dateTo);
    }
    if (dateFrom) {
      formData.append("dateFrom", dateFrom);
    }
    formData.append("vehicle", vehicle);
    formData.append("travelType", travelType);
    formData.append("voucherType", voucherType);
    formData.append("amount", amount);
    formData.append("purpose", purpose);
    formData.append("receiver", receiver);
    formData.append("secondmanusername", secondmanusername);
    formData.append("unitheadusername", unitheadusername);
    formData.append("implementedbyusername", implementedbyusername);

    formData.append("secondmanuserid", userData.secmanid);
    formData.append("unitheaduserid", userData.unitheadid);
    formData.append("implementedbyuserid", userData.implbyid);

    if (
      !userData ||
      userData.unithead === "No User Found" ||
      userData.secman === "No User Found"
    ) {
      toast.error(
        "User data is invalid. Please check with the Software Team, ICT Division.",
        {
          autoClose: 2000,
        }
      );
      return; // Prevent submission
    }

    if (
      voucherType === "Refreshment" ||
      voucherType === "NewsPaper" ||
      voucherType === "Sunray Express"
    ) {
      if (amount > 500) {
        // If amount > 500, only add amduserid and dmduserid
        formData.append("amduserid", userData.amdid);
        formData.append("dmduserid", userData.dmdid);
        formData.append("amdusername", userData.amd);
        formData.append("dmdusername", userData.dmd);
        formData.append("dmdstatus", userData.dmdstatus);
        formData.append("amdstatus", userData.amdstatus);
      } else {
        // If amount <= 500, add fadheaduserid and fadsecondmanuserid
        formData.append("fadheaduserid", userData.fadheadid);
        formData.append("fadsecondmanuserid", userData.fadmanid);
        formData.append("fadheadusername", userData.fadheadUsername);
        formData.append("fadsecondmanusername", userData.fadsecmanname);
        formData.append("fadheadstatus", userData.fadheadstatus);
        formData.append("fadsecondmanstatus", userData.fadsecondmanstatus);
      }
    }

    if (
      voucherType === "Transport" ||
      voucherType === "Night Duty" ||
      voucherType === "Office Maintenance" ||
      voucherType === "Convence" ||
      voucherType === "Holiday Night Duty" ||
      voucherType === "Computer Accessories" ||
      voucherType === "Shifting Duty" ||
      voucherType === "Off Day Duty" ||
      voucherType === "Evening Banking Allowance"
    ) {
      if (amount > 1000) {
        // If amount > 1000, add amduserid and dmduserid
        formData.append("amduserid", userData.amdid);
        formData.append("dmduserid", userData.dmdid);
        formData.append("amdusername", userData.amd);
        formData.append("dmdusername", userData.dmd);
        formData.append("dmdstatus", userData.dmdstatus);
        formData.append("amdstatus", userData.amdstatus);
      } else {
        // If amount <= 1000, add fadheaduserid and fadsecondmanuserid
        formData.append("fadheaduserid", userData.fadheadid);
        formData.append("fadsecondmanuserid", userData.fadmanid);
        formData.append("fadheadusername", userData.fadheadUsername);
        formData.append("fadsecondmanusername", userData.fadsecmanname);
        formData.append("fadheadstatus", userData.fadheadstatus);
        formData.append("fadsecondmanstatus", userData.fadsecondmanstatus);
      }
    }

    try {
      const decryptedId = decryptId(id);
      const response = await fetch(
        `${bmsApiEightyOne}/api/debit/update/${decryptedId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response as JSON

        // Display the error message from the backend
        if (errorData.error) {
          toast.error(errorData.error, {
            autoClose: 2000,
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        // This block executes only if response.ok is true
        const data = await response.json();
        console.log("Success:", data);

        // Show success message
        toast.success("Form updated successfully!", { autoClose: 2000 });

        // Redirect after a delay
        setTimeout(() => {
          navigate("/bms-user-dashboard");
        }, 2000);
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      toast.error("Error updating form. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleUpdate} className="m-auto">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 w-[900px]">
        <div className="mx-7 flex flex-col">
          <BmsFormsHeader
            bankname="First Security Islami Bank PLC"
            documentno="3001"
            versionno="3.0"
            effecteddate="08.10.2023"
            lastpage="1"
            formname="Debit-Voucher-Form"
            submitdate={formData.submitDate}
            referenceValue={formData.referenceValue}
            branchname={branchname}
          />
          <div className="mt-3">
            {
              <UserLoginDetails
                userid={decryptId(userId)}
                setBranchname={setBranchname}
              />
            }
          </div>

          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            To be completed by Respective Requestor
          </h4>

          <div className="relative inline-block w-full mb-5">
            <select
              name="voucher_type"
              id="voucher_type"
              value={voucherType}
              onChange={handleVoucherChange}
              className="block appearance-none w-full bg-white border border-black rounded-md shadow-sm py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            >
              <option value="" disabled selected className="text-gray-400">
                Choose Voucher Type
              </option>
              <option value="Transport">Transport</option>
              <option value="Refreshment">Refreshment</option>
              <option value="Night Duty">Night Duty</option>
              <option value="Off Day Duty">Off Day Duty</option>
              <option value="Shifting Duty">Shifting Duty</option>
              <option value="NewsPaper">NewsPaper</option>
              <option value="Sunray Express">Sunray Express</option>
              <option value="Office Maintenance">Office Maintenance</option>
              <option value="Convence">Convence</option>
              <option value="Holiday Night Duty">Holiday Night Duty</option>
              <option value="Computer Accessories">Computer Accessories</option>
              <option value="Evening Banking Allowance">
                Evening Banking Allowance
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.44l3.71-3.23a.75.75 0 0 1 1.06 1.06l-4.25 3.5a.75.75 0 0 1-1.06 0l-4.25-3.5a.75.75 0 0 1 0-1.06z" />
              </svg>
            </div>
          </div>

          {(voucherType === "Refreshment" ||
            voucherType === "Sunray Express" ||
            voucherType === "Office Maintenance" ||
            voucherType === "Convence" ||
            voucherType === "Holiday Night Duty" ||
            voucherType === "Computer Accessories" ||
            voucherType === "Evening Banking Allowance" ||
            voucherType === "Shifting Duty" ||
            voucherType === "Off Day Duty" ||
            voucherType === "Night Duty") && (
            <div className="mt-3">
              <div className="flex flex-col mb-4">
                <LabelTextarea
                  htmlFor="details"
                  labeltext="Purpose"
                  name="Purpose"
                  id="Purpose"
                  rows="4"
                  value={purpose}
                  placeholder="Enter Purpose here..."
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount"
                    type="text"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount in Words"
                    type="text"
                    id="amount"
                    placeholder="Enter amount in words..."
                    value={amountInWords}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="Date"
                    labeltext="Date"
                    type="date"
                    id="Date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext=" Receiver Name"
                    type="text"
                    id="receiver"
                    onChange={(e) => setReceiver(e.target.value)}
                    value={receiver}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-gray-700 mb-1"
                  >
                    File (Multiple){" "}
                    <span className="text-slate-500 text-xs">
                      {" "}
                      (File size must be under 250KB)
                    </span>
                  </label>
                  <input
                    type="file"
                    className="border border-black rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600"
                    onChange={handleFileChange}
                    autoComplete="off"
                    multiple
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  {files.length > 0 && (
                    <ul className="flex justify-center p-2 flex-wrap gap-2 font-[500] text-sm">
                      {files.map((fileName, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                        >
                          <label className="text-xs">{fileName}</label>

                          <FontAwesomeIcon
                            onClick={() => removeFile(fileName, index)}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {(voucherType === "Night" ||
            voucherType === "Off Day" ||
            voucherType === "Shifting") && (
            <div className="mt-3">
              <div className="flex flex-col mb-4">
                <LabelTextarea
                  htmlFor="details"
                  labeltext="Purpose"
                  name="Purpose"
                  id="Purpose"
                  rows="4"
                  value={purpose}
                  placeholder="Enter Purpose here..."
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount"
                    type="text"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="Date"
                    labeltext="Date"
                    type="date"
                    id="Date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount in Words"
                    type="text"
                    id="amount"
                    placeholder="Enter amount in words..."
                    value={amountInWords}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext=" Receiver Name"
                    type="text"
                    id="receiver"
                    onChange={(e) => setReceiver(e.target.value)}
                    value={receiver}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-gray-700 mb-1"
                  >
                    File (Multiple){" "}
                    <span className="text-slate-500 text-xs">
                      {" "}
                      (File size must be under 250KB)
                    </span>
                  </label>
                  <input
                    type="file"
                    className="border border-black rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600"
                    onChange={handleFileChange}
                    autoComplete="off"
                    multiple
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  {files.length > 0 && (
                    <ul className="flex justify-center p-2 flex-wrap gap-2 font-[500] text-sm">
                      {files.map((fileName, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                        >
                          <label className="text-xs">{fileName}</label>

                          <FontAwesomeIcon
                            onClick={() => removeFile(fileName, index)}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {voucherType === "Transport" && (
            <div className="mt-3">
              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={desFrom}
                    labeltext="Origin"
                    htmlFor="desfrom"
                    type="text"
                    id="desfrom"
                    onChange={(e) => setDesFrom(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelInput
                    value={desTo}
                    labeltext="Destination"
                    htmlFor="desfrom"
                    type="text"
                    id="desto"
                    onChange={(e) => setDesTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={dateTo}
                    labeltext="From Date"
                    htmlFor="date"
                    type="date"
                    id="date"
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={dateFrom}
                    labeltext="To Date"
                    htmlFor="date"
                    type="date"
                    id="date"
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelInput
                    value={vehicle}
                    labeltext="Vehicle"
                    htmlFor="date"
                    type="text"
                    id="Vehicle"
                    onChange={(e) => setVehicle(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={amount}
                    labeltext="Amount"
                    htmlFor="amount"
                    type="text"
                    id="amount"
                    onChange={handleAmountChange}
                    // onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelTextarea
                    rows="1"
                    id="purpose"
                    htmlFor="purpose"
                    value={purpose}
                    labeltext="Purpose"
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount in Words"
                    type="text"
                    id="amount"
                    placeholder="Enter amount in words..."
                    readOnly
                    value={amountInWords}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext="Receiver Name"
                    type="text"
                    id="receiver"
                    placeholder="Enter Receiver Name"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-[275px]">
                  <label
                    htmlFor=""
                    className="font-semibold text-gray-700 mb-1"
                  >
                    File{" "}
                    <span className="text-slate-500 text-xs">
                      {" "}
                      (File size must be under 250KB)
                    </span>
                  </label>
                  <input
                    type="file"
                    id={id}
                    className="border border-black rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600"
                    onChange={handleFileChange}
                    autoComplete="off"
                    multiple
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  {files.length > 0 && (
                    <ul className="flex justify-center p-2 flex-wrap gap-2 font-[500] text-sm">
                      {files.map((fileName, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                        >
                          <label className="text-xs">{fileName}</label>

                          <FontAwesomeIcon
                            onClick={() => removeFile(fileName, index)}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="my-4">
                <table className="w-full">
                  <tr>
                    <th className="border border-gray-300 py-2">Travel Type</th>

                    <th className="border border-gray-300 py-2">
                      <input
                        type="checkbox"
                        id="up"
                        name="Up"
                        value="travel_type"
                        className="mr-1"
                        checked={travelType.includes("Up")}
                        onChange={handleTravelTypeChange}
                      />
                      <label htmlFor="up" className="text-gray-700">
                        {" "}
                        Up{" "}
                      </label>
                    </th>

                    <th className="border border-gray-300 py-2">
                      <input
                        type="checkbox"
                        id="down"
                        name="Down"
                        value="travel_type"
                        className="mr-1"
                        checked={travelType.includes("Down")}
                        onChange={handleTravelTypeChange}
                      />
                      <label htmlFor="down" className="text-gray-700">
                        {" "}
                        Down{" "}
                      </label>
                    </th>
                  </tr>
                </table>
              </div>
            </div>
          )}

          {voucherType === "NewsPaper" && (
            <div className="mt-3">
              <div className="flex flex-col mb-4">
                <LabelTextarea
                  htmlFor="details"
                  labeltext="Purpose"
                  name="Purpose"
                  id="Purpose"
                  rows="4"
                  placeholder="Enter Purpose here..."
                  onChange={(e) => setPurpose(e.target.value)}
                  value={purpose}
                />
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount"
                    type="text"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={handleAmountChange}
                    value={amount}
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="date"
                    labeltext="From Date"
                    type="date"
                    id="date"
                    placeholder="Enter date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="date"
                    labeltext="To Date"
                    type="date"
                    id="date"
                    placeholder="Enter date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amountInWords"
                    labeltext="Amount in Words"
                    type="text"
                    id="amountInWords"
                    placeholder="Enter amount in words..."
                    value={amountInWords}
                    readOnly
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext="Receiver Name"
                    type="text"
                    id="receiver"
                    placeholder="Enter Receiver Name"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-gray-700 mb-1"
                  >
                    File (Multiple){" "}
                    <span className="text-slate-500 text-xs">
                      {" "}
                      (File size must be under 250KB)
                    </span>
                  </label>
                  <input
                    type="file"
                    className="border border-gray-300 rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600"
                    onChange={handleFileChange}
                    autoComplete="off"
                    multiple
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-gray-300">
                  <h1 className="text-center border-b border-gray-300 shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  {files.length > 0 && (
                    <ul className="flex justify-center p-2 flex-wrap gap-2 font-[500] text-sm">
                      {files.map((fileName, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                        >
                          <label className="text-xs">{fileName}</label>

                          <FontAwesomeIcon
                            onClick={() => removeFile(fileName, index)}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {(voucherType === "Transport" && amount > 1000) ||
          ((voucherType === "Refreshment" ||
            voucherType === "NewsPaper" ||
            voucherType === "Sunray Express") &&
            amount > 500) ||
          (voucherType === "Office Maintenance" && amount > 1000) || // Updated condition for Office Maintenance
          (voucherType === "Convence" && amount > 1000) ||
          (voucherType === "Holiday Night Duty" && amount > 1000) ||
          (voucherType === "Evening Banking Allowance" && amount > 1000) ||
          (voucherType === "Computer Accessories" && amount > 1000) ||
          (voucherType === "Off Day Duty" && amount > 1000) ||
          (voucherType === "Shifting Duty" && amount > 1000) ||
          (voucherType === "Night Duty" && amount > 1000) ? (
            <DebitVoucherAdminAboveFiveHundred
              userID={userid}
              onUserDataFetched={handleUserDataFetched}
            />
          ) : (
            <DebitVoucherViewAdmin
              userID={userid}
              onUserDataFetched={handleUserDataFetched}
            />
          )}

          <div className="flex justify-center mt-5 mb-5">
            <input
              type="submit"
              value="Update"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DebitVoucherEdit;
