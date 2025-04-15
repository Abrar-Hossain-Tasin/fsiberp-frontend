import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Base_api } from "../../../utils/api/Base_api";
import AdminApproval from "../../AdminDashboard/AdminApproval";
import {
  decryptId,
  encryptId,
} from "../../AdminDashboard/encryption/Encrypted";
import AmountConverter from "./AmountConverter";
import "./style.css";

const UserPermissionOrRoleView = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [currentForm, setCurrentForm] = useState({});
  const [previousForm, setPreviousForm] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [divSearchTerm, setDivSearchTerm] = useState("");
  const [divheaduserid, setDivheaduserid] = useState("");
  const [divheadusername, setDivheadusername] = useState("");
  const [filteredOptionsDiv, setFilteredOptionsDiv] = useState([]);
  const [showOptionsDiv, setShowOptionsDiv] = useState(false);
  const [eligibleUsersDiv, setEligibleUsersDiv] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [cbsExistingUser, setCbsExistingUser] = useState([]);
  const { userId, formId, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [cashDebitInWords, setCashDebitInWords] = useState("");
  const [cashCreditInWords, setCashCreditInWords] = useState("");
  const [transferDebitInWords, setTransferDebitInWords] = useState("");
  const [transferCreditInWords, setTransferCreditInWords] = useState("");
  const [clearingDebitInWords, setClearingDebitInWords] = useState("");
  const [clearingCreditInWords, setClearingCreditInWords] = useState("");
  const [onlineDebitInWords, setOnlineDebitInWords] = useState("");
  const [onlineCreditInWords, setOnlineCreditInWords] = useState("");

  const [authCashDebitInWords, setAuthCashDebitInWords] = useState("");
  const [authCashCreditInWords, setAuthCashCreditInWords] = useState("");
  const [authTransferDebitInWords, setAuthTransferDebitInWords] = useState("");
  const [authTransferCreditInWords, setAuthTransferCreditInWords] =
    useState("");
  const [authClearingDebitInWords, setAuthClearingDebitInWords] = useState("");
  const [authClearingCreditInWords, setAuthClearingCreditInWords] =
    useState("");
  const [cashTellerLimitInWords, setCashTellerLimitInWords] = useState("");

  const [formData, setFormData] = useState({
    // Transaction limits
    cashDebitEnabled: false,
    cashDebit: "",
    cashCreditEnabled: false,
    cashCredit: "",
    transferDebitEnabled: false,
    transferDebit: "",
    transferCreditEnabled: false,
    transferCredit: "",
    clearingDebitEnabled: false,
    clearingDebit: "",
    clearingCreditEnabled: false,
    clearingCredit: "",
    onlineDebitEnabled: false,
    onlineDebit: "",
    onlineCreditEnabled: false,
    onlineCredit: "",

    // Authorization limits
    authCashDebitEnabled: false,
    authCashDebit: "",
    authCashCreditEnabled: false,
    authCashCredit: "",
    authTransferDebitEnabled: false,
    authTransferDebit: "",
    authTransferCreditEnabled: false,
    authTransferCredit: "",
    authClearingDebitEnabled: false,
    authClearingDebit: "",
    authClearingCreditEnabled: false,
    authClearingCredit: "",

    // Cash Management
    cashTellerLimitEnabled: false,
    cashTellerLimit: "",
    cashTellerEnabled: false,
    cashVaultTellerEnabled: false,

    // General Banking Management
    generalBankingOperationEnabled: false,
    generalBankingAuthorizationEnabled: false,
    smsServiceEnabled: false,
    creditCardRoleEnabled: false,

    // Investment Management
    investmentOperationEnabled: false,
    investmentAuthorizationEnabled: false,

    // Trade Finance Management
    forADBranchEnabled: false,
    forNonADBranchEnabled: false,

    // Reports
    generalReportEnabled: false,
    anyBranchReportEnabled: false,
    affairsReportEnabled: false,
    headOfficeReportEnabled: false,

    // FSIBL Cloud Admin Panel
    branchUserEnabled: false,
    headOfficeAdminEnabled: false,

    // Branch Day Close
    branchDayCloseEnabled: false,

    // Agent Banking Module
    agentBranchUserEnabled: false,
    agentHeadOfficeAdminEnabled: false,
  });

  // Search Branch Start
  const [branches, setBranches] = useState([]);
  const [searchNewBranchTerm, setSearchNewBranchTerm] = useState("");
  const [searchPreviousBranchTerm, setSearchPreviousBranchTerm] = useState("");
  const [filteredNewBranches, setFilteredNewBranches] = useState([]);
  const [filteredPreviousBranches, setFilteredPreviousBranches] = useState([]);
  const [showNewBranchOptions, setShowNewBranchOptions] = useState(false);
  const [showPreviousBranchOptions, setShowPreviousBranchOptions] =
    useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchCode, setNewBranchCode] = useState("");
  const [previousBranchName, setPreviousBranchName] = useState("");
  const [previousBranchCode, setPreviousBranchCode] = useState("");
  const [transferDate, setTransferDate] = useState("");

  // Get CBS Existing User start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);

        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/profileid/${decryptedUserId}`
        );
        const data = await response.json();
        if (data) {
          const [ExistingUser] = data;
          setCbsExistingUser(ExistingUser);
          cbsExistingUser;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);
  // Get CBS Existing User end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/branches`
        );
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleNewBranchInputChange = (e) => {
    const { value } = e.target;
    setSearchNewBranchTerm(value);

    const filtered = branches.filter((item) =>
      item.branchname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNewBranches(filtered);
    setShowNewBranchOptions(value.trim() !== "");
  };

  const handlePreviousBranchInputChange = (e) => {
    const { value } = e.target;
    setSearchPreviousBranchTerm(value);

    const filtered = branches.filter((item) =>
      item.branchname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPreviousBranches(filtered);
    setShowPreviousBranchOptions(value.trim() !== "");
  };

  const handleNewBranchOptionClick = (branchname, branchcode) => {
    setSearchNewBranchTerm(`${branchname} - ${branchcode}`);
    setShowNewBranchOptions(false);
    setNewBranchName(branchname);
    setNewBranchCode(branchcode);
  };
  const handlePreviousBranchOptionClick = (branchname, branchcode) => {
    setSearchPreviousBranchTerm(`${branchname} - ${branchcode}`);
    setShowPreviousBranchOptions(false);
    setPreviousBranchName(branchname);
    setPreviousBranchCode(branchcode);
  };
  // Search Branch End

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        console.log(decryptedUserId, decryptedFormId, decryptedId);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log({ data });
        console.log(data.length);

        const previous =
          data.find((item) => item.id === Math.min(...data.map((f) => f.id))) ||
          {};
        const current =
          data.find((item) => item.id === Math.max(...data.map((f) => f.id))) ||
          {};

        // setCurrentForm(current);
        // setPreviousForm(previous);
        if (data.length === 1) {
          setCurrentForm(current);
          setPreviousForm(data.length);
        } else {
          setCurrentForm(current);
          setPreviousForm(previous);
        }
        // Set initial formData based on currentForm

        setFormData({
          transactionType: current.transactionType || [],
          transactionLimit: current.transactionLimit || [],
          authorizationType: current.authorizationType || [],
          authorizationLimit: current.authorizationLimit || [],

          // Transaction limits
          cashDebitEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[0]) !==
                Number(previous.transactionLimit?.[0])
              : Number(current.transactionLimit?.[0]),
          cashDebit:
            Number(current.transactionLimit?.[0]) !== null
              ? Number(current.transactionLimit?.[0])
              : 0,
          cashCreditEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[1]) !==
                Number(previous.transactionLimit?.[1])
              : Number(current.transactionLimit?.[1]),
          cashCredit:
            Number(current.transactionLimit?.[1]) !== null
              ? Number(current.transactionLimit?.[1])
              : 0,
          transferDebitEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[2]) !==
                Number(previous.transactionLimit?.[2])
              : Number(current.transactionLimit?.[2]),
          transferDebit:
            Number(current.transactionLimit?.[2]) !== null
              ? Number(current.transactionLimit?.[2])
              : 0,
          transferCreditEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[3]) !==
                Number(previous.transactionLimit?.[3])
              : Number(current.transactionLimit?.[3]),
          transferCredit:
            Number(current.transactionLimit?.[3]) !== null
              ? Number(current.transactionLimit?.[3])
              : 0,
          clearingDebitEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[4]) !==
                Number(previous.transactionLimit?.[4])
              : Number(current.transactionLimit?.[4]),
          clearingDebit:
            Number(current.transactionLimit?.[4]) !== null
              ? Number(current.transactionLimit?.[4])
              : 0,
          clearingCreditEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[5]) !==
                Number(previous.transactionLimit?.[5])
              : Number(current.transactionLimit?.[5]),
          clearingCredit:
            Number(current.transactionLimit?.[5]) !== null
              ? Number(current.transactionLimit?.[5])
              : 0,
          onlineDebitEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[6]) !==
                Number(previous.transactionLimit?.[6])
              : Number(current.transactionLimit?.[6]),
          onlineDebit:
            Number(current.transactionLimit?.[6]) !== null
              ? Number(current.transactionLimit?.[6])
              : 0,
          onlineCreditEnabled:
            data.length !== 1
              ? Number(current.transactionLimit?.[7]) !==
                Number(previous.transactionLimit?.[7])
              : Number(current.transactionLimit?.[7]),
          onlineCredit:
            Number(current.transactionLimit?.[7]) !== null
              ? Number(current.transactionLimit?.[7])
              : 0,

          // Authorization limits
          authCashDebitEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[0]) !==
                Number(previous.authorizationLimit?.[0])
              : Number(current.authorizationLimit?.[0]),
          authCashDebit:
            Number(current.authorizationLimit?.[0]) !== null
              ? Number(current.authorizationLimit?.[0])
              : 0,
          authCashCreditEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[1]) !==
                Number(previous.authorizationLimit?.[1])
              : Number(current.authorizationLimit?.[1]),
          authCashCredit:
            Number(current.authorizationLimit?.[1]) !== null
              ? Number(current.authorizationLimit?.[1])
              : 0,
          authTransferDebitEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[2]) !==
                Number(previous.authorizationLimit?.[2])
              : Number(current.authorizationLimit?.[2]),
          authTransferDebit:
            Number(current.authorizationLimit?.[2]) !== null
              ? Number(current.authorizationLimit?.[2])
              : 0,
          authTransferCreditEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[3]) !==
                Number(previous.authorizationLimit?.[3])
              : Number(current.authorizationLimit?.[3]),
          authTransferCredit:
            Number(current.authorizationLimit?.[3]) !== null
              ? Number(current.authorizationLimit?.[3])
              : 0,
          authClearingDebitEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[4]) !==
                Number(previous.authorizationLimit?.[4])
              : Number(current.authorizationLimit?.[4]),
          authClearingDebit:
            Number(current.authorizationLimit?.[4]) !== null
              ? Number(current.authorizationLimit?.[4])
              : 0,
          authClearingCreditEnabled:
            data.length !== 1
              ? Number(current.authorizationLimit?.[5]) !==
                Number(previous.authorizationLimit?.[5])
              : Number(current.authorizationLimit?.[5]),
          authClearingCredit:
            Number(current.authorizationLimit?.[5]) !== null
              ? Number(current.authorizationLimit?.[5])
              : 0,

          // Cash Management
          cashTellerLimitEnabled:
            data.length !== 1
              ? Number(current.cashTellerLimit) !==
                Number(previous.cashTellerLimit)
              : Number(current.cashTellerLimit),
          cashTellerLimit:
            Number(current.cashTellerLimit) !== null
              ? Number(current.cashTellerLimit)
              : 0,
          cashTellerEnabled: !!current.tellerType?.[0],
          cashVaultTellerEnabled: !!current.tellerType?.[1],

          // General Banking Management
          generalBankingOperationEnabled:
            !!current.generalBankingManagement?.[0],
          // generalBankingAuthorizationEnabled: !!current.generalBankingManagement?.[1],
          smsServiceEnabled: !!current.generalBankingManagement?.[1],
          creditCardRoleEnabled: !!current.generalBankingManagement?.[2],

          // Investment Management
          investmentOperationEnabled: !!current.investmentManagement?.[0],
          investmentAuthorizationEnabled: !!current.investmentManagement?.[1],

          // Trade Finance Management
          forADBranchEnabled: !!current.tradeFinanceManagement?.[0],
          forNonADBranchEnabled: !!current.tradeFinanceManagement?.[1],

          // Reports
          generalReportEnabled: !!current.reports?.[0],
          anyBranchReportEnabled: !!current.reports?.[1],
          affairsReportEnabled: !!current.reports?.[2],
          headOfficeReportEnabled: !!current.reports?.[3],

          // FSIBL Cloud Admin Panel
          branchUserEnabled: !!current.fsibCloudAdminPanel?.[0],
          headOfficeAdminEnabled: !!current.fsibCloudAdminPanel?.[1],

          // Branch Day Close
          branchDayCloseEnabled: !!current.branchDayClose?.[0],

          // Agent Banking Module
          agentBranchUserEnabled: !!current.agentBankingModule?.[0],
          agentHeadOfficeAdminEnabled: !!current.agentBankingModule?.[1],
        });

        // setFormData((prevData) => {
        //   if (previous.length === 1) {
        //     //transaction
        //     if (!formData.cashDebitEnabled) {
        //       formData.cashDebit = null;
        //     } else {
        //       formData.cashDebit = data[1]?.transactionLimit[0];
        //     }
        //     if (!formData.cashCreditEnabled) {
        //       formData.cashCredit = null;
        //     } else {
        //       formData.cashCredit = data[1]?.transactionLimit[1];
        //     }

        //     if (!formData.transferDebit) {
        //       formData.transferDebit = null;
        //     } else {
        //       formData.transferDebit = data[1]?.transactionLimit[2];
        //     }
        //     if (!formData.transferCreditEnabled) {
        //       formData.transferCredit = null;
        //     } else {
        //       formData.transferCredit = data[1]?.transactionLimit[3];
        //     }

        //     if (!formData.clearingDebitEnabled) {
        //       formData.clearingDebit = null;
        //     } else {
        //       formData.clearingDebit = data[1]?.transactionLimit[4];
        //     }
        //     if (!formData.clearingCreditEnabled) {
        //       formData.clearingCredit = null;
        //     } else {
        //       formData.clearingCredit = data[1]?.transactionLimit[5];
        //     }

        //     if (!formData.onlineDebitEnabled) {
        //       formData.onlineDebit = null;
        //     } else {
        //       formData.onlineDebit = data[1]?.transactionLimit[6];
        //     }
        //     if (!formData.onlineCreditEnabled) {
        //       formData.onlineCredit = null;
        //     } else {
        //       formData.onlineCredit = data[1]?.transactionLimit[7];
        //     }

        //     // authorization
        //     if (!formData.authCashDebitEnabled) {
        //       formData.authCashDebit = null;
        //     } else {
        //       formData.authCashDebit = data[1]?.authorizationLimit[0];
        //     }
        //     if (!formData.authCashCreditEnabled) {
        //       formData.authCashCredit = null;
        //     } else {
        //       formData.authCashCredit = data[1]?.authorizationLimit[1];
        //     }
        //     if (!formData.authTransferDebitEnabled) {
        //       formData.authTransferDebit = null;
        //     } else {
        //       formData.authTransferDebit = data[1]?.authorizationLimit[2];
        //     }
        //     if (!formData.authTransferCreditEnabled) {
        //       formData.authTransferCredit = null;
        //     } else {
        //       formData.authTransferCredit = data[1]?.authorizationLimit[3];
        //     }
        //     if (!formData.authClearingDebitEnabled) {
        //       formData.authClearingDebit = null;
        //     } else {
        //       formData.authClearingDebit = data[1]?.authorizationLimit[4];
        //     }

        //     //cashTellerLimit
        //     if (!formData.cashTellerLimitEnabled) {
        //       formData.cashTellerLimit = null;
        //     } else {
        //       formData.cashTellerLimit = data[1]?.cashTellerLimitEnabled;
        //     }
        //   }

        //   return {
        //     ...prevData,
        //     // transaction
        //     cashDebit: data[1]?.transactionLimit[0],
        //     cashCredit: data[1]?.transactionLimit[1],
        //     transferDebit: data[1]?.transactionLimit[2],
        //     transferCredit: data[1]?.transactionLimit[3],
        //     clearingDebit: data[1]?.transactionLimit[4],
        //     clearingCredit: data[1]?.transactionLimit[5],
        //     onlineDebit: data[1]?.transactionLimit[6],
        //     onlineCredit: data[1]?.transactionLimit[7],

        //     // authorization
        //     authCashDebit: data[1]?.authorizationLimit[0],
        //     authCashCredit: data[1]?.authorizationLimit[1],
        //     authTransferDebit: data[1]?.authorizationLimit[2],
        //     authTransferCredit: data[1]?.authorizationLimit[3],
        //     authClearingDebit: data[1]?.authorizationLimit[4],
        //     authClearingCredit: data[1]?.authorizationLimit[5],

        //     // cashTellerLimit
        //     cashTellerLimit: data[1]?.cashTellerLimit,
        //   };
        // });
        setSearchTerm(
          `${current.unitheadusername} - ${current.unitheaduserid}`
        );
        if (current.divheaduserid) {
          setDivSearchTerm(
            `${current.divheadusername} - ${current.divheaduserid}`
          );
        } else {
          setDivSearchTerm("");
        }
        if (current.newBranchName) {
          setSearchNewBranchTerm(
            `${current.newBranchName} - ${current.newBranchCode}`
          );
        }
        if (current.previousBranchName) {
          setSearchPreviousBranchTerm(
            `${current.previousBranchName} - ${current.previousBranchCode}`
          );
        }
        setTransferDate(current.transferDate);
        setNewBranchCode(current.newBranchCode);
        setPreviousBranchCode(current.previousBranchCode);
        ({ current });
        ({ previous });
        ({ data });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  const tableRowClassName = "border border-black px-4 py-2";
  const inputClassName = "border border-black rounded p-1 bg-slate-100";
  const activeColor = "activeColor";

  // Unit Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/user/emplist/${userid}`);
        const data = await response.json();
        setEligibleUsers(data);
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

    const filtered = eligibleUsers.filter((item) =>
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

  // Division Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/divhead/${userid}`
        );
        const data = await response.json();
        setEligibleUsersDiv(data);
        setFilteredOptionsDiv(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChangeDiv = (e) => {
    const { value } = e.target;
    setDivSearchTerm(value);

    const filtered = eligibleUsersDiv.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptionsDiv(filtered);
    setShowOptionsDiv(value.trim() !== "");
  };

  const handleOptionClickDiv = (username, userid) => {
    setDivSearchTerm(`${username} - ${userid}`);
    setShowOptionsDiv(false);
    setDivheaduserid(userid);
    setDivheadusername(username);
  };
  // Unit Head Search Option End

  return (
    <form className="m-auto">
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <div className="w-[850px] mx-6 flex flex-col gap-2">
          {/* header_title */}
          <div className="text-center">
            <div className="w-full flex justify-center">
              <img
                src="/src/assets/logo_fsib.png"
                className="h-[90px] w-[550px] bg-cover"
                alt="Logo"
              />
            </div>

            <h3 className="font-bold text-xl">
              CBS-User Permission/Role (“BankUltimus”- CBS Systems)
            </h3>
            <mark className="font-bold text-sm underline">
              (Please tick mark all the relevant tick box to facilitate the
              mentioned option)
            </mark>
            <div className="flex justify-between mt-2 mx-2 text-[#1b3c1c]">
              <div>
                <p className="text-[16px]">
                  <strong>
                    Reference:{" "}
                    {`FSIB/HO/ICTD/CBS/${
                      currentForm.referenceValue
                        ? currentForm.referenceValue
                        : ""
                    }`}
                  </strong>
                </p>
              </div>
              <div className="flex items-end justify-end">
                <strong className="text-[16px]">Submitted Date : </strong>{" "}
                <strong>
                  <p className="ml-1 text-[16px]">{currentForm.submitdate}</p>
                </strong>{" "}
              </div>
            </div>
          </div>

          {/* To be completed by respective Requestor */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                    To be completed by respective Requestor
                  </h4>
                </th>
              </tr>
              <tr>
                <th
                  className={`${tableRowClassName} text-center w-1/2`}
                  colSpan={2}
                >
                  Update User Permission
                </th>
                <th
                  className={`${tableRowClassName} text-center w-1/2`}
                  colSpan={2}
                >
                  New User Informationn
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} w-1/4`}>Branch Name</td>
                <td className={`${tableRowClassName} w-1/4`}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.branchnm
                    : ""}
                </td>

                <td className={`${tableRowClassName} w-1/4`}>Branch Name</td>
                <td className={`${tableRowClassName} w-1/4`}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.branchnm
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Branch ID</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.branchid
                    : ""}
                </td>
                <td className={tableRowClassName}>Branch ID</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.branchid
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Unique User Id</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.uniquserid
                    : ""}
                </td>
                <td className={tableRowClassName}>Profile Id</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.profileid
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>User Name</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.employeenm
                    : ""}
                </td>
                <td className={tableRowClassName}>User Name</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.employeenm
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>User Designation</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.userdesig
                    : ""}
                </td>
                <td className={tableRowClassName}>User Designation</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.userdesig
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Contact Number</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.contactno
                    : ""}
                </td>
                <td className={tableRowClassName}>Contact Number</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null
                    ? cbsExistingUser.contactno
                    : ""}
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Official Email</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid && cbsExistingUser.uniquserid
                    ? cbsExistingUser.email
                    : ""}
                </td>
                <td className={tableRowClassName}>Proposed Unique User ID</td>
                <td className={tableRowClassName}>
                  {cbsExistingUser.profileid &&
                  cbsExistingUser.uniquserid === null ? (
                    <input
                      type="text"
                      className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      value={currentForm.proposedUniqueUserId}
                      placeholder="Proposed Unique User ID"
                      onChange={(e) => {
                        setproposedUniqueUserId(e.target.value);
                      }}
                      disabled
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/*Submit New Branch */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                    Present Branch
                  </h4>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} w-1/4`}>
                  Present Branch Name
                </td>
                <td className={`${tableRowClassName} w-1/4`}>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type="text"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Here!"
                      value={searchNewBranchTerm}
                      onChange={handleNewBranchInputChange}
                      disabled
                    />
                    {showNewBranchOptions && (
                      <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredNewBranches.map((item) => (
                          <li
                            key={item.branchcode}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleNewBranchOptionClick(
                                item.branchname,
                                item.branchcode
                              )
                            }
                          >
                            {item.branchname} - {item.branchcode}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                <td className={`${tableRowClassName} w-1/4`}>
                  Present Branch Code
                </td>
                <td className={`${tableRowClassName} w-1/4`}>
                  {newBranchCode ? (
                    <h3>{newBranchCode}</h3>
                  ) : (
                    <h3>No Branch Selected</h3>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* If transferred from another Branch/Sub-Branch/Head Office */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={3}>
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                    If transferred from another Branch/Sub-Branch/Head Office
                  </h4>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} w-1/4`}>
                  Previous Branch Name
                </td>
                <td className={`${tableRowClassName} w-1/4`}>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type="text"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Previous Branch Here!"
                      value={searchPreviousBranchTerm}
                      onChange={handlePreviousBranchInputChange}
                      disabled
                    />
                    {showPreviousBranchOptions && (
                      <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredPreviousBranches.map((item) => (
                          <li
                            key={item.branchcode}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handlePreviousBranchOptionClick(
                                item.branchname,
                                item.branchcode
                              )
                            }
                          >
                            {item.branchname} - {item.branchcode}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
                <td className={`${tableRowClassName} w-2/4`} rowSpan={2}>
                  <div className="flex items-center justify-center">
                    <label htmlFor="transferDate">Transfer Date : </label>
                    <input
                      id="transferDate"
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      disabled
                      className="text-[#3b3838] border-[1px] border-black p-1 ml-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Previous Branch Code</td>
                <td className={tableRowClassName}>
                  {previousBranchCode ? (
                    <h3>{previousBranchCode}</h3>
                  ) : (
                    <h3>No Branch Selected</h3>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Transaction Limit Table */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  TRANSACTION LIMIT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    id={`cashDebit`}
                    checked={formData.cashDebitEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor={`cashDebit`} className="ml-1">
                    Cash Debit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full ${
                      previousForm !== 1
                        ? formData?.cashDebit !==
                          previousForm.transactionLimit?.[0]
                          ? "border-black outline-black activeColor"
                          : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                        : formData.cashDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Debit`}
                    value={formData.cashDebit} // Use updated state
                    onChange={(e) =>
                      setFormData({ ...formData, cashDebit: e.target.value })
                    }
                    disabled // Disable based on checkbox
                  />
                  <AmountConverter
                    amount={formData.cashDebit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        cashDebit: value,
                      }))
                    }
                    amountInWords={cashDebitInWords}
                    setAmountInWords={setCashDebitInWords}
                    checkAmountInWords={cashDebitInWords}
                    setCheckAmountInWords={setCashDebitInWords}
                    disabled={!formData.cashDebitEnabled}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.transactionLimit?.[0] || 0}
                  </p>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    id={`cashCredit`}
                    checked={formData.cashCreditEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor={`cashCredit`} className="ml-1">
                    Cash Credit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full ${
                      previousForm !== 1
                        ? formData.cashCredit !==
                          previousForm.transactionLimit?.[1]
                          ? "border-black outline-black activeColor"
                          : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                        : formData.cashCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Credit`}
                    value={formData.cashCredit} // Ensure value is a string
                    onChange={(e) =>
                      setFormData({ ...formData, cashCredit: e.target.value })
                    }
                    disabled // Disable based on checkbox
                  />
                  <AmountConverter
                    amount={formData.cashCredit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        cashCredit: value,
                      }))
                    }
                    amountInWords={cashCreditInWords}
                    setAmountInWords={setCashCreditInWords}
                    checkAmountInWords={cashCreditInWords}
                    setCheckAmountInWords={setCashCreditInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.transactionLimit?.[1] || 0}
                  </p>
                </td>
              </tr>
              {[
                // { key: "cash", label: "Cash" },
                { key: "transfer", label: "Transfer" },
                { key: "clearing", label: "Clearing" },
                { key: "online", label: "Online" },
              ].map((item, index) => {
                // Determine the index in transactionLimit for Debit and Credit
                const debitIndex = index * 2 + 2;
                const creditIndex = index * 2 + 2 + 1;

                return (
                  <tr key={index}>
                    <td className={tableRowClassName}>
                      <input
                        type="checkbox"
                        id={`${item.key}Debit`}
                        checked={formData[`${item.key}DebitEnabled`]}
                        onChange={(e) => {}}
                      />
                      <label htmlFor={`${item.key}Debit`} className="ml-1">
                        {item.label} Debit
                      </label>
                    </td>
                    <td className={`${tableRowClassName} pb-1`}>
                      <input
                        required
                        type="text"
                        className={`${inputClassName} w-full ${
                          item.key === "clearing" &&
                          (parseFloat(formData.clearingDebit) >
                          parseFloat(formData.transferDebit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          item.key === "online" &&
                          (parseFloat(formData.onlineDebit) >
                          parseFloat(formData.transferDebit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Debit`] !==
                              previousForm.transactionLimit?.[debitIndex]
                              ? "border-black outline-black activeColor"
                              : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Debit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Debit`}
                        value={formData[`${item.key}Debit`]} // Use updated state
                        disabled // Disable based on checkbox
                      />
                      {/* <AmountConverter
                        amount={formData[`${item.key}Debit`]}
                        setAmount={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Debit`]: value,
                          }))
                        }
                        amountInWords={transferDebitInWords}
                        setAmountInWords={setTransferDebitInWords}
                        checkAmountInWords={transferDebitInWords}
                        setCheckAmountInWords={setTransferDebitInWords}
                      /> */}
                      <AmountConverter
                        amount={formData[`${item.key}Debit`]}
                        setAmount={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Debit`]: value,
                          }))
                        }
                        amountInWords={
                          item.key === "transfer"
                            ? transferDebitInWords
                            : item.key === "clearing"
                            ? clearingDebitInWords
                            : item.key === "online"
                            ? onlineDebitInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "transfer"
                            ? setTransferDebitInWords
                            : item.key === "clearing"
                            ? setClearingDebitInWords
                            : item.key === "online"
                            ? setOnlineDebitInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "transfer"
                            ? transferDebitInWords
                            : item.key === "clearing"
                            ? clearingDebitInWords
                            : item.key === "online"
                            ? onlineDebitInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "transfer"
                            ? transferDebitInWords
                            : item.key === "clearing"
                            ? clearingDebitInWords
                            : item.key === "online"
                            ? onlineDebitInWords
                            : ""
                        }
                      />
                      <p className="text-xs text-red-800 text-right">
                        Previous Limit:{" "}
                        {previousForm.transactionLimit?.[debitIndex] || 0}
                      </p>
                    </td>
                    <td className={tableRowClassName}>
                      <input
                        type="checkbox"
                        id={`${item.key}Credit`}
                        checked={formData[`${item.key}CreditEnabled`]}
                        onChange={(e) => {}}
                      />
                      <label htmlFor={`${item.key}Credit`} className="ml-1">
                        {item.label} Credit
                      </label>
                    </td>
                    <td className={`${tableRowClassName} pb-1`}>
                      <input
                        required
                        type="text"
                        className={`${inputClassName} w-full ${
                          item.key === "clearing" &&
                          (parseFloat(formData.clearingCredit) >
                          parseFloat(formData.transferCredit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          item.key === "online" &&
                          (parseFloat(formData.onlineCredit) >
                          parseFloat(formData.transferCredit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Credit`] !==
                              previousForm.transactionLimit?.[creditIndex]
                              ? "border-black outline-black activeColor"
                              : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Credit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Credit`}
                        value={formData[`${item.key}Credit`]} // Use updated state
                        disabled // Disable based on checkbox
                      />
                      <AmountConverter
                        amount={formData[`${item.key}Credit`]}
                        setAmount={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Credit`]: value,
                          }))
                        }
                        amountInWords={
                          item.key === "transfer"
                            ? transferCreditInWords
                            : item.key === "clearing"
                            ? clearingCreditInWords
                            : item.key === "online"
                            ? onlineCreditInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "transfer"
                            ? setTransferCreditInWords
                            : item.key === "clearing"
                            ? setClearingCreditInWords
                            : item.key === "online"
                            ? setOnlineCreditInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "transfer"
                            ? transferCreditInWords
                            : item.key === "clearing"
                            ? clearingCreditInWords
                            : item.key === "online"
                            ? onlineCreditInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "transfer"
                            ? transferCreditInWords
                            : item.key === "clearing"
                            ? clearingCreditInWords
                            : item.key === "online"
                            ? onlineCreditInWords
                            : ""
                        }
                      />
                      <p className="text-xs text-red-800 text-right">
                        Previous Limit:{" "}
                        {previousForm.transactionLimit?.[creditIndex] || 0}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Authorization Limit Table */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  AUTHORIZATION LIMIT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    id={`authCashDebit`}
                    checked={formData.authCashDebitEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor={`authCashDebit`} className="ml-1">
                    Cash Debit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full  ${
                      previousForm !== 1
                        ? formData.authCashDebit !==
                          previousForm.authorizationLimit?.[0]
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.authCashDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Debit`}
                    value={formData.authCashDebit} // Use updated state
                    disabled // Disable based on checkbox
                  />
                  <AmountConverter
                    amount={formData.authCashDebit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authCashDebit: value,
                      }))
                    }
                    amountInWords={authCashDebitInWords}
                    setAmountInWords={setAuthCashDebitInWords}
                    checkAmountInWords={authCashDebitInWords}
                    setCheckAmountInWords={setAuthCashDebitInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[0] || 0}
                  </p>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    id={`authCashCredit`}
                    checked={formData.authCashCreditEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor={`authCashCredit`} className="ml-1">
                    Cash Credit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full ${
                      previousForm !== 1
                        ? formData.authCashCredit !==
                          previousForm.authorizationLimit?.[1]
                          ? "border-black outline-black activeColor"
                          : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                        : formData.authCashCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Credit`}
                    value={formData.authCashCredit} // Use updated state
                    disabled // Disable based on checkbox
                  />
                  <AmountConverter
                    amount={formData.authCashCredit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authCashCredit: value,
                      }))
                    }
                    amountInWords={authCashCreditInWords}
                    setAmountInWords={setAuthCashCreditInWords}
                    checkAmountInWords={authCashCreditInWords}
                    setCheckAmountInWords={setAuthCashCreditInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[1] || 0}
                  </p>
                </td>
              </tr>
              {[
                // { key: "authCash", label: "Cash" },
                { key: "authTransfer", label: "Transfer" },
                { key: "authClearing", label: "Clearing" },
              ].map((item, index) => {
                // Determine the index in authorizationLimit for Debit and Credit
                const debitIndex = index * 2 + 2;
                const creditIndex = index * 2 + 2 + 1;

                return (
                  <tr key={index}>
                    <td className={tableRowClassName}>
                      <input
                        type="checkbox"
                        id={`${item.key}Debit`}
                        checked={formData[`${item.key}DebitEnabled`]}
                        onChange={(e) => {}}
                      />
                      <label htmlFor={`${item.key}Debit`} className="ml-1">
                        {item.label} Debit
                      </label>
                    </td>
                    <td className={tableRowClassName}>
                      <input
                        required
                        type="text"
                        className={`${inputClassName} w-full ${
                          item.key === "authClearing" &&
                          (parseFloat(formData.authClearingDebit) >
                          parseFloat(formData.authTransferDebit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Debit`] !==
                              previousForm.authorizationLimit?.[debitIndex]
                              ? "border-black outline-black activeColor"
                              : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Debit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Debit`}
                        value={formData[`${item.key}Debit`]}
                        disabled
                      />

                      <AmountConverter
                        amount={formData[`${item.key}Debit`]}
                        setAmount={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Debit`]: value,
                          }))
                        }
                        amountInWords={
                          item.key === "authTransfer"
                            ? authTransferDebitInWords
                            : item.key === "authClearing"
                            ? authClearingDebitInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "authTransfer"
                            ? setAuthTransferDebitInWords
                            : item.key === "authClearing"
                            ? setAuthClearingDebitInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "authTransfer"
                            ? authTransferDebitInWords
                            : item.key === "authClearing"
                            ? authClearingDebitInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "authTransfer"
                            ? setAuthTransferDebitInWords
                            : item.key === "authClearing"
                            ? setAuthClearingDebitInWords
                            : ""
                        }
                      />

                      <p className="text-xs text-red-800 text-right">
                        Previous Limit:{" "}
                        {previousForm.authorizationLimit?.[debitIndex] || 0}
                      </p>
                    </td>
                    <td className={tableRowClassName}>
                      <input
                        type="checkbox"
                        id={`${item.key}Credit`}
                        checked={formData[`${item.key}CreditEnabled`]}
                        onChange={(e) => {}}
                      />
                      <label htmlFor={`${item.key}Credit`} className="ml-1">
                        {item.label} Credit
                      </label>
                    </td>
                    <td className={tableRowClassName}>
                      <input
                        required
                        type="text"
                        className={`${inputClassName} w-full ${
                          item.key === "authClearing" &&
                          (parseFloat(formData.authClearingCredit) >
                          parseFloat(formData.authTransferCredit)
                            ? "border-red-500 outline-red-500"
                            : "")
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Credit`] !==
                              previousForm.authorizationLimit?.[creditIndex]
                              ? "border-black outline-black activeColor"
                              : "bg-gray-200 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Credit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Credit`}
                        value={formData[`${item.key}Credit`]}
                        disabled
                      />
                      <AmountConverter
                        amount={formData[`${item.key}Credit`]}
                        setAmount={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Credit`]: value,
                          }))
                        }
                        amountInWords={
                          item.key === "authTransfer"
                            ? authTransferCreditInWords
                            : item.key === "authClearing"
                            ? authClearingCreditInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "authTransfer"
                            ? setAuthTransferCreditInWords
                            : item.key === "authClearing"
                            ? setAuthClearingCreditInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "authTransfer"
                            ? authTransferCreditInWords
                            : item.key === "authClearing"
                            ? authClearingCreditInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "authTransfer"
                            ? setAuthTransferCreditInWords
                            : item.key === "authClearing"
                            ? setAuthClearingCreditInWords
                            : ""
                        }
                      />
                      <p className="text-xs text-red-800 text-right">
                        Previous Limit:{" "}
                        {previousForm.authorizationLimit?.[creditIndex] || 0}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Cash Management Table */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  CASH MANAGEMENT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    onChange={(e) => {}}
                    id="cashTellerLimit"
                    checked={formData.cashTellerLimitEnabled}
                  />
                  <label htmlFor="cashTellerLimit" className="ml-1">
                    Cash Teller Limit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full ${
                      previousForm !== 1
                        ? formData.cashTellerLimit !==
                            previousForm.cashTellerLimit &&
                          formData.cashTellerLimitEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.cashTellerLimit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder="Cash Teller Limit"
                    value={formData.cashTellerLimit}
                    disabled
                  />
                  <AmountConverter
                    amount={formData.cashTellerLimit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        cashTellerLimit: value,
                      }))
                    }
                    amountInWords={cashTellerLimitInWords}
                    setAmountInWords={setCashTellerLimitInWords}
                    checkAmountInWords={cashTellerLimitInWords}
                    setCheckAmountInWords={setCashTellerLimitInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.cashTellerLimit || 0}
                  </p>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  Teller Type
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    type="checkbox"
                    onChange={(e) => {}}
                    id="cashTeller"
                    checked={formData.cashTellerEnabled}
                  />
                  <label htmlFor="cashTeller" className="ml-1">
                    Cash Teller
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    onChange={(e) => {}}
                    id="cashVaultTeller"
                    checked={formData.cashVaultTellerEnabled}
                  />
                  <label htmlFor="cashVaultTeller" className="ml-1">
                    Cash Vault Teller/Cash In-charge
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* General Banking Management */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  GENERAL BANKING MANAGEMENT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} w-1/2`}>
                  <input
                    type="checkbox"
                    id="generalBankingOperation"
                    checked={formData.generalBankingOperationEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="generalBankingOperation" className="ml-1">
                    General Banking Operation
                    {/* (For Officers) */}
                  </label>
                  <br />
                  {/* <input
                    type="checkbox"
                    id="generalBankingAuthorization"
                    checked={formData.generalBankingAuthorizationEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="generalBankingAuthorization" className="ml-1">
                    General Banking Authorization (For In-Charge)
                  </label> */}
                </td>

                <td className={`${tableRowClassName} w-1/2`}>
                  <input
                    type="checkbox"
                    id="smsService"
                    checked={formData.smsServiceEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="smsService" className="ml-1">
                    SMS Service
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="creditCardRole"
                    checked={formData.creditCardRoleEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="creditCardRole" className="ml-1">
                    Credit Card Role
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Investment Management */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  INVESTMENT MANAGEMENT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    type="checkbox"
                    id="investmentOperation"
                    checked={formData.investmentOperationEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="investmentOperation" className="ml-1">
                    Investment Operation
                    {/* (For Officers) */}
                  </label>
                  {/* <input
                    type="checkbox"
                    className="ml-5 "
                    id="investmentAuthorization"
                    checked={formData.investmentAuthorizationEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="investmentAuthorization" className="ml-1">
                    Authorization (For In-Charge)
                  </label> */}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Trade Finance Management */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  TRADE FINANCE MANAGEMENT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    type="checkbox"
                    id="forADBranch"
                    checked={formData.forADBranchEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="forADBranch" className="ml-1">
                    For AD Branch
                  </label>
                  <input
                    type="checkbox"
                    className="ml-5"
                    id="forNonADBranch"
                    checked={formData.forNonADBranchEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="forNonADBranch" className="ml-1">
                    For Non-AD Branch
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Reports */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  REPORTS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    type="checkbox"
                    id="generalReport"
                    checked={formData.generalReportEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="generalReport" className="ml-1">
                    General Report
                  </label>
                  <input
                    type="checkbox"
                    id="anyBranchReport"
                    checked={formData.anyBranchReportEnabled}
                    onChange={(e) => {}}
                    className=" ml-5"
                  />
                  <label htmlFor="anyBranchReport" className="ml-1">
                    Any Branch Report / Remote Branch Report
                  </label>
                  <input
                    type="checkbox"
                    id="affairsReport"
                    checked={formData.affairsReportEnabled}
                    onChange={(e) => {}}
                    className=" ml-5"
                  />
                  <label htmlFor="affairsReport" className="ml-1">
                    Affairs Report
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="headOfficeReport"
                    checked={formData.headOfficeReportEnabled}
                    onChange={(e) => {}}
                    className=" ml-5"
                  />
                  <label htmlFor="headOfficeReport" className="ml-1">
                    Head Office Report
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* FSIBL Cloud Admin Panel */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  FSIBL CLOUD Admin. Panel
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    type="checkbox"
                    id="branchUser"
                    checked={formData.branchUserEnabled}
                    onChange={(e) => {}}
                    className=" ml-5"
                  />
                  <label htmlFor="branchUser" className="ml-1">
                    Branch User
                  </label>
                  <input
                    type="checkbox"
                    id="headOfficeAdmin"
                    checked={formData.headOfficeAdminEnabled}
                    onChange={(e) => {}}
                    className=" ml-5"
                  />
                  <label htmlFor="headOfficeAdmin" className="ml-1">
                    Head Office Admin
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Branch Day Close */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  BRANCH DAY CLOSE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    type="checkbox"
                    id="branchDayClose"
                    checked={formData.branchDayCloseEnabled}
                    onChange={(e) => {}}
                  />
                  <label htmlFor="branchDayClose" className="ml-1">
                    Branch Day Close/Open (Default for
                    Branch/Sub-Branch/Divisional In-Charge)
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Agent Banking Module */}
          <table className="w-full text-sm font-[500]">
            <thead>
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  AGENT BANKING MODULE (nCore365)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <div className="flex gap-4 justify-center">
                    <div>
                      <input
                        type="checkbox"
                        id="agentBranchUser"
                        checked={formData.agentBranchUserEnabled}
                        onChange={(e) => {}}
                        className=" ml-5"
                      />
                      <label htmlFor="agentBranchUser" className="ml-1">
                        Branch User
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="agentHeadOfficeAdmin"
                        checked={formData.agentHeadOfficeAdminEnabled}
                        onChange={(e) => {}}
                      />
                      <label htmlFor="agentHeadOfficeAdmin" className="ml-1">
                        Head Office Admin
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* To Be Completed By Admin */}
          <div>
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mb-3">
              To be completed by Admin
            </h4>
            <table className="w-full mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded">
              <thead>
                <tr>
                  <th className={`${tableRowClassName} w-1/3`}>
                    Unit Head / Manager Operation / Head Of Branch{" "}
                  </th>
                  {/* <th className={`${tableRowClassName} w-1/3`}>
                    Divisional Head / Zonal Head
                  </th> */}
                  <th className={`${tableRowClassName} w-1/3`}>
                    Implemented By
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        type="text"
                        name="search"
                        className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                        placeholder="Search Here!"
                        value={searchTerm}
                        disabled
                      />
                      {showOptions && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredOptions.map((item) => (
                            <li
                              key={item.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleOptionClick(item.username, item.userid)
                              }
                            >
                              {item.username} - {item.userid}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                  {/* <td className={`${tableRowClassName} text-center`}>
                    {userid !== currentForm.unitheaduserid &&
                    currentForm.unitheadstatus === "Pending" ? (
                      "Unit Head will select the Divisional Head / Zonal Head"
                    ) : (
                      <div className="relative">
                        <input
                          autoComplete="off"
                          required
                          type="text"
                          id="search-input"
                          name="search"
                          className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                          placeholder="Search Here!"
                          value={divSearchTerm}
                          onChange={handleInputChangeDiv}
                          disabled={
                            userid !== currentForm.unitheaduserid ||
                            (userid === currentForm.unitheaduserid &&
                              currentForm.unitheadstatus === "Accepted")
                              ? true
                              : false
                          }
                        />
                        {showOptionsDiv && (
                          <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                            {filteredOptionsDiv.map((item) => (
                              <li
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  handleOptionClickDiv(
                                    item.username,
                                    item.userid,
                                    item.department
                                  )
                                }
                              >
                                {item.username} - {item.userid} -{" "}
                                {item.department}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </td> */}
                  <td className={`${tableRowClassName} text-center`}>
                    {currentForm.implementedbyusername
                      ? currentForm.implementedbyusername
                      : "Core Banking Solution"}
                  </td>
                </tr>

                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Status :{" "}
                    <strong
                      className={
                        currentForm.unitheadstatus === "Accepted"
                          ? "text-green-600"
                          : ""
                      }
                    >
                      {currentForm.unitheadstatus}
                    </strong>
                  </td>
                  {/* <td className={`${tableRowClassName} text-center`}>
                    Status :{" "}
                    <strong
                      className={
                        currentForm.divheadstatus === "Accepted"
                          ? "text-green-600"
                          : ""
                      }
                    >
                      {currentForm.divheadstatus}
                    </strong>
                  </td> */}
                  <td className={`${tableRowClassName} text-center`}>
                    Status :{" "}
                    <strong
                      className={
                        currentForm.implementedbystatus === "Done"
                          ? "text-green-600"
                          : ""
                      }
                    >
                      {currentForm.implementedbystatus}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment: {currentForm.unitheadcmnt}
                  </td>
                  {/* <td className={`${tableRowClassName} text-center`}>
                    Comment: {currentForm.divheadcmnt}
                  </td> */}
                  <td className={`${tableRowClassName} text-center`}></td>
                </tr>
              </tbody>
            </table>

            <table className="w-full mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded">
              <thead>
                <tr>
                  {formData.generalBankingOperationEnabled ||
                  formData.smsServiceEnabled ||
                  formData.creditCardRoleEnabled ? (
                    <th className={`${tableRowClassName}`}>
                      Divisional Head / Divisional Second Man
                    </th>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <th className={`${tableRowClassName}`}>
                      Divisional Head / Divisional Second Man
                    </th>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <th className={`${tableRowClassName}`}>
                      Divisional Head / Divisional Second Man
                    </th>
                  ) : (
                    ""
                  )}
                  {formData.forADBranchEnabled ||
                  formData.forNonADBranchEnabled ? (
                    <th className={`${tableRowClassName}`}>
                      Divisional Head / Divisional Second Man
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {formData.generalBankingOperationEnabled ||
                  formData.smsServiceEnabled ||
                  formData.creditCardRoleEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      {currentForm.bcdstatus !== "Pending"
                        ? currentForm.bcdusername
                        : " BCD Head / Second Man Will Approve This."}
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      {currentForm.imrdstatus !== "Pending"
                        ? currentForm.imrdusername
                        : " IMRD Head / Second Man Will Approve This."}
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      {currentForm.iadstatus !== "Pending"
                        ? currentForm.iadusername
                        : " IAD Head / Second Man Will Approve This."}
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.forADBranchEnabled ||
                  formData.forNonADBranchEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      {currentForm.idstatus !== "Pending"
                        ? currentForm.idusername
                        : " ID Head / Second Man Will Approve This."}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  {formData.generalBankingOperationEnabled ||
                  formData.smsServiceEnabled ||
                  formData.creditCardRoleEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Status :{" "}
                      <strong
                        className={`${
                          currentForm.bcdstatus === "Accepted"
                            ? "text-green-600"
                            : ""
                        }
                          ${
                            currentForm.bcdstatus === "Rejected"
                              ? "text-red-600"
                              : ""
                          }`}
                      >
                        {currentForm.bcdstatus}
                      </strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Status :{" "}
                      <strong
                        className={`${
                          currentForm.imrdstatus === "Accepted"
                            ? "text-green-600"
                            : ""
                        }
                          ${
                            currentForm.imrdstatus === "Rejected"
                              ? "text-red-600"
                              : ""
                          }`}
                      >
                        {currentForm.imrdstatus}
                      </strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Status :{" "}
                      <strong
                        className={`${
                          currentForm.iadstatus === "Accepted"
                            ? "text-green-600"
                            : ""
                        }
                          ${
                            currentForm.iadstatus === "Rejected"
                              ? "text-red-600"
                              : ""
                          }`}
                      >
                        {currentForm.iadstatus}
                      </strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.forADBranchEnabled ||
                  formData.forNonADBranchEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Status :{" "}
                      <strong
                        className={`${
                          currentForm.idstatus === "Accepted"
                            ? "text-green-600"
                            : ""
                        }
                          ${
                            currentForm.idstatus === "Rejected"
                              ? "text-red-600"
                              : ""
                          }`}
                      >
                        {currentForm.idstatus}
                      </strong>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  {formData.generalBankingOperationEnabled ||
                  formData.smsServiceEnabled ||
                  formData.creditCardRoleEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.bcdcmnt}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.imrdcmnt}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.iadcmnt}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.forADBranchEnabled ||
                  formData.forNonADBranchEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.idcmnt}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center ">
            {currentForm.unitheadstatus === "Pending" && (
              <button
                disabled={currentForm.unitheadstatus === "Accepted"}
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                onClick={() =>
                  navigate(
                    `/edit/${encryptId(currentForm.userid)}/${encryptId(
                      currentForm.formid
                    )}/${encryptId(currentForm.id)}`
                  )
                }
              >
                Go To Edit
              </button>
            )}
          </div>

          <div>
            <AdminApproval
              status={status}
              setStatus={setStatus}
              comment={comment}
              setComment={setComment}
              divheaduserid={divheaduserid}
              divheadusername={divheadusername}
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </form>
  );
};

export default UserPermissionOrRoleView;
