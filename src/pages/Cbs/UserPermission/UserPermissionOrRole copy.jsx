import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Base_api } from "../../../utils/api/Base_api";
const UserPermissionOrRole = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, cbsuser } = decoded;
  const [searchTerm, setSearchTerm] = useState("");
  const [previousFormData, setPreviousFormData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [cbsExistingUser, setCbsExistingUser] = useState([]);
  const [proposedUniqueUserID, setProposedUniqueUserID] = useState("");

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
  const navigate = useNavigate();
  // Get CBS Existing User start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/profileid/${userid}`
        );
        const data = await response.json();

        // Destructure the first item in the data array
        if (Array.isArray(data) && data.length > 0) {
          const [user] = data; // Destructure the first user object
          setCbsExistingUser(user); // Set the state with the user object
        } else {
          setCbsExistingUser([]); // Set to empty array if no data
        }

        "Fetched user data:", cbsExistingUser;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  // Get CBS Existing User end

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
  // Unit Head Search Option End

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/userview/${userid}`
        );
        const data = await response.json();
        if (data) {
          setPreviousFormData(data);
          const [transactionLimit] = previousFormData;
          // (transactionLimit);
        }
        previousFormData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

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

    // Sort the filtered results by branchname
    filtered.sort((a, b) => a.branchname.localeCompare(b.branchname));

    filtered;
    setFilteredPreviousBranches(filtered);
    setShowPreviousBranchOptions(value.trim() !== "");
  };
  // const asc = filtered.slice().sort((a, b) => a - b);

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

  const tableRowClassName = "border border-black px-4 py-2";
  const inputClassName = "border rounded p-1 bg-slate-100";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionLimit = [];
    const transactionType = [];
    const authorizationLimit = [];
    const authorizationType = [];

    // Collect transaction limits
    [
      { key: "cash", label: "Cash" },
      { key: "transfer", label: "Transfer" },
      { key: "clearing", label: "Clearing" },
      { key: "online", label: "Online" },
    ].forEach((item) => {
      if (formData[`${item.key}DebitEnabled`]) {
        transactionLimit.push(Number(formData[`${item.key}Debit`]));
        transactionType.push(`${item.label} Debit`);
      } else {
        transactionLimit.push(null);
        transactionType.push(`${item.label} Debit`);
      }

      if (formData[`${item.key}CreditEnabled`]) {
        transactionLimit.push(Number(formData[`${item.key}Credit`]));
        transactionType.push(`${item.label} Credit`);
      } else {
        transactionLimit.push(null);
        transactionType.push(`${item.label} Credit`);
      }
    });

    // Extracting specific limits for validation
    const transferDebitLimit = transactionLimit[2]; // Assuming transfer debit is at index 2
    const clearingDebitLimit = transactionLimit[4]; // Assuming clearing debit is at index 4
    const onlineDebitLimit = transactionLimit[6]; // Assuming online debit is at index 6
    // Extracting specific limits for validation
    const transferCreditLimit = transactionLimit[3]; // Assuming transfer credit is at index 3
    const clearingCreditLimit = transactionLimit[5]; // Assuming clearing credit is at index 5
    const onlineCreditLimit = transactionLimit[7]; // Assuming online credit is at index 7

    // Validation logic
    if (clearingDebitLimit > transferDebitLimit) {
      alert("Clearing Debit limit cannot be more than Transfer Debit limit.");
      return; // Prevent submission
    }

    if (onlineDebitLimit > transferDebitLimit) {
      alert("Online Debit limit cannot be more than Transfer Debit limit.");
      return; // Prevent submission
    }

    // Validation logic
    if (clearingCreditLimit > transferCreditLimit) {
      alert("Clearing Credit limit cannot be more than Transfer Credit limit.");
      return; // Prevent submission
    }

    if (onlineCreditLimit > transferCreditLimit) {
      alert("Online Credit limit cannot be more than Transfer Credit limit.");
      return; // Prevent submission
    }

    // Collect authorization limits
    [
      { label: "Cash", key: "authCash" },
      { label: "Transfer", key: "authTransfer" },
      { label: "Clearing", key: "authClearing" },
    ].forEach((item) => {
      if (formData[`${item.key}DebitEnabled`]) {
        authorizationLimit.push(Number(formData[`${item.key}Debit`]));
        authorizationType.push(`${item.label} Debit`);
      } else {
        authorizationLimit.push(null);
        authorizationType.push(`${item.label} Debit`);
      }

      if (formData[`${item.key}CreditEnabled`]) {
        authorizationLimit.push(Number(formData[`${item.key}Credit`]));
        authorizationType.push(`${item.label} Credit`);
      } else {
        authorizationLimit.push(null);
        authorizationType.push(`${item.label} Credit`);
      }
    });

    // Extracting specific limits for validation
    const authTransferDebitLimit = authorizationLimit[2]; // Assuming transfer debit is at index 2
    const authClearingDebitLimit = authorizationLimit[4]; // Assuming clearing debit is at index 4
    // Extracting specific limits for validation
    const authTransferCreditLimit = authorizationLimit[3]; // Assuming transfer credit is at index 3
    const authClearingCreditLimit = authorizationLimit[5]; // Assuming clearing credit is at index 5

    // Validation logic
    if (authClearingDebitLimit > authTransferDebitLimit) {
      alert(
        "Auth Clearing Debit limit cannot be more than Auth Transfer Debit limit."
      );
      return; // Prevent submission
    }
    // Validation logic
    if (authClearingCreditLimit > authTransferCreditLimit) {
      alert(
        "Auth Clearing Credit limit cannot be more than Auth Transfer Credit limit."
      );
      return; // Prevent submission
    }

    // Collect cash management data
    const cashTellerLimit = formData.cashTellerLimitEnabled
      ? Number(formData.cashTellerLimit)
      : null;

    const tellerType = [];
    if (formData.cashTellerEnabled) {
      tellerType.push("Cash Teller");
    } else {
      tellerType.push(null);
    }

    if (formData.cashVaultTellerEnabled) {
      tellerType.push("Cash Vault Teller/Cash In-charge");
    } else {
      tellerType.push(null);
    }

    // Collect General Banking Management data
    const generalBankingManagement = [];
    if (formData.generalBankingOperationEnabled) {
      generalBankingManagement.push("General Banking Operation (For Officers)");
    } else {
      generalBankingManagement.push(null);
    }
    if (formData.generalBankingAuthorizationEnabled) {
      generalBankingManagement.push(
        "General Banking Authorization (For In-Charge)"
      );
    } else {
      generalBankingManagement.push(null);
    }
    if (formData.smsServiceEnabled) {
      generalBankingManagement.push("SMS Service");
    } else {
      generalBankingManagement.push(null);
    }
    if (formData.creditCardRoleEnabled) {
      generalBankingManagement.push("Credit Card Role");
    } else {
      generalBankingManagement.push(null);
    }

    // Collect Investment Management data
    const investmentManagement = [];
    if (formData.investmentOperationEnabled) {
      investmentManagement.push("Investment Operation (For Officers)");
    } else {
      investmentManagement.push(null);
    }
    if (formData.investmentAuthorizationEnabled) {
      investmentManagement.push("Investment Authorization (For In-Charge)");
    } else {
      investmentManagement.push(null);
    }

    // Collect Trade Finance Management data
    const tradeFinanceManagement = [];
    if (formData.forADBranchEnabled) {
      tradeFinanceManagement.push("For AD Branch");
    } else {
      tradeFinanceManagement.push(null);
    }
    if (formData.forNonADBranchEnabled) {
      tradeFinanceManagement.push("For Non-AD Branch");
    } else {
      tradeFinanceManagement.push(null);
    }

    // Collect Reports data
    const reports = [];
    if (formData.generalReportEnabled) {
      reports.push("General Report");
    } else {
      reports.push(null);
    }
    if (formData.anyBranchReportEnabled) {
      reports.push("Any Branch Report / Remote Branch Report");
    } else {
      reports.push(null);
    }
    if (formData.affairsReportEnabled) {
      reports.push("Affairs Report");
    } else {
      reports.push(null);
    }
    if (formData.headOfficeReportEnabled) {
      reports.push("Head Office Report");
    } else {
      reports.push(null);
    }

    // Collect FSIBL Cloud Admin Panel data
    const fsibCloudAdminPanel = [];
    if (formData.branchUserEnabled) {
      fsibCloudAdminPanel.push("Branch User");
    } else {
      fsibCloudAdminPanel.push(null);
    }
    if (formData.headOfficeAdminEnabled) {
      fsibCloudAdminPanel.push("Head Office Admin");
    } else {
      fsibCloudAdminPanel.push(null);
    }

    // Collect Branch Day Close data
    const branchDayClose = [];
    if (formData.branchDayCloseEnabled) {
      branchDayClose.push(
        "Branch Day Close/Open (Default for Branch/Sub-Branch/Divisional In-Charge)"
      );
    } else {
      branchDayClose.push(null);
    }

    // Collect Agent Banking Module data
    const agentBankingModule = [];
    if (formData.agentBranchUserEnabled) {
      agentBankingModule.push("Branch User");
    } else {
      agentBankingModule.push(null);
    }
    if (formData.agentHeadOfficeAdminEnabled) {
      agentBankingModule.push("Head Office Admin");
    } else {
      agentBankingModule.push(null);
    }

    formData;
    newBranchName,
      newBranchCode,
      previousBranchName,
      previousBranchCode,
      transferDate;
    // Submit to API
    try {
      const response = await fetch(
        `${Base_api}/api/cbs-user-permission/save/${userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            unitheaduserid,
            unitheadusername,
            newBranchName,
            newBranchCode,
            previousBranchName,
            previousBranchCode,
            transferDate,
            transactionLimit,
            transactionType,
            authorizationLimit,
            authorizationType,
            cashTellerLimit,
            tellerType,
            generalBankingManagement,
            investmentManagement,
            tradeFinanceManagement,
            reports,
            fsibCloudAdminPanel,
            branchDayClose,
            agentBankingModule,
            proposedUniqueUserID,
          }),
        }
      );

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
          navigate("/cbs");
        }, 3000);
      } else {
        console.error("Error submitting form:", await response.json());
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      "Success:", data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (cbsExistingUser.profileid && cbsExistingUser.uniquserid) {
    return (
      <form onSubmit={handleSubmit} className="m-auto">
        <ToastContainer autoClose={2000} />
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
              <mark className="font-bold text-sm underline ">
                (Please tick mark all the relevant tick box to facilitate the
                mentioned option)
              </mark>
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
                    {cbsuser === "old" ? cbsExistingUser.branchnm : ""}
                  </td>

                  <td className={`${tableRowClassName} w-1/4`}>Branch Name</td>
                  <td className={`${tableRowClassName} w-1/4`}>
                    {cbsuser === "new" ? cbsExistingUser.branchnm : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>Branch ID</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.branchid : ""}
                  </td>
                  <td className={tableRowClassName}>Branch ID</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? cbsExistingUser.branchid : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>Unique User Id</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.uniquserid : ""}
                  </td>
                  <td className={tableRowClassName}>Profile Id</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? cbsExistingUser.profileid : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>User Name</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.employeenm : ""}
                  </td>
                  <td className={tableRowClassName}>User Name</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? cbsExistingUser.employeenm : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>User Designation</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.userdesig : ""}
                  </td>
                  <td className={tableRowClassName}>User Designation</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? cbsExistingUser.userdesig : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>Contact Number</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.contactno : ""}
                  </td>
                  <td className={tableRowClassName}>Contact Number</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? cbsExistingUser.contactno : ""}
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>Official Email</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "old" ? cbsExistingUser.email : ""}
                  </td>
                  <td className={tableRowClassName}>Proposed Unique User ID</td>
                  <td className={tableRowClassName}>
                    {cbsuser === "new" ? (
                      <input
                        type="text"
                        className="p-2"
                        value={proposedUniqueUserID}
                        placeholder="Proposed Unique User ID"
                        onChange={(e) =>
                          setProposedUniqueUserID(e.target.value)
                        }
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
                      New Branch
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tableRowClassName}>New Branch Name</td>
                  <td className={tableRowClassName}>
                    <div className="relative text-sm">
                      <input
                        autoComplete="off"
                        type="text"
                        id="search-input"
                        name="search"
                        className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                        placeholder="Search Here!"
                        value={searchNewBranchTerm}
                        onChange={handleNewBranchInputChange}
                      />
                      {showNewBranchOptions && (
                        <ul className="absolute w-full text-sm text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredNewBranches.map((item) => (
                            <li
                              key={item.branchname}
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
                  <td className={tableRowClassName}>New Branch Code</td>
                  <td className={tableRowClassName}>
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
                  <td className={`${tableRowClassName} w-3/12`}>
                    Previous Branch Name
                  </td>
                  <td className={`${tableRowClassName} w-4/12`}>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        type="text"
                        id="search-input"
                        name="search"
                        className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                        placeholder="Search Previous Branch Here!"
                        value={searchPreviousBranchTerm}
                        onChange={handlePreviousBranchInputChange}
                      />
                      {showPreviousBranchOptions && (
                        <ul className="absolute w-full text-sm text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredPreviousBranches.map((item) => (
                            <li
                              key={item.branchname}
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
                  <td className={`${tableRowClassName} w-5/12`} rowSpan={2}>
                    <div className="flex items-center">
                      <label htmlFor="transferDate">Transfer Date : </label>
                      <input
                        id="transferDate"
                        type="date"
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
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
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`cashDebit`}
                      checked={formData.cashDebitEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          cashDebitEnabled: isChecked,
                          cashDebit: isChecked ? prevData.cashDebit : "", // Clear input if unchecked
                        }));
                      }}
                    />

                    <label htmlFor={`cashDebit`} className="ml-1">
                      Cash Debit
                    </label>
                  </td>
                  <td className={`${tableRowClassName} pb-1`}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.cashDebitEnabled
                          ? "border-black outline-black bg-white"
                          : "bg-gray-200 border-black" // Add a different background when disabled for clarity
                      }`}
                      placeholder={`Cash Debit`}
                      disabled={!formData.cashDebitEnabled}
                      value={formData.cashDebit} // Bind the input value to formData.cashDebit
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          cashDebit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].transactionLimit[0] !== null
                          ? previousFormData[0].transactionLimit[0]
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`cashCredit`}
                      checked={formData.cashCreditEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          cashCreditEnabled: isChecked,
                          cashCredit: isChecked ? prevData.cashCredit : "", // Clear input if unchecked
                        }));
                      }}
                    />
                    <label htmlFor={`cashCredit`} className="ml-1">
                      Cash Credit
                    </label>
                  </td>
                  <td className={`${tableRowClassName} pb-1`}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.cashCreditEnabled
                          ? "border-black outline-black bg-white"
                          : "bg-gray-200 border-black" // Add a different background when disabled for clarity
                      }`}
                      placeholder={`Cash Credit`}
                      disabled={!formData.cashCreditEnabled}
                      value={formData.cashCredit} // Bind the input value to formData.cashCredit
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          cashCredit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].transactionLimit[1] !== null
                          ? previousFormData[0].transactionLimit[1]
                          : 0
                        : ""}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`transferDebit`}
                      checked={formData.transferDebitEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => {
                          const newClearingDebitEnabled = !isChecked
                            ? false
                            : prevData.clearingDebitEnabled;
                          const newOnlineDebitEnabled = !isChecked
                            ? false
                            : prevData.onlineDebitEnabled;

                          return {
                            ...prevData,
                            transferDebitEnabled: isChecked,
                            transferDebit: isChecked
                              ? prevData.transferDebit
                              : "", // Clear input if unchecked
                            clearingDebitEnabled: newClearingDebitEnabled, // Update clearingDebitEnabled
                            clearingDebit: newClearingDebitEnabled
                              ? prevData.clearingDebit
                              : "", // Clear clearingDebit if unchecked
                            onlineDebitEnabled: newOnlineDebitEnabled, // Update onlineDebitEnabled
                            onlineDebit: newOnlineDebitEnabled
                              ? prevData.onlineDebit
                              : "", // Clear onlineDebit if unchecked
                          };
                        });
                      }}
                    />

                    <label htmlFor={`transferDebit`} className="ml-1">
                      Transfer Debit
                    </label>
                  </td>
                  <td className={`${tableRowClassName} pb-1`}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full  ${
                        formData.transferDebitEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Transfer Debit`}
                      disabled={!formData[`transferDebitEnabled`]}
                      value={formData.transferDebit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          transferDebit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].transactionLimit[2] !== null
                          ? previousFormData[0].transactionLimit[2]
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`transferCredit`}
                      checked={formData.transferCreditEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => {
                          const newClearingCreditEnabled = !isChecked
                            ? false
                            : prevData.clearingCreditEnabled;
                          const newOnlineCreditEnabled = !isChecked
                            ? false
                            : prevData.onlineCreditEnabled;

                          return {
                            ...prevData,
                            transferCreditEnabled: isChecked,
                            transferCredit: isChecked
                              ? prevData.transferCredit
                              : "", // Clear input if unchecked
                            clearingCreditEnabled: newClearingCreditEnabled, // Update clearingCreditEnabled
                            clearingCredit: newClearingCreditEnabled
                              ? prevData.clearingCredit
                              : "", // Clear clearingCredit if unchecked
                            onlineCreditEnabled: newOnlineCreditEnabled, // Update onlineCreditEnabled
                            onlineCredit: newOnlineCreditEnabled
                              ? prevData.onlineCredit
                              : "", // Clear onlineCredit if unchecked
                          };
                        });
                      }}
                    />

                    <label htmlFor={`transferCredit`} className="ml-1">
                      Transfer Credit
                    </label>
                  </td>
                  <td className={`${tableRowClassName} pb-1`}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full  ${
                        formData.transferCreditEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Transfer Credit`}
                      disabled={!formData[`transferCreditEnabled`]}
                      value={formData.transferCredit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`transferCredit`]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].transactionLimit[3] !== null
                          ? previousFormData[0].transactionLimit[3]
                          : 0
                        : ""}
                    </p>
                  </td>
                </tr>
                {[
                  // { key: "cash", label: "Cash" },
                  // { key: "transfer", label: "Transfer" },
                  { key: "clearing", label: "Clearing" },
                  { key: "online", label: "Online" },
                ].map((item, index) => {
                  // Determine the index in transactionLimit for Debit and Credit
                  const debitIndex = index * 2 + 2 + 2;
                  const creditIndex = index * 2 + 2 + 2 + 1;

                  return (
                    <tr key={index}>
                      <td className={tableRowClassName}>
                        <input
                          type="checkbox"
                          id={`${item.key}Debit`}
                          checked={formData[`${item.key}DebitEnabled`]}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData((prevData) => ({
                              ...prevData,
                              [`${item.key}DebitEnabled`]: isChecked,
                              // Only update transferDebitEnabled if the current checkbox is checked
                              transferDebitEnabled: isChecked
                                ? isChecked
                                : prevData.transferDebitEnabled,
                              [`${item.key}Debit`]: isChecked
                                ? prevData[`${item.key}Debit`]
                                : "",
                            }));
                          }}
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
                              ? "border-red-500 outline-red-500 ring-red-500"
                              : "border-black")
                          } ${
                            item.key === "online" &&
                            (parseFloat(formData.onlineDebit) >
                            parseFloat(formData.transferDebit)
                              ? "border-red-500 outline-red-500 ring-red-500"
                              : "border-black")
                          } ${
                            formData[`${item.key}DebitEnabled`]
                              ? "bg-white ring-1"
                              : "border-black"
                          }`}
                          placeholder={`${item.label} Debit`}
                          disabled={!formData[`${item.key}DebitEnabled`]}
                          value={formData[`${item.key}Debit`]}
                          onChange={(e) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              [`${item.key}Debit`]: e.target.value,
                            }));
                          }}
                        />
                        <p className="text-xs text-red-800 text-right">
                          Previous Limit:{" "}
                          {previousFormData.length > 0
                            ? previousFormData[0].transactionLimit[
                                debitIndex
                              ] !== null
                              ? previousFormData[0].transactionLimit[debitIndex]
                              : 0
                            : ""}
                        </p>
                      </td>
                      <td className={tableRowClassName}>
                        <input
                          type="checkbox"
                          id={`${item.key}Credit`}
                          checked={formData[`${item.key}CreditEnabled`]}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData((prevData) => ({
                              ...prevData,
                              [`${item.key}CreditEnabled`]: isChecked,
                              // Only update transferCreditEnabled if the current checkbox is checked
                              [`transferCreditEnabled`]: isChecked
                                ? isChecked
                                : prevData.transferCreditEnabled,
                              [`${item.key}Credit`]: isChecked
                                ? prevData[`${item.key}Credit`]
                                : "",
                            }));
                          }}
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
                              ? "border-red-500 outline-red-500 ring-red-500"
                              : "border-black")
                          } ${
                            item.key === "online" &&
                            (parseFloat(formData.onlineCredit) >
                            parseFloat(formData.transferCredit)
                              ? "border-red-500 outline-red-500 ring-red-500"
                              : "border-black")
                          } ${
                            formData[`${item.key}CreditEnabled`]
                              ? "bg-white ring-1"
                              : "border-black"
                          }`}
                          placeholder={`${item.label} Credit`}
                          disabled={!formData[`${item.key}CreditEnabled`]}
                          value={formData[`${item.key}Credit`]}
                          onChange={(e) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              [`${item.key}Credit`]: e.target.value,
                            }));
                          }}
                        />
                        <p className="text-xs text-red-800 text-right">
                          Previous Limit:{" "}
                          {previousFormData.length > 0
                            ? previousFormData[0].transactionLimit[
                                creditIndex
                              ] !== null
                              ? previousFormData[0].transactionLimit[
                                  creditIndex
                                ]
                              : 0
                            : ""}
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
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authCashDebit`}
                      checked={formData[`authCashDebitEnabled`]}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          authCashDebitEnabled: isChecked,
                          authCashDebit: isChecked
                            ? prevData.authCashDebit
                            : "", // Clear input if unchecked
                        }));
                      }}
                    />
                    <label htmlFor={`authCashDebit`} className="ml-1">
                      Cash Debit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.authCashDebitEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Cash Debit`}
                      disabled={!formData[`authCashDebitEnabled`]}
                      value={formData.authCashDebit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`authCashDebit`]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[0] !== null
                          ? previousFormData[0].authorizationLimit[0]
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authCashCredit`}
                      checked={formData[`authCashCreditEnabled`]}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          authCashCreditEnabled: isChecked,
                          authCashCredit: isChecked
                            ? prevData.authCashCredit
                            : "", // Clear input if unchecked
                        }));
                      }}
                    />
                    <label htmlFor={`authCashCredit`} className="ml-1">
                      Cash Credit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.authCashCreditEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Cash Credit`}
                      disabled={!formData[`authCashCreditEnabled`]}
                      value={formData.authCashCredit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`authCashCredit`]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[1] !== null
                          ? previousFormData[0].authorizationLimit[1]
                          : 0
                        : ""}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authTransferDebit`}
                      checked={formData.authTransferDebitEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => {
                          const newAuthClearingDebitEnabled = !isChecked
                            ? false
                            : prevData.authClearingDebitEnabled;

                          return {
                            ...prevData,
                            authTransferDebitEnabled: isChecked,
                            authTransferDebit: isChecked
                              ? prevData.authTransferDebit
                              : "", // Clear input if unchecked
                            authClearingDebitEnabled:
                              newAuthClearingDebitEnabled, // Update authClearingDebitEnabled
                            authClearingDebit: newAuthClearingDebitEnabled
                              ? prevData.authClearingDebit
                              : "", // Clear authClearingDebit if unchecked
                          };
                        });
                      }}
                    />
                    <label htmlFor={`authTransferDebit`} className="ml-1">
                      Transfer Debit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.authTransferDebitEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Transfer Debit`}
                      disabled={!formData[`authTransferDebitEnabled`]}
                      value={formData.authTransferDebit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`authTransferDebit`]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[2] !== null
                          ? previousFormData[0].authorizationLimit[2]
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authTransferCredit`}
                      checked={formData.authTransferCreditEnabled}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => {
                          const newAuthClearingCreditEnabled = !isChecked
                            ? false
                            : prevData.authClearingCreditEnabled;

                          return {
                            ...prevData,
                            authTransferCreditEnabled: isChecked,
                            authTransferCredit: isChecked
                              ? prevData.authTransferCredit
                              : "", // Clear input if unchecked
                            authClearingCreditEnabled:
                              newAuthClearingCreditEnabled, // Update authClearingCreditEnabled
                            authClearingCredit: newAuthClearingCreditEnabled
                              ? prevData.authClearingCredit
                              : "", // Clear authClearingCredit if unchecked
                          };
                        });
                      }}
                    />

                    <label htmlFor={`authTransferCredit`} className="ml-1">
                      Transfer Credit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.authTransferCreditEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder={`Transfer Credit`}
                      disabled={!formData[`authTransferCreditEnabled`]}
                      value={formData.authTransferCredit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`authTransferCredit`]: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[3] !== null
                          ? previousFormData[0].authorizationLimit[3]
                          : 0
                        : ""}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authClearingDebit`}
                      checked={formData[`authClearingDebitEnabled`]}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          authClearingDebitEnabled: isChecked,
                          authClearingDebit: isChecked
                            ? prevData.authClearingDebit
                            : "", // Clear input if unchecked
                          authTransferDebitEnabled: isChecked
                            ? isChecked
                            : prevData.authTransferDebitEnabled,
                        }));
                      }}
                    />
                    <label htmlFor={`authClearingDebit`} className="ml-1">
                      Clearing Debit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        parseFloat(formData.authClearingDebit) >
                        parseFloat(formData.authTransferDebit)
                          ? "border-red-500 outline-red-500 ring-red-500"
                          : "border-black"
                      }  ${
                        formData.authClearingDebitEnabled
                          ? "bg-white ring-1"
                          : ""
                      }`}
                      placeholder={`Clearing Debit`}
                      disabled={!formData[`authClearingDebitEnabled`]}
                      value={formData.authClearingDebit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          authClearingDebit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[4] !== null
                          ? previousFormData[0].authorizationLimit[4]
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`authClearingCredit`}
                      checked={formData[`authClearingCreditEnabled`]}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          authClearingCreditEnabled: isChecked,
                          authClearingCredit: isChecked
                            ? prevData.authClearingCredit
                            : "", // Clear input if unchecked
                          authTransferCreditEnabled: isChecked
                            ? isChecked
                            : prevData.authTransferCreditEnabled,
                        }));
                      }}
                    />
                    <label htmlFor={`authClearingCredit`} className="ml-1">
                      Clearing Credit
                    </label>
                  </td>
                  <td className={tableRowClassName}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        parseFloat(formData.authClearingCredit) >
                        parseFloat(formData.authTransferCredit)
                          ? "border-red-500 outline-red-500 ring-red-500"
                          : "border-black"
                      }  ${
                        formData.authClearingCreditEnabled
                          ? "bg-white ring-1"
                          : ""
                      }`}
                      placeholder={`Clearing Credit`}
                      disabled={!formData[`authClearingCreditEnabled`]}
                      value={formData.authClearingCredit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          authClearingCredit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].authorizationLimit[5] !== null
                          ? previousFormData[0].authorizationLimit[5]
                          : 0
                        : ""}
                    </p>
                  </td>
                </tr>
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
                  <td className={`${tableRowClassName} w-1/4`}>
                    <input
                      type="checkbox"
                      id="cashTellerLimit"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData((prevData) => ({
                          ...prevData,
                          cashTellerLimitEnabled: isChecked,
                          cashTellerLimit: isChecked
                            ? prevData.cashTellerLimit
                            : "", // Clear input if unchecked
                        }));
                      }}
                    />
                    <label htmlFor="cashTellerLimit" className="ml-1">
                      Cash Teller Limit
                    </label>
                  </td>
                  <td className={`${tableRowClassName} w-1/4`}>
                    <input
                      required
                      type="text"
                      className={`${inputClassName} w-full ${
                        formData.cashTellerLimitEnabled
                          ? "border-black outline-black bg-white"
                          : "border-black"
                      }`}
                      placeholder="Cash Teller Limit"
                      disabled={!formData.cashTellerLimitEnabled}
                      value={formData.cashTellerLimit}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          cashTellerLimit: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-xs text-red-800 text-right">
                      Previous Limit:{" "}
                      {previousFormData.length > 0
                        ? previousFormData[0].cashTellerLimit !== null
                          ? previousFormData[0].cashTellerLimit
                          : 0
                        : ""}
                    </p>
                  </td>
                  <td className={`${tableRowClassName} w-1/4`}>Teller Type</td>
                  <td className={`${tableRowClassName} w-1/4`}>
                    <input
                      type="checkbox"
                      id="cashTeller"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          cashTellerEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="cashTeller" className="ml-1">
                      Cash Teller
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      id="cashVaultTeller"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          cashVaultTellerEnabled: e.target.checked,
                        }));
                      }}
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          generalBankingOperationEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="generalBankingOperation" className="ml-1">
                      General Banking Operation (For Officers)
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      id="generalBankingAuthorization"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          generalBankingAuthorizationEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label
                      htmlFor="generalBankingAuthorization"
                      className="ml-1"
                    >
                      General Banking Authorization (For In-Charge)
                    </label>
                  </td>

                  <td className={`${tableRowClassName} w-1/2`}>
                    <input
                      type="checkbox"
                      id="smsService"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          smsServiceEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="smsService" className="ml-1">
                      SMS Service
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      id="creditCardRole"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          creditCardRoleEnabled: e.target.checked,
                        }));
                      }}
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          investmentOperationEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="investmentOperation" className="ml-1">
                      Investment Operation (For Officers)
                    </label>
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="investmentAuthorization"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          investmentAuthorizationEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="investmentAuthorization" className="ml-1">
                      Authorization (For In-Charge)
                    </label>
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          forADBranchEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="forADBranch" className="ml-1">
                      For AD Branch
                    </label>
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="forNonADBranch"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          forNonADBranchEnabled: e.target.checked,
                        }));
                      }}
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          generalReportEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="generalReport" className="ml-1">
                      General Report
                    </label>
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="anyBranchReport"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          anyBranchReportEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="anyBranchReport" className="ml-1">
                      Any Branch Report / Remote Branch Report
                    </label>
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="affairsReport"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          affairsReportEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="affairsReport" className="ml-1">
                      Affairs Report
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="headOfficeReport"
                      disabled={cbsExistingUser.branchid !== "0100"}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          headOfficeReportEnabled: e.target.checked,
                        }));
                      }}
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          branchUserEnabled: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor="branchUser" className="ml-1">
                      Branch User
                    </label>
                    <input
                      type="checkbox"
                      className="ml-5"
                      id="headOfficeAdmin"
                      disabled={cbsExistingUser.branchid !== "0100"}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          headOfficeAdminEnabled: e.target.checked,
                        }));
                      }}
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
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          branchDayCloseEnabled: e.target.checked,
                        }));
                      }}
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
                          onChange={(e) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              agentBranchUserEnabled: e.target.checked,
                            }));
                          }}
                        />
                        <label htmlFor="agentBranchUser" className="ml-1">
                          Branch User
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="agentHeadOfficeAdmin"
                          disabled={cbsExistingUser.branchid !== "0100"}
                          onChange={(e) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              agentHeadOfficeAdminEnabled: e.target.checked,
                            }));
                          }}
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
            <table className="w-full text-sm font-[500]">
              <thead>
                <tr>
                  <th className={tableRowClassName} colSpan={4}>
                    <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                      To be completed by Admin
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th className={`${tableRowClassName} w-1/2`}>
                    Unit Head / Manager Operation / Head Of Branch{" "}
                  </th>
                  <th className={`${tableRowClassName} w-1/2`}>
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
                        required
                        type="text"
                        id="search-input"
                        name="search"
                        className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                  <td className={`${tableRowClassName} text-center`}>
                    {" "}
                    Core Banking Solution
                  </td>
                </tr>

                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong>Pending</strong>
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong>Pending</strong>
                  </td>
                </tr>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment:
                  </td>
                  <td className={`${tableRowClassName} text-center`}></td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-center">
              <input
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 p-5 m-5 overflow-auto rounded-xl bg-white shadow-[0_5px_10px_0px_gray]">
        "Please contact with CBS for Profile ID.."
      </div>
    );
  }
};

export default UserPermissionOrRole;
