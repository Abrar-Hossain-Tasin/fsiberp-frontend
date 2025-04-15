import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BmsFormsHeader from "../../component/BmsFormsHeader/BmsFormsHeader";
import UserLoginDetails from "../../component/LoginUserInfo/UserLoginDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify// Import CSS for Toastify

import { bmsApiEightyOne } from "../../../utils/api/Base_api";
import { decryptId } from "../Encrypted/Encrypted.jsx";

import DebitVoucherViewAdmin from "../../component/DebitVoucher/DebitVoucherViewAdmin/DebitVoucherViewAdmin";
import LabelInput from "../../component/LabelInput/LabelInput";
import LabelTextarea from "../../component/LabelTextarea/LabelTextarea";

import AdminAcceptReject from "../../component/AdminAcceptReject/AdminAcceptReject";
import DebitVoucherDmdAmdAdmin from "../../component/DebitVoucher/DebitVoucherViewAdmin/DebitVoucherDmdAmdAdmin";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import fsib_logo from "../../assets/logo_fsib.png";
import { jwtDecode } from "jwt-decode";

const DebitVoucherView = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const { userId, formId, id } = useParams();

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

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

  const [travelType, setTravelType] = useState([]);

  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [unitheadstatus, setUnitheadstatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [secondmanuserid, setSecondManUserid] = useState(null);

  const [searchTermTwo, setSearchTermTwo] = useState("");

  const [amountInWords, setAmountInWords] = useState("");

  const [receiver, setReceiver] = useState("");

  const [userData, setUserData] = useState(null);

  const [referenceValue, setReferenceValue] = useState("");

  const [submitDate, setSubmitDate] = useState("");

  const [secondmanusername, setSecondManUserName] = useState("");
  const [secondmanstatus, setsecondmanstatus] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [department, setDepartment] = useState("");

  const [implementedbyusername, setImplementedbyusername] = useState("");
  const [implementedbystatus, setImplementedbystatus] = useState("");

  const [fadsecondmanusername, setFadsecondmanusername] = useState("");
  const [fadsecondmanstatus, setFadsecondmanstatus] = useState("");

  const [fadheadusername, setFadheadusername] = useState("");
  const [fadheadstatus, setFadheadstatus] = useState("");

  const [dmdusername, setDmdusername] = useState("");
  const [dmdstatus, setDmdstatus] = useState("");

  const [amdusername, setAmdusername] = useState("");
  const [amdstatus, setAmdstatus] = useState("");

  const [dmdsubdate, setDmdsubdate] = useState("");

  const [amdsubdate, setAmdsubdate] = useState("");
  const [username, setUsername] = useState("");
  const [designation, setDesignation] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [dateofjoining, setDateofjoining] = useState("");

  const [documentDownloadUrl, setDocumentDownloadUrl] = useState([]);

  const [isDisabled, setIsDisabled] = useState(true);

  const [files, setFiles] = useState([]);

  const [documents, setDocuments] = useState([]);

  const numberToWords = (num, isRecursiveCall = false) => {
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

    if (num === 0) return isRecursiveCall ? "" : "Zero taka only";
    let words = "";

    if (num >= 10000000) {
      words += numberToWords(Math.floor(num / 10000000), true) + " crore ";
      num %= 10000000;
    }
    if (num >= 100000) {
      words += numberToWords(Math.floor(num / 100000), true) + " lakh ";
      num %= 100000;
    }
    if (num >= 1000) {
      words += numberToWords(Math.floor(num / 1000), true) + " thousand ";
      num %= 1000;
    }
    if (num >= 100) {
      words += numberToWords(Math.floor(num / 100), true) + " hundred ";
      num %= 100;
    }
    if (num > 19) {
      words += b[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      words += a[num] + " ";
    }

    // Only append "taka only" if this is the outermost call
    return (
      (words.charAt(0).toUpperCase() + words.slice(1)).trim() +
      (isRecursiveCall ? "" : " ")
    );
  };

  // Example usage:

  // const handleVoucherChange = (event) => {
  //   setVoucherType(event.target.value);
  // };

  // const handleTravelTypeChange = (event) => {
  //   const { name, checked } = event.target;
  //   setTravelType((prev) => {
  //     if (checked) {
  //       return [...prev, name]; // Add selected travel type
  //     } else {
  //       return prev.filter((type) => type !== name); // Remove unselected travel type
  //     }
  //   });
  // };

  const handleUserDataFetched = (data) => {
    setUserData(data);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day} - ${month} - ${year}`;
  };

  const generatePDF = (
    purpose,
    receiverName,
    amount,
    amountInWords,
    referenceValue,
    submitDate,
    voucherType,
    secondmanusername,
    secondmanstatus,
    department,
    unitheadusername,
    unitheadstatus,
    fadsecondmanusername,
    fadsecondmanstatus,
    fadheadusername,
    fadheadstatus,
    implementedbyusername,
    implementedbystatus,

    dmdusername,
    dmdstatus,

    amdusername,
    amdstatus,

    dmdsubdate,
    amdsubdate,

    username,
    designation,
    contactno,
    email,
    dateofjoining
  ) => {
    const doc = new jsPDF();

    // Add the logo
    const logoWidth = 120;
    const logoHeight = 25;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xLogo = (pageWidth - logoWidth) / 2;
    doc.addImage(fsib_logo, "PNG", xLogo, 10, logoWidth, logoHeight);

    doc.setFontSize(12);
    doc.text(`Branch : ${department}`, 14, 42);

    // Set title font size and center it
    doc.setFontSize(18);
    const title = "Debit Voucher";
    const titleWidth = doc.getTextWidth(title);
    const xTitle = (pageWidth - titleWidth) / 2;

    const gap = 20;
    doc.text(title, xTitle, 10 + logoHeight + gap);

    // Right-aligned fields
    const rightX = pageWidth - 14;
    const formattedDate = formatDate(submitDate);
    const formatteddateTo = formatDate(dateTo);

    const logoBottomY = 12 + gap;
    const gapAfterLogo = 10;
    doc.setFontSize(12);
    doc.text(
      `L. Folio No.: ${referenceValue}`,
      rightX,
      logoBottomY + gapAfterLogo,
      { align: "right" }
    );
    doc.text(
      `Date: ${formattedDate}`,
      rightX,
      logoBottomY + gapAfterLogo + 10,
      { align: "right" }
    );

    // Custom formatted text
    // doc.setFontSize(12);
    // doc.text(
    //   `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
    //   14,
    //   70
    // );

    // Use autoTable to display userData in a table format
    doc.autoTable({
      head: [
        [
          "Username",
          "Designation",
          "Contact Number",
          "Email",
          "Date of Joining",
        ],
      ],
      body: [[username, designation, contactno, email, dateofjoining]],
      startY: 60, // Adjust starting position
      theme: "grid", // You can change the theme as needed
      styles: {
        halign: "center", // Center align text in the cells
      },
      headStyles: {
        halign: "center", // Center align header text
      },
    });

    doc.setFontSize(12);
    doc.text(
      `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
      14,
      85
    );

    // Display other fields in a separate table
    const tableData = [
      { label: "Purpose", value: purpose },
      { label: "Date", value: formatteddateTo },
      { label: "Amount", value: amount },
      { label: "Amount In Word", value: amountInWords },
      // { label: "Receiver", value: receiverName },
    ];

    doc.autoTable({
      head: [["Description", "Details"]],
      body: tableData.map((item) => [item.label, item.value]),
      startY: doc.previousAutoTable.finalY + 15, // Position below the previous table
      theme: "grid", // You can change the theme as needed
    });

    // Add statuses in table format
    const displayStatusesInTable = () => {
      // Prepare header and body data for the table
      const header = [["Name", "Status"]];

      // Prepare status data rows
      const statusData = [];
      if (secondmanstatus === "Accepted" || secondmanstatus === "Rejected") {
        statusData.push([secondmanusername, secondmanstatus]);
      }
      if (unitheadstatus === "Accepted") {
        statusData.push([unitheadusername, unitheadstatus]);
      }
      if (fadsecondmanstatus === "Accepted") {
        statusData.push([fadsecondmanusername, fadsecondmanstatus]);
      }
      if (dmdstatus === "Accepted" && dmdsubdate !== null) {
        statusData.push([dmdusername, dmdstatus]);
      }
      if (fadheadstatus === "Accepted") {
        statusData.push([fadheadusername, fadheadstatus]);
      }
      if (amdstatus === "Accepted" && amdsubdate !== null) {
        statusData.push([amdusername, amdstatus]);
      }
      if (implementedbystatus === "Done") {
        statusData.push([implementedbyusername, "Accepted"]);
      } else {
        statusData.push([implementedbyusername, "Rejected"]);
      }

      // Use autoTable to create the table with centered alignment
      doc.autoTable({
        head: header,
        body: statusData,
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 100, // Adjust starting position
        theme: "grid",
        styles: {
          halign: "center", // Center align text in cells
        },
        headStyles: {
          halign: "center", // Center align header text
        },
      });
    };

    // Display the status table
    displayStatusesInTable();

    // Save the PDF
    doc.save(`Debit_Voucher-${voucherType}-(${formattedDate}).pdf`);
  };

  const generatePDFForTransport = (
    desFrom,
    desTo,
    dateFrom,
    dateTo,
    vehicle,
    travelType,
    purpose,
    receiver,
    amount,
    amountInWords,
    referenceValue,
    submitDate,
    voucherType,
    secondmanusername,
    secondmanstatus,
    department,
    unitheadusername,
    unitheadstatus,
    fadsecondmanusername,
    fadsecondmanstatus,
    fadheadusername,
    fadheadstatus,
    implementedbyusername,
    implementedbystatus,
    dmdusername,
    dmdstatus,
    amdusername,
    amdstatus,
    dmdsubdate,
    amdsubdate,

    username,
    designation,
    contactno,
    email,
    dateofjoining
  ) => {
    const doc = new jsPDF();

    // Add the logo
    const logoWidth = 120;
    const logoHeight = 25;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xLogo = (pageWidth - logoWidth) / 2;
    doc.addImage(fsib_logo, "PNG", xLogo, 10, logoWidth, logoHeight);

    doc.setFontSize(12);
    doc.text(`Branch : ${department}`, 14, 42);

    // Set title font size and center it
    doc.setFontSize(18);
    const title = "Debit Voucher";
    const titleWidth = doc.getTextWidth(title);
    const xTitle = (pageWidth - titleWidth) / 2;

    const gap = 20;
    doc.text(title, xTitle, 10 + logoHeight + gap);

    // Right-aligned fields
    const rightX = pageWidth - 14;
    const formattedDate = formatDate(submitDate);
    const formatteddateTo = formatDate(dateTo);
    const formatteddateFrom = formatDate(dateFrom);

    const logoBottomY = 12 + gap;
    const gapAfterLogo = 10;
    doc.setFontSize(12);
    doc.text(
      `L. Folio No.: ${referenceValue}`,
      rightX,
      logoBottomY + gapAfterLogo,
      { align: "right" }
    );
    doc.text(
      `Date: ${formattedDate}`,
      rightX,
      logoBottomY + gapAfterLogo + 10,
      { align: "right" }
    );

    // Custom formatted text
    // doc.setFontSize(12);
    // doc.text(
    //   `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
    //   14,
    //   70
    // );

    // Use autoTable to display userData in a table format
    doc.autoTable({
      head: [
        [
          "Username",
          "Designation",
          "Contact Number",
          "Email",
          "Date of Joining",
        ],
      ],
      body: [[username, designation, contactno, email, dateofjoining]],
      startY: 60, // Adjust starting position
      theme: "grid", // You can change the theme as needed
      styles: {
        halign: "center", // Center align text in the cells
      },
      headStyles: {
        halign: "center", // Center align header text
      },
    });

    doc.setFontSize(12);
    doc.text(
      `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
      14,
      85
    );

    // Display other fields in a separate table
    const tableData = [
      { label: "Origin", value: desFrom },
      { label: "Destination", value: desTo },
      { label: "From Date", value: formatteddateFrom },
      { label: "To Date", value: formatteddateTo },
      { label: "Vehicle", value: vehicle },
      { label: "Travel Type", value: travelType.join(", ") },
      { label: "Purpose", value: purpose },
      { label: "Amount", value: amount },
      { label: "Amount In Word", value: amountInWords },
      // { label: "Receiver", value: receiver },
    ];

    doc.autoTable({
      head: [["Description", "Details"]],
      body: tableData.map((item) => [item.label, item.value]),
      startY: doc.previousAutoTable.finalY + 15, // Position below the previous table
      theme: "grid", // You can change the theme as needed
    });

    // Add statuses in table format
    const displayStatusesInTable = () => {
      // Prepare header and body data for the table
      const header = [["Name", "Status"]];

      // Prepare status data rows
      const statusData = [];
      if (secondmanstatus === "Accepted" || secondmanstatus === "Rejected") {
        statusData.push([secondmanusername, secondmanstatus]);
      }
      if (unitheadstatus === "Accepted") {
        statusData.push([unitheadusername, unitheadstatus]);
      }
      if (fadsecondmanstatus === "Accepted") {
        statusData.push([fadsecondmanusername, fadsecondmanstatus]);
      }
      if (dmdstatus === "Accepted" && dmdsubdate !== null) {
        statusData.push([dmdusername, dmdstatus]);
      }
      if (fadheadstatus === "Accepted") {
        statusData.push([fadheadusername, fadheadstatus]);
      }
      if (amdstatus === "Accepted" && amdsubdate !== null) {
        statusData.push([amdusername, amdstatus]);
      }
      if (implementedbystatus === "Done") {
        statusData.push([implementedbyusername, "Accepted"]);
      } else {
        statusData.push([implementedbyusername, "Rejected"]);
      }

      // Use autoTable to create the table with centered alignment
      doc.autoTable({
        head: header,
        body: statusData,
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 100, // Adjust starting position
        theme: "grid",
        styles: {
          halign: "center", // Center align text in cells
        },
        headStyles: {
          halign: "center", // Center align header text
        },
      });
    };

    // Display the status table
    displayStatusesInTable();

    // Save the PDF
    doc.save(`Debit_Voucher-${voucherType}-(${formattedDate}).pdf`);
  };

  const generatePDFForNewsPaper = (
    dateFrom,
    dateTo,
    purpose,
    receiver,
    amount,
    amountInWords,
    referenceValue,
    submitDate,
    voucherType,
    secondmanusername,
    secondmanstatus,
    department,
    unitheadusername,
    unitheadstatus,
    fadsecondmanusername,
    fadsecondmanstatus,
    fadheadusername,
    fadheadstatus,
    implementedbyusername,
    implementedbystatus,
    dmdusername,
    dmdstatus,
    amdusername,
    amdstatus,
    dmdsubdate,
    amdsubdate,
    username,
    designation,
    contactno,
    email,
    dateofjoining
  ) => {
    const doc = new jsPDF();

    // Add the logo
    const logoWidth = 120;
    const logoHeight = 25;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xLogo = (pageWidth - logoWidth) / 2;
    doc.addImage(fsib_logo, "PNG", xLogo, 10, logoWidth, logoHeight);

    doc.setFontSize(12);
    doc.text(`Branch : ${department}`, 14, 42);

    // Set title font size and center it
    doc.setFontSize(18);
    const title = "Debit Voucher";
    const titleWidth = doc.getTextWidth(title);
    const xTitle = (pageWidth - titleWidth) / 2;

    const gap = 20;
    doc.text(title, xTitle, 10 + logoHeight + gap);

    // Right-aligned fields
    const rightX = pageWidth - 14;
    const formattedDate = formatDate(submitDate);
    const formatteddateTo = formatDate(dateTo);
    const formatteddateFrom = formatDate(dateFrom);

    const logoBottomY = 12 + gap;
    const gapAfterLogo = 10;
    doc.setFontSize(12);
    doc.text(
      `L. Folio No.: ${referenceValue}`,
      rightX,
      logoBottomY + gapAfterLogo,
      { align: "right" }
    );
    doc.text(
      `Date: ${formattedDate}`,
      rightX,
      logoBottomY + gapAfterLogo + 10,
      { align: "right" }
    );

    // Custom formatted text
    // doc.setFontSize(12);
    // doc.text(
    //   `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
    //   14,
    //   70
    // );

    // Use autoTable to display userData in a table format
    doc.autoTable({
      head: [
        [
          "Username",
          "Designation",
          "Contact Number",
          "Email",
          "Date of Joining",
        ],
      ],
      body: [[username, designation, contactno, email, dateofjoining]],
      startY: 60, // Adjust starting position
      theme: "grid", // You can change the theme as needed
      styles: {
        halign: "center", // Center align text in the cells
      },
      headStyles: {
        halign: "center", // Center align header text
      },
    });

    doc.setFontSize(12);
    doc.text(
      `Debit Head, Exp A/C ${voucherType} Being the amount Cash Paid to ${receiver}`,
      14,
      85
    );

    // Display other fields in a separate table
    const tableData = [
      { label: "Purpose", value: purpose },
      { label: "From Date", value: formatteddateFrom },
      { label: "To Date", value: formatteddateTo },
      { label: "Amount", value: amount },
      { label: "Amount In Word", value: amountInWords },
      // { label: "Receiver", value: receiverName },
    ];

    doc.autoTable({
      head: [["Description", "Details"]],
      body: tableData.map((item) => [item.label, item.value]),
      startY: doc.previousAutoTable.finalY + 15, // Position below the previous table
      theme: "grid", // You can change the theme as needed
    });

    // Add statuses in table format
    const displayStatusesInTable = () => {
      // Prepare header and body data for the table
      const header = [["Name", "Status"]];

      // Prepare status data rows
      const statusData = [];
      if (secondmanstatus === "Accepted" || secondmanstatus === "Rejected") {
        statusData.push([secondmanusername, secondmanstatus]);
      }
      if (unitheadstatus === "Accepted") {
        statusData.push([unitheadusername, unitheadstatus]);
      }
      if (fadsecondmanstatus === "Accepted") {
        statusData.push([fadsecondmanusername, fadsecondmanstatus]);
      }
      if (dmdstatus === "Accepted" && dmdsubdate !== null) {
        statusData.push([dmdusername, dmdstatus]);
      }
      if (fadheadstatus === "Accepted") {
        statusData.push([fadheadusername, fadheadstatus]);
      }
      if (amdstatus === "Accepted" && amdsubdate !== null) {
        statusData.push([amdusername, amdstatus]);
      }
      if (implementedbystatus === "Done") {
        statusData.push([implementedbyusername, "Accepted"]);
      } else {
        statusData.push([implementedbyusername, "Rejected"]);
      }

      // Use autoTable to create the table with centered alignment
      doc.autoTable({
        head: header,
        body: statusData,
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 100, // Adjust starting position
        theme: "grid",
        styles: {
          halign: "center", // Center align text in cells
        },
        headStyles: {
          halign: "center", // Center align header text
        },
      });
    };

    // Display the status table
    displayStatusesInTable();
    // Save the PDF
    doc.save(`Debit_Voucher-${voucherType}-(${formattedDate}).pdf`);
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

        const fetchedAmount = data.amount; // Assuming this is a number
        setAmount(fetchedAmount);
        setAmountInWords(numberToWords(Number(fetchedAmount)) + "taka");

        if (data.voucherType) {
          setVoucherType(data.voucherType); // Set the voucherType from the fetched data
        }

        setPurpose(data.purpose);
        setDateTo(data.dateTo);
        setDateFrom(data.dateFrom);
        setVehicle(data.vehicle);
        setReceiver(data.receiver);

        setDesTo(data.desTo);
        setDesFrom(data.desFrom);
        setTravelType(data.travelType);

        // Populate form fields with existing data
        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);
        setUnitheadstatus(data.unitheadstatus);

        setSecondManUserid(data.secondmanuserid);
        setSecondManUserName(data.secondmanusername);
        setsecondmanstatus(data.secondmanstatus);

        setReferenceValue(data.referenceValue);
        setSubmitDate(data.submitDate);

        setFadsecondmanusername(data.fadsecondmanusername);
        setFadsecondmanstatus(data.fadsecondmanstatus);

        setFadheadusername(data.fadheadusername);
        setFadheadstatus(data.fadheadstatus);

        setImplementedbyusername(data.implementedbyusername);
        setImplementedbystatus(data.implementedbystatus);

        setDmdusername(data.dmdusername);
        setDmdstatus(data.dmdstatus);

        setAmdusername(data.amdusername);
        setAmdstatus(data.amdstatus);

        setDmdsubdate(data.dmdsubdate);
        setAmdsubdate(data.amdsubdate);

        // setDocumentDownloadUrl(data.documentDownloadUrl);

        const documentPaths = data.documentPaths;
        setDocuments(data.documentDownloadUrl);
        console.log({ data });

        const a = documentPaths.map((item) => item.split("~"));
        const b = a.map((item) => item[item.length - 1]);
        setFiles(b);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  const [branchname, setBranchname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const response = await fetch(
          `${bmsApiEightyOne}/api/debit/view/${decryptedUserId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setData(data);

        setDepartment(data.department);

        setUsername(data.username);
        setDesignation(data.designation);
        setContactno(data.contactno);
        setEmail(data.email);
        setDateofjoining(data.dateofjoining);
        console.log(username, designation, contactno, email, dateofjoining);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <form className="m-auto">
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
            submitDate={formData.submitDate}
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
            <div className="block appearance-none w-full bg-white border border-black rounded-md shadow-sm py-2 px-4 text-gray-700 leading-tight">
              {voucherType || "Choose Voucher Type"}
            </div>
          </div>
          {(voucherType === "Refreshment" ||
            voucherType === "Sunray Express" ||
            voucherType === "Office Maintenance" ||
            voucherType === "Convence" ||
            voucherType === "Holiday Night Duty" ||
            voucherType === "Computer Accessories" ||
            voucherType === "Evening Banking Allowance" ||
            voucherType === "Off Day Duty") && (
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
                  // onChange={(e) => setPurpose(e.target.value)}
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
                    readOnly
                    // onChange={handleAmountChange}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="Date"
                    labeltext="Date"
                    type="date"
                    id="Date"
                    value={dateTo}
                    // onChange={(e) => setDateTo(e.target.value)}
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
                    value={amountInWords} // Ensure this is bound correctly
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext=" Receiver Name"
                    type="text"
                    id="receiver"
                    value={receiver}
                    readOnly

                    // onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black pb-3">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  <div className="">
                    {files.length !== 0 ? (
                      <ol className="list-decimal flex justify-center mt-2 flex-wrap gap-5 font-[500] text-sm">
                        {files.map((file, index) => {
                          const url = documents[index]; // Assuming same length and order of files and documents
                          return (
                            <li key={index} className="m-1">
                              <div
                                onClick={() => window.open(url, "_blank")}
                                className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                              >
                                {/* Display file and its corresponding document URL */}
                                {file}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-center font-[500]">
                        No Attachment has been uploaded.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {voucherType === "Night Duty" && (
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
                  // onChange={(e) => setPurpose(e.target.value)}
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
                    readOnly
                    // onChange={handleAmountChange}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="Date"
                    labeltext="Date"
                    type="date"
                    id="Date"
                    value={dateTo}
                    // onChange={(e) => setDateTo(e.target.value)}
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
                    value={amountInWords} // Ensure this is bound correctly
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext=" Receiver Name"
                    type="text"
                    id="receiver"
                    value={receiver}
                    readOnly
                    // onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black pb-3">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  <div className="">
                    {files.length !== 0 ? (
                      <ol className="list-decimal flex justify-center mt-2 flex-wrap gap-5 font-[500] text-sm">
                        {files.map((file, index) => {
                          const url = documents[index]; // Assuming same length and order of files and documents
                          return (
                            <li key={index} className="m-1">
                              <div
                                onClick={() => window.open(url, "_blank")}
                                className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                              >
                                {/* Display file and its corresponding document URL */}
                                {file}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-center font-[500]">
                        No Attachment has been uploaded.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            // <div className="mt-3">
            //   <div className="flex flex-col mb-4">
            //     <label
            //       htmlFor="details"
            //       className="font-semibold text-gray-700 mb-1"
            //     >
            //       Purpose
            //     </label>
            //     <textarea
            //       name="Purpose"
            //       id="Purpose"
            //       className="border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            //       rows="4"
            //       placeholder="Enter Purpose here..."
            //       value={purpose}
            //       readOnly
            //       // onChange={(e) => setPurpose(e.target.value)}
            //     ></textarea>
            //   </div>

            //   <div className="flex mb-4">
            //     <div className="flex flex-col w-1/2 mr-2">
            //       <label
            //         htmlFor="amount"
            //         className="font-semibold text-gray-700 mb-1"
            //       >
            //         Amount
            //       </label>
            //       <input
            //         type="text"
            //         id="amount"
            //         className="border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            //         placeholder="Enter amount"
            //         value={amount}
            //         readOnly
            //         // onChange={(e) => setAmount(e.target.value)}
            //       />
            //     </div>

            //     <div className="flex flex-col w-1/2 mr-2">
            //       <label
            //         htmlFor="Date"
            //         className="font-semibold text-gray-700 mb-1"
            //       >
            //         Date
            //       </label>
            //       <input
            //         type="date"
            //         id="Date"
            //         className="border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            //         placeholder="Enter Date"
            //         value={dateTo}
            //         readOnly
            //         // onChange={(e) => setDateTo(e.target.value)}
            //       />
            //     </div>
            //   </div>
            // </div>
          )}

          {voucherType === "Shifting Duty" && (
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
                  // onChange={(e) => setPurpose(e.target.value)}
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
                    readOnly
                    // onChange={handleAmountChange}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="amount"
                    labeltext="Amount in Words"
                    type="text"
                    id="amount"
                    placeholder="Enter amount in words..."
                    readOnly
                    value={amountInWords} // Ensure this is bound correctly
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
                    // onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext=" Receiver Name"
                    type="text"
                    id="receiver"
                    value={receiver}
                    readOnly
                    // onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black pb-3">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  <div className="">
                    {files.length !== 0 ? (
                      <ol className="list-decimal flex justify-center mt-2 flex-wrap gap-5 font-[500] text-sm">
                        {files.map((file, index) => {
                          const url = documents[index]; // Assuming same length and order of files and documents
                          return (
                            <li key={index} className="m-1">
                              <div
                                onClick={() => window.open(url, "_blank")}
                                className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                              >
                                {/* Display file and its corresponding document URL */}
                                {file}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-center font-[500]">
                        No Attachment has been uploaded.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {voucherType === "Transport" && (
            <div className="mt-3 ">
              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={desFrom}
                    labeltext="Origin"
                    htmlFor="desfrom"
                    type="text"
                    id="desfrom"
                    readOnly
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelInput
                    value={desTo}
                    readOnly
                    labeltext="Destination"
                    htmlFor="desfrom"
                    type="text"
                    id="desto"
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={dateTo}
                    readOnly
                    labeltext="From Date"
                    htmlFor="date"
                    type="date"
                    id="date"
                  />
                </div>

                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={dateFrom}
                    readOnly
                    labeltext="To Date"
                    htmlFor="date"
                    type="date"
                    id="date"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelInput
                    value={vehicle}
                    readOnly
                    labeltext="Vehicle"
                    htmlFor="date"
                    type="text"
                    id="Vehicle"
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-1/2 mr-2">
                  <LabelInput
                    value={amount}
                    readOnly
                    labeltext="Amount"
                    htmlFor="amount"
                    type="text"
                    id="amount"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <LabelTextarea
                    rows="1"
                    id="purpose"
                    htmlFor="purpose"
                    value={purpose}
                    labeltext="Purpose"
                    readOnly
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

                <div className="flex flex-col w-1/2 ">
                  <LabelInput
                    htmlFor="receiver"
                    labeltext="Receiver Name"
                    type="text"
                    id="receiver"
                    placeholder="Enter Receiver Name"
                    value={receiver}
                    // onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black pb-3">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  <div className="">
                    {files.length !== 0 ? (
                      <ol className="list-decimal flex justify-center mt-2 flex-wrap gap-5 font-[500] text-sm">
                        {files.map((file, index) => {
                          const url = documents[index]; // Assuming same length and order of files and documents
                          return (
                            <li key={index} className="m-1">
                              <div
                                onClick={() => window.open(url, "_blank")}
                                className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                              >
                                {/* Display file and its corresponding document URL */}
                                {file}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-center font-[500]">
                        No Attachment has been uploaded.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="my-4 cursor-not-allowed">
                <table className="w-full">
                  <tr>
                    <th className="border border-black py-2">Travel Type</th>

                    <th className="border border-black py-2">
                      <input
                        type="checkbox"
                        id="up"
                        name="Up"
                        className="mr-1 cursor-not-allowed"
                        checked={travelType.includes("Up")}
                        style={{
                          backgroundColor: "#3b82f6", // Tailwind's blue-500
                          opacity: 1,
                          cursor: "not-allowed",
                        }}
                      />

                      <label htmlFor="up" className="text-gray-700">
                        {" "}
                        Up{" "}
                      </label>
                    </th>

                    <th className="border border-black py-2">
                      <input
                        type="checkbox"
                        id="down"
                        name="Down"
                        value="travel_type"
                        className="mr-1 cursor-not-allowed "
                        checked={travelType.includes("Down")}
                        style={{
                          backgroundColor: "#3b82f6", // Tailwind's blue-500
                          opacity: 1,
                          cursor: "not-allowed",
                        }}
                        // onChange={handleTravelTypeChange}
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
                  value={purpose}

                  // onChange={(e) => setPurpose(e.target.value)}
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
                    readOnly
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
                    readOnly
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
                    // onChange={handleFileChange}
                    autoComplete="off"
                    multiple
                    disabled={isDisabled}
                  />
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col w-full border border-black pb-3">
                  <h1 className="text-center border-b border-black shadow-sm p-2 font-bold text-gray-700">
                    All Attachments
                  </h1>

                  <div className="">
                    {files.length !== 0 ? (
                      <ol className="list-decimal flex justify-center mt-2 flex-wrap gap-5 font-[500] text-sm">
                        {files.map((file, index) => {
                          const url = documents[index]; // Assuming same length and order of files and documents
                          return (
                            <li key={index} className="m-1">
                              <div
                                onClick={() => window.open(url, "_blank")}
                                className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                              >
                                {/* Display file and its corresponding document URL */}
                                {file}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-center font-[500]">
                        No Attachment has been uploaded.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-10">
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
              <DebitVoucherDmdAmdAdmin
                userID={userid}
                onUserDataFetched={handleUserDataFetched}
              />
            ) : (
              <DebitVoucherViewAdmin
                userID={userid}
                onUserDataFetched={handleUserDataFetched}
              />
              // <DebitVoucherSubmitAdmin
              //   userID={userid}
              //   onUserDataFetched={handleUserDataFetched}
              // />
            )}
          </div>
          <AdminAcceptReject
            status={status}
            setStatus={setStatus}
            comment={comment}
            setComment={setComment}
          />

          {/* {implementedbystatus === "Done" && (
            <div className="flex justify-center mb-5">
              <button
                onClick={(event) => {
                  console.log({ b: implementedbystatus });
                  event.preventDefault(); // Prevents the default form submission behavior
                  generatePDF(
                    purpose,
                    receiver,
                    String(amount),
                    amountInWords,
                    referenceValue,
                    submitDate,
                    voucherType,

                    secondmanusername,
                    secondmanstatus,

                    department,

                    unitheadusername,
                    unitheadstatus,

                    fadsecondmanusername,
                    fadsecondmanstatus,

                    fadheadusername,
                    fadheadstatus,

                    implementedbyusername,
                    implementedbystatus,

                    dmdusername,
                    dmdstatus,
                    amdusername,
                    amdstatus,
                    dmdsubdate,
                    amdsubdate
                  ); // Call the PDF generation function
                }}
                className="mt-4 py-2 px-4 border-2 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
              >
                Download PDF
              </button>
            </div>
          )} */}

          {(() => {
            let buttonContent;

            if (
              implementedbystatus === "Done" &&
              (voucherType === "Refreshment" ||
                voucherType === "Night" ||
                voucherType === "Sunray Express" ||
                voucherType === "Office Maintenance" ||
                voucherType === "Convence" ||
                voucherType === "Holiday Night Duty" ||
                voucherType === "Computer Accessories" ||
                voucherType === "Off Day Duty" ||
                voucherType === "Evening Banking Allowance" ||
                voucherType === "Shifting Duty")
            ) {
              buttonContent = (
                <div className="flex justify-center mb-5">
                  <button
                    onClick={(event) => {
                      console.log({ b: implementedbystatus });
                      event.preventDefault(); // Prevents the default form submission behavior
                      generatePDF(
                        purpose,
                        receiver,
                        String(amount),
                        amountInWords,
                        referenceValue,
                        submitDate,
                        voucherType,
                        secondmanusername,
                        secondmanstatus,
                        department,
                        unitheadusername,
                        unitheadstatus,
                        fadsecondmanusername,
                        fadsecondmanstatus,
                        fadheadusername,
                        fadheadstatus,
                        implementedbyusername,
                        implementedbystatus,
                        dmdusername,
                        dmdstatus,
                        amdusername,
                        amdstatus,
                        dmdsubdate,
                        amdsubdate,
                        username,
                        designation,
                        contactno,
                        email,
                        dateofjoining
                      ); // Call the PDF generation function
                    }}
                    className="mt-4 py-2 px-4 border-2 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
                  >
                    Download PDF
                  </button>
                </div>
              );
            } else if (
              implementedbystatus === "Done" &&
              voucherType === "Transport"
            ) {
              buttonContent = (
                <div className="flex justify-center mb-5">
                  <button
                    onClick={(event) => {
                      event.preventDefault(); // Prevents the default form submission behavior
                      generatePDFForTransport(
                        desFrom,
                        desTo,
                        dateFrom,
                        dateTo,
                        vehicle,
                        travelType,
                        purpose,
                        receiver,
                        String(amount),
                        amountInWords,
                        referenceValue,
                        submitDate,
                        voucherType,
                        secondmanusername,
                        secondmanstatus,
                        department,
                        unitheadusername,
                        unitheadstatus,
                        fadsecondmanusername,
                        fadsecondmanstatus,
                        fadheadusername,
                        fadheadstatus,
                        implementedbyusername,
                        implementedbystatus,
                        dmdusername,
                        dmdstatus,
                        amdusername,
                        amdstatus,
                        dmdsubdate,
                        amdsubdate,
                        username,
                        designation,
                        contactno,
                        email,
                        dateofjoining
                      ); // Call the PDF generation function
                    }}
                    className="mt-4 py-2 px-4 border-2 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
                  >
                    Download PDF
                  </button>
                </div>
              ); // Or an alternative UI if needed
            } else if (
              implementedbystatus === "Done" &&
              voucherType === "NewsPaper"
            ) {
              buttonContent = (
                <div className="flex justify-center mb-5">
                  <button
                    onClick={(event) => {
                      event.preventDefault(); // Prevents the default form submission behavior
                      generatePDFForNewsPaper(
                        dateFrom,
                        dateTo,
                        purpose,
                        receiver,
                        String(amount),
                        amountInWords,
                        referenceValue,
                        submitDate,
                        voucherType,
                        secondmanusername,
                        secondmanstatus,
                        department,
                        unitheadusername,
                        unitheadstatus,
                        fadsecondmanusername,
                        fadsecondmanstatus,
                        fadheadusername,
                        fadheadstatus,
                        implementedbyusername,
                        implementedbystatus,
                        dmdusername,
                        dmdstatus,
                        amdusername,
                        amdstatus,
                        dmdsubdate,
                        amdsubdate,
                        username,
                        designation,
                        contactno,
                        email,
                        dateofjoining
                      ); // Call the PDF generation function
                    }}
                    className="mt-4 py-2 px-4 border-2 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
                  >
                    Download PDF
                  </button>
                </div>
              ); // Or an alternative UI if needed
            }

            return buttonContent;
          })()}
        </div>
      </div>
    </form>
  );
};

export default DebitVoucherView;
