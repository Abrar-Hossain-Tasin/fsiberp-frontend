import React, { useState } from "react";
import BmsFormsHeader from "../../component/BmsFormsHeader/BmsFormsHeader";
import DebitVoucherSubmitAdmin from "../../component/DebitVoucher/DebitVoucherSubmitAdmin";
import UserLoginDetails from "../../component/LoginUserInfo/UserLoginDetails";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify// Import CSS for Toastify

import { bmsApiEightyOne } from "../../../utils/api/Base_api";
import DebitVoucherAdminAboveFiveHundred from "../../component/DebitVoucher/DebitVoucherAdminAboveFiveHundred";

import TransportForm from "../../component/DebitVoucherType/Transport/TransportForm";

import LabelInput from "../../component/LabelInput/LabelInput";
import LabelTextarea from "../../component/LabelTextarea/LabelTextarea";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const DebitVoucherSubmit = () => {
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
  const [voucherType, setVoucherType] = useState("");
  const [userData, setUserData] = useState(null);

  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [desTo, setDesTo] = useState("");
  const [desFrom, setDesFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [vehicle, setVehicle] = useState("");

  const [travelType, setTravelType] = useState([]);

  const [amountInWords, setAmountInWords] = useState("");

  const [receiver, setReceiver] = useState("");

  const [secondmanusername, setSecondmanUsername] = useState("");
  const [unitheadusername, setUnitHeadUsername] = useState("");

  const [implementedbyusername, setImplementedbyusername] = useState("");

  const [formData, setFormData] = useState({});

  const [document, setDocument] = useState([]);

  const navigate = useNavigate();

  const handleVoucherChange = (event) => {
    setVoucherType(event.target.value);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    setDocument(files); // Set documents to the array of files
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    // Convert to words and append "Taka Only"
    const words = numberToWords(Number(value));
    setAmountInWords(
      words.charAt(0).toUpperCase() + words.slice(1) + " Taka Only"
    ); // Capitalize the first letter
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (document.length > 0) {
      document.forEach((file) => {
        formData.append("document", file); // Append each document
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

    const requestBody = {
      userid,
      voucherType,
      purpose,
      amount,
      date,
      desTo,
      desFrom,
      dateTo,
      dateFrom,
      vehicle,
      travelType,
      receiver,

      secondmanusername,
      unitheadusername,
      implementedbyusername,

      secondmanuserid: userData.secmanid,
      unitheaduserid: userData.unitheadid,
      implementedbyuserid: userData.implbyid,
    };

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
      voucherType === "Night" ||
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

    // Similar logic for other voucher types (Transport, etc.)

    try {
      const response = await fetch(
        `${bmsApiEightyOne}/api/debit/save/${userid}`,
        {
          method: "POST",
          // body: JSON.stringify(requestBody),
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      "Success:", data;

      toast.success("Form submitted successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/bms-user-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.", {
        autoClose: 2000,
      });
    }
  };
  const [branchname, setBranchname] = useState("");

  return (
    <form onSubmit={handleSubmit} className="m-auto">
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
            branchname={branchname}
          />
          <div className="mt-3">
            {<UserLoginDetails userid={userid} setBranchname={setBranchname} />}
          </div>

          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            To be completed by Respective Requestor
          </h4>

          <div className="relative inline-block w-full mb-5">
            <select
              name="voucher_type"
              id="voucher_type"
              onChange={handleVoucherChange}
              className="block appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
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
            voucherType === "Night Duty" ||
            voucherType === "Off Day Duty" ||
            voucherType === "Shifting Duty" ||
            voucherType === "Sunray Express" ||
            voucherType === "Office Maintenance" ||
            voucherType === "Convence" ||
            voucherType === "Holiday Night Duty" ||
            voucherType === "Computer Accessories" ||
            voucherType === "Evening Banking Allowance") && (
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
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amountInWords"
                    labeltext="Amount in Word"
                    type="text"
                    id="amountInWords"
                    placeholder="Enter amount in words..."
                    value={amountInWords}
                    readOnly
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
                    placeholder="Enter Date"
                    onChange={(e) => setDateTo(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext="Receiver Name"
                    type="text"
                    id="receiver"
                    placeholder="Enter Receiver Name"
                    onChange={(e) => setReceiver(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <label
                    htmlFor=""
                    className="font-semibold text-gray-700 mb-1"
                  >
                    File (Multiple)
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
            </div>
          )}

          {voucherType === "Transport" && (
            <TransportForm
              setDesFrom={setDesFrom}
              setDesTo={setDesTo}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
              setVehicle={setVehicle}
              setReceiver={setReceiver}
              handleAmountChange={handleAmountChange}
              setPurpose={setPurpose}
              amountInWords={amountInWords}
              travelType={travelType}
              handleFileChange={handleFileChange}
              handleTravelTypeChange={handleTravelTypeChange}
            />
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
                    onChange={(e) => setReceiver(e.target.value)}
                    required
                  />
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
            <DebitVoucherSubmitAdmin
              userID={userid}
              onUserDataFetched={handleUserDataFetched}
            />
          )}

          <div className="flex justify-center mt-5 mb-5">
            <input
              type="submit"
              value="Submit"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DebitVoucherSubmit;
