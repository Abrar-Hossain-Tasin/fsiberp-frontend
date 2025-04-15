import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import AmountConverter from "./AmountConverter";
import "./style.css";

const UserPermissionOrRoleEdit = () => {
  const [currentForm, setCurrentForm] = useState({});
  const [previousForm, setPreviousForm] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [divSearchTerm, setDivSearchTerm] = useState("");
  const [divheaduserid, setDivheaduserid] = useState("");
  const [divheadusername, setDivheadusername] = useState("");
  const [filteredOptionsDiv, setFilteredOptionsDiv] = useState([]);
  const [showOptionsDiv, setShowOptionsDiv] = useState(false);
  const [eligibleUsersDiv, setEligibleUsersDiv] = useState(false);

  const [previousFormData, setPreviousFormData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [cbsExistingUser, setCbsExistingUser] = useState([]);
  const [proposedUniqueUserId, setproposedUniqueUserId] = useState("");
  const { userId, formId, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  const navigate = useNavigate();
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
        console.log(decryptedId);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const previous =
          data.find((item) => item.id === Math.min(...data.map((f) => f.id))) ||
          {};
        const current =
          data.find((item) => item.id === Math.max(...data.map((f) => f.id))) ||
          {};

        // setPreviousForm(previous);
        // setCurrentForm(current);

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
              ? current.transactionLimit?.[0] !== previous.transactionLimit?.[0]
              : current.transactionLimit?.[0],
          cashDebit:
            current.transactionLimit?.[0] !== null
              ? current.transactionLimit?.[0]
              : 0,
          cashCreditEnabled:
            data.length !== 1
              ? current.transactionLimit?.[1] !== previous.transactionLimit?.[1]
              : current.transactionLimit?.[1],
          cashCredit:
            current.transactionLimit?.[1] !== null
              ? current.transactionLimit?.[1]
              : 0,
          transferDebitEnabled:
            data.length !== 1
              ? current.transactionLimit?.[2] !== previous.transactionLimit?.[2]
              : current.transactionLimit?.[2],
          transferDebit:
            current.transactionLimit?.[2] !== null
              ? current.transactionLimit?.[2]
              : 0,
          transferCreditEnabled:
            data.length !== 1
              ? current.transactionLimit?.[3] !== previous.transactionLimit?.[3]
              : current.transactionLimit?.[3],
          transferCredit:
            current.transactionLimit?.[3] !== null
              ? current.transactionLimit?.[3]
              : 0,
          clearingDebitEnabled:
            data.length !== 1
              ? current.transactionLimit?.[4] !== previous.transactionLimit?.[4]
              : current.transactionLimit?.[4],
          clearingDebit:
            current.transactionLimit?.[4] !== null
              ? current.transactionLimit?.[4]
              : 0,
          clearingCreditEnabled:
            data.length !== 1
              ? current.transactionLimit?.[5] !== previous.transactionLimit?.[5]
              : current.transactionLimit?.[5],
          clearingCredit:
            current.transactionLimit?.[5] !== null
              ? current.transactionLimit?.[5]
              : 0,
          onlineDebitEnabled:
            data.length !== 1
              ? current.transactionLimit?.[6] !== previous.transactionLimit?.[6]
              : current.transactionLimit?.[6],
          onlineDebit:
            current.transactionLimit?.[6] !== null
              ? current.transactionLimit?.[6]
              : 0,
          onlineCreditEnabled:
            data.length !== 1
              ? current.transactionLimit?.[7] !== previous.transactionLimit?.[7]
              : current.transactionLimit?.[7],
          onlineCredit:
            current.transactionLimit?.[7] !== null
              ? current.transactionLimit?.[7]
              : 0,

          // Authorization limits
          authCashDebitEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[0] !==
                previous.authorizationLimit?.[0]
              : current.authorizationLimit?.[0],
          authCashDebit:
            current.authorizationLimit?.[0] !== null
              ? current.authorizationLimit?.[0]
              : 0,
          authCashCreditEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[1] !==
                previous.authorizationLimit?.[1]
              : current.authorizationLimit?.[1],
          authCashCredit:
            current.authorizationLimit?.[1] !== null
              ? current.authorizationLimit?.[1]
              : 0,
          authTransferDebitEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[2] !==
                previous.authorizationLimit?.[2]
              : current.authorizationLimit?.[2],
          authTransferDebit:
            current.authorizationLimit?.[2] !== null
              ? current.authorizationLimit?.[2]
              : 0,
          authTransferCreditEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[3] !==
                previous.authorizationLimit?.[3]
              : current.authorizationLimit?.[3],
          authTransferCredit:
            current.authorizationLimit?.[3] !== null
              ? current.authorizationLimit?.[3]
              : 0,
          authClearingDebitEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[4] !==
                previous.authorizationLimit?.[4]
              : current.authorizationLimit?.[4],
          authClearingDebit:
            current.authorizationLimit?.[4] !== null
              ? current.authorizationLimit?.[4]
              : 0,
          authClearingCreditEnabled:
            data.length !== 1
              ? current.authorizationLimit?.[5] !==
                previous.authorizationLimit?.[5]
              : current.authorizationLimit?.[5],
          authClearingCredit:
            current.authorizationLimit?.[5] !== null
              ? current.authorizationLimit?.[5]
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
        setNewBranchName(current.newBranchName);
        setPreviousBranchCode(current.previousBranchCode);
        setPreviousBranchName(current.previousBranchName);
        setUnitheaduserid(current.unitheaduserid);
        setUnitheadusername(current.unitheadusername);
        setDivheaduserid(current.divheaduserid);
        setDivheadusername(current.divheadusername);
        setproposedUniqueUserId(current.proposedUniqueUserId);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  const handleUpdate = async (e) => {
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
    ].forEach((item, index) => {
      const debitIndex = index * +2;
      const creditIndex = index * +2 + 1;
      if (formData[`${item.key}DebitEnabled`]) {
        transactionLimit.push(Number(formData[`${item.key}Debit`]));
        transactionType.push(`${item.label} Debit`);
      } else {
        transactionLimit.push(previousForm.transactionLimit?.[debitIndex]);
        transactionType.push(`${item.label} Debit`);
      }

      if (formData[`${item.key}CreditEnabled`]) {
        transactionLimit.push(Number(formData[`${item.key}Credit`]));
        transactionType.push(`${item.label} Credit`);
      } else {
        transactionLimit.push(previousForm.transactionLimit?.[creditIndex]);
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
    ].forEach((item, index) => {
      const debitIndex = index * +2;
      const creditIndex = index * +2 + 1;
      if (formData[`${item.key}DebitEnabled`]) {
        authorizationLimit.push(Number(formData[`${item.key}Debit`]));
        authorizationType.push(`${item.label} Debit`);
      } else {
        authorizationLimit.push(previousForm.authorizationLimit?.[debitIndex]);
        authorizationType.push(`${item.label} Debit`);
      }

      if (formData[`${item.key}CreditEnabled`]) {
        authorizationLimit.push(Number(formData[`${item.key}Credit`]));
        authorizationType.push(`${item.label} Credit`);
      } else {
        authorizationLimit.push(previousForm.authorizationLimit?.[creditIndex]);
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
      : previousForm.cashTellerLimit;
    // const cashTellerLimit = Number(formData.cashTellerLimit);

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
    // if (formData.generalBankingAuthorizationEnabled) {
    //   generalBankingManagement.push(
    //     "General Banking Authorization (For In-Charge)"
    //   );
    // } else {
    //   generalBankingManagement.push(null);
    // }
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
    // if (formData.investmentAuthorizationEnabled) {
    //   investmentManagement.push("Investment Authorization (For In-Charge)");
    // } else {
    //   investmentManagement.push(null);
    // }

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

    // Log collected data for debugging
    formData;
    const decryptedId = decryptId(id);

    // Submit to API
    try {
      const response = await fetch(
        `${Base_api}/api/cbs-user-permission/update/${decryptedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            unitheaduserid,
            unitheadusername,
            divheaduserid,
            divheadusername,
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
            proposedUniqueUserId,
          }),
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
      console.error("Error submitting data:", error);
    }
  };

  const tableRowClassName = "border border-black px-4 py-2";
  const inputClassName = "border rounded p-1 bg-slate-100";

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
    <form onSubmit={handleUpdate} className="m-auto">
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
                      value={proposedUniqueUserId}
                      placeholder="Proposed Unique User ID"
                      onChange={(e) => setproposedUniqueUserId(e.target.value)}
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
                      id="search-input-new-branch"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Here!"
                      value={searchNewBranchTerm}
                      onChange={handleNewBranchInputChange}
                    />
                    {showNewBranchOptions && (
                      <ul className="absolute w-full text-center bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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
                      id="search-input-previous-branch"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Previous Branch Here!"
                      value={searchPreviousBranchTerm}
                      onChange={handlePreviousBranchInputChange}
                    />
                    {showPreviousBranchOptions && (
                      <ul className="absolute w-full text-center bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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
                      className="text-[#3b3838] border-[1px] border-black p-1 ml-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className={tableRowClassName}>Previous Branch Code</td>
                <td className={`${tableRowClassName} pl-5`}>
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
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        cashDebitEnabled: isChecked,
                        // cashDebit: isChecked ? prevData.cashDebit : "", // Clear input if unchecked
                      }));
                    }}
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
                      formData.cashDebitEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.cashDebit !==
                            previousForm.transactionLimit?.[0] &&
                          formData.cashDebitEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.cashDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Debit`}
                    disabled={!formData.cashDebitEnabled}
                    value={
                      formData.cashDebitEnabled
                        ? formData.cashDebit
                        : previousForm.transactionLimit?.[0]
                    } // Bind the input value to formData.cashDebit
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        cashDebit: Number(e.target.value),
                      }));
                    }}
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
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        cashCreditEnabled: isChecked,
                        // cashCredit: isChecked ? prevData.cashCredit : "", // Clear input if unchecked
                      }));
                    }}
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
                      formData.cashCreditEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.cashCredit !==
                            previousForm.transactionLimit?.[1] &&
                          formData.cashCreditEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.cashCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Cash Credit`}
                    disabled={!formData.cashCreditEnabled}
                    value={
                      formData.cashCreditEnabled
                        ? formData.cashCredit
                        : previousForm.transactionLimit?.[1]
                    } // Bind the input value to formData.cashCredit
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        cashCredit: Number(e.target.value),
                      }));
                    }}
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
                          // transferDebit: isChecked
                          //   ? prevData.transferDebit
                          //   : "", // Clear input if unchecked
                          clearingDebitEnabled: newClearingDebitEnabled, // Update clearingDebitEnabled
                          // clearingDebit: newClearingDebitEnabled
                          //   ? prevData.clearingDebit
                          //   : "", // Clear clearingDebit if unchecked
                          onlineDebitEnabled: newOnlineDebitEnabled, // Update onlineDebitEnabled
                          // onlineDebit: newOnlineDebitEnabled
                          //   ? prevData.onlineDebit
                          //   : "", // Clear onlineDebit if unchecked
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
                    className={`${inputClassName} w-full ${
                      formData.transferDebitEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.transferDebit !==
                            previousForm.transactionLimit?.[2] &&
                          formData.transferDebitEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.transferDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Transfer Debit`}
                    disabled={!formData[`transferDebitEnabled`]}
                    value={
                      formData.transferDebitEnabled
                        ? formData.transferDebit
                        : previousForm.transactionLimit?.[2]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        transferDebit: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.transferDebit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        transferDebit: value,
                      }))
                    }
                    amountInWords={transferDebitInWords}
                    setAmountInWords={setTransferDebitInWords}
                    checkAmountInWords={transferDebitInWords}
                    setCheckAmountInWords={setTransferDebitInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.transactionLimit?.[2] || 0}
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
                          // transferCredit: isChecked
                          //   ? prevData.transferCredit
                          //   : "", // Clear input if unchecked
                          clearingCreditEnabled: newClearingCreditEnabled, // Update clearingCreditEnabled
                          // clearingCredit: newClearingCreditEnabled
                          //   ? prevData.clearingCredit
                          //   : "", // Clear clearingCredit if unchecked
                          onlineCreditEnabled: newOnlineCreditEnabled, // Update onlineCreditEnabled
                          // onlineCredit: newOnlineCreditEnabled
                          //   ? prevData.onlineCredit
                          //   : "", // Clear onlineCredit if unchecked
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
                    className={`${inputClassName} w-full ${
                      formData.transferCreditEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.transferCredit !==
                            previousForm.transactionLimit?.[3] &&
                          formData.transferCreditEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.transferCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Transfer Credit`}
                    disabled={!formData[`transferCreditEnabled`]}
                    value={
                      formData.transferCreditEnabled
                        ? formData.transferCredit
                        : previousForm.transactionLimit?.[3]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        [`transferCredit`]: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.transferCredit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        transferCredit: value,
                      }))
                    }
                    amountInWords={transferCreditInWords}
                    setAmountInWords={setTransferCreditInWords}
                    checkAmountInWords={transferCreditInWords}
                    setCheckAmountInWords={setTransferCreditInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.transactionLimit?.[3] || 0}
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
                            // [`${item.key}Debit`]: isChecked
                            //   ? prevData[`${item.key}Debit`]
                            //   : "",
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
                            ? "border-black outline-black bg-white"
                            : "bg-slate-300 border-black"
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Debit`] !==
                                previousForm.transactionLimit?.[debitIndex] &&
                              formData[`${item.key}DebitEnabled`]
                              ? "border-black outline-black activeColor"
                              : "bg-slate-300 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Debit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Debit`}
                        disabled={!formData[`${item.key}DebitEnabled`]}
                        value={
                          formData[`${item.key}DebitEnabled`]
                            ? formData[`${item.key}Debit`]
                            : previousForm.transactionLimit?.[debitIndex]
                        }
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Debit`]: Number(e.target.value),
                          }));
                        }}
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
                          item.key === "clearing"
                            ? clearingDebitInWords
                            : item.key === "online"
                            ? onlineDebitInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "clearing"
                            ? setClearingDebitInWords
                            : item.key === "online"
                            ? setOnlineDebitInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "clearing"
                            ? clearingDebitInWords
                            : item.key === "online"
                            ? onlineDebitInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "clearing"
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
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}CreditEnabled`]: isChecked,
                            // Only update transferCreditEnabled if the current checkbox is checked
                            [`transferCreditEnabled`]: isChecked
                              ? isChecked
                              : prevData.transferCreditEnabled,
                            // [`${item.key}Credit`]: isChecked
                            //   ? prevData[`${item.key}Credit`]
                            //   : "",
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
                            ? "border-black outline-black bg-white"
                            : "bg-slate-300 border-black"
                        } ${
                          previousForm !== 1
                            ? formData[`${item.key}Credit`] !==
                                previousForm.transactionLimit?.[creditIndex] &&
                              formData[`${item.key}CreditEnabled`]
                              ? "border-black outline-black activeColor"
                              : "bg-slate-300 border-black " // Add a different background when disabled for clarity
                            : formData[`${item.key}Credit`]
                            ? "border-black outline-black activeColor"
                            : ""
                        }`}
                        placeholder={`${item.label} Credit`}
                        disabled={!formData[`${item.key}CreditEnabled`]}
                        value={
                          formData[`${item.key}CreditEnabled`]
                            ? formData[`${item.key}Credit`]
                            : previousForm.transactionLimit?.[creditIndex]
                        }
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            [`${item.key}Credit`]: Number(e.target.value),
                          }));
                        }}
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
                          item.key === "clearing"
                            ? clearingCreditInWords
                            : item.key === "online"
                            ? onlineCreditInWords
                            : ""
                        }
                        setAmountInWords={
                          item.key === "clearing"
                            ? setClearingCreditInWords
                            : item.key === "online"
                            ? setOnlineCreditInWords
                            : null
                        }
                        checkAmountInWords={
                          item.key === "clearing"
                            ? clearingCreditInWords
                            : item.key === "online"
                            ? onlineCreditInWords
                            : ""
                        }
                        setCheckAmountInWords={
                          item.key === "clearing"
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
                    checked={formData[`authCashDebitEnabled`]}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        authCashDebitEnabled: isChecked,
                        // authCashDebit: isChecked ? prevData.authCashDebit : "", // Clear input if unchecked
                      }));
                    }}
                  />
                  <label htmlFor={`authCashDebit`} className="ml-1">
                    Cash Debit
                  </label>
                </td>
                <td className={`${tableRowClassName} pb-1 w-[31%]`}>
                  <input
                    required
                    type="text"
                    className={`${inputClassName} w-full ${
                      formData.authCashDebitEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
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
                    disabled={!formData[`authCashDebitEnabled`]}
                    value={
                      formData.authCashDebitEnabled
                        ? formData.authCashDebit
                        : previousForm.authorizationLimit?.[0]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        [`authCashDebit`]: Number(e.target.value),
                      }));
                    }}
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
                    checked={formData[`authCashCreditEnabled`]}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        authCashCreditEnabled: isChecked,
                        // authCashCredit: isChecked
                        //   ? prevData.authCashCredit
                        //   : "", // Clear input if unchecked
                      }));
                    }}
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
                      formData.authCashCreditEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
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
                    disabled={!formData[`authCashCreditEnabled`]}
                    value={
                      formData.authCashCreditEnabled
                        ? formData.authCashCredit
                        : previousForm.authorizationLimit?.[1]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        [`authCashCredit`]: Number(e.target.value),
                      }));
                    }}
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
              <tr>
                <td className={tableRowClassName}>
                  <input
                    type="checkbox"
                    id={`authTransferDebit`}
                    checked={formData[`authTransferDebitEnabled`]}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        authTransferDebitEnabled: isChecked,
                        // authTransferDebit: isChecked
                        //   ? prevData.authTransferDebit
                        //   : "", // Clear input if unchecked
                      }));
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
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.authTransferDebit !==
                          previousForm.authorizationLimit?.[2]
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.authTransferDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Transfer Debit`}
                    disabled={!formData[`authTransferDebitEnabled`]}
                    value={
                      formData.authTransferDebitEnabled
                        ? formData.authTransferDebit
                        : previousForm.authorizationLimit?.[2]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        [`authTransferDebit`]: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.authTransferDebit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authTransferDebit: value,
                      }))
                    }
                    amountInWords={authTransferDebitInWords}
                    setAmountInWords={setAuthTransferDebitInWords}
                    checkAmountInWords={authTransferDebitInWords}
                    setCheckAmountInWords={setAuthTransferDebitInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[2] || 0}
                  </p>
                </td>
                <td className={tableRowClassName}>
                  <input
                    type="checkbox"
                    id={`authTransferCredit`}
                    checked={formData[`authTransferCreditEnabled`]}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        authTransferCreditEnabled: isChecked,
                        // authTransferCredit: isChecked
                        //   ? prevData.authTransferCredit
                        //   : "", // Clear input if unchecked
                      }));
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
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.authTransferCredit !==
                          previousForm.authorizationLimit?.[3]
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.authTransferCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Transfer Credit`}
                    disabled={!formData[`authTransferCreditEnabled`]}
                    value={
                      formData.authTransferCreditEnabled
                        ? formData.authTransferCredit
                        : previousForm.authorizationLimit?.[3]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        [`authTransferCredit`]: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.authTransferCredit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authTransferCredit: value,
                      }))
                    }
                    amountInWords={authTransferCreditInWords}
                    setAmountInWords={setAuthTransferCreditInWords}
                    checkAmountInWords={authTransferCreditInWords}
                    setCheckAmountInWords={setAuthTransferCreditInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[3] || 0}
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
                        // authClearingDebit: isChecked
                        //   ? prevData.authClearingDebit
                        //   : "", // Clear input if unchecked
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
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.authClearingDebit !==
                            previousForm.authorizationLimit?.[4] &&
                          formData.authClearingDebitEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.authClearingDebit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Clearing Debit`}
                    disabled={!formData[`authClearingDebitEnabled`]}
                    value={
                      formData.authClearingDebitEnabled
                        ? formData.authClearingDebit
                        : previousForm.authorizationLimit?.[4]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        authClearingDebit: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.authClearingDebit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authClearingDebit: value,
                      }))
                    }
                    amountInWords={authClearingDebitInWords}
                    setAmountInWords={setAuthClearingDebitInWords}
                    checkAmountInWords={authClearingDebitInWords}
                    setCheckAmountInWords={setAuthClearingDebitInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[4] || 0}
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
                        // authClearingCredit: isChecked
                        //   ? prevData.authClearingCredit
                        //   : "", // Clear input if unchecked
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
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } ${
                      previousForm !== 1
                        ? formData.authClearingCredit !==
                            previousForm.authorizationLimit?.[5] &&
                          formData.authClearingCreditEnabled
                          ? "border-black outline-black activeColor"
                          : "bg-slate-300 border-black" // Add a different background when disabled for clarity
                        : formData.authClearingCredit
                        ? "border-black outline-black activeColor"
                        : ""
                    }`}
                    placeholder={`Clearing Credit`}
                    disabled={!formData[`authClearingCreditEnabled`]}
                    value={
                      formData.authClearingCreditEnabled
                        ? formData.authClearingCredit
                        : previousForm.authorizationLimit?.[5]
                    }
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        authClearingCredit: Number(e.target.value),
                      }));
                    }}
                  />
                  <AmountConverter
                    amount={formData.authClearingCredit}
                    setAmount={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        authClearingCredit: value,
                      }))
                    }
                    amountInWords={authClearingCreditInWords}
                    setAmountInWords={setAuthClearingCreditInWords}
                    checkAmountInWords={authClearingCreditInWords}
                    setCheckAmountInWords={setAuthClearingCreditInWords}
                  />
                  <p className="text-xs text-red-800 text-right">
                    Previous Limit: {previousForm.authorizationLimit?.[5] || 0}
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
                <td className={`${tableRowClassName} pb-1 w-[19%]`}>
                  <input
                    type="checkbox"
                    id="cashTellerLimit"
                    checked={formData.cashTellerLimitEnabled}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prevData) => ({
                        ...prevData,
                        cashTellerLimitEnabled: isChecked,
                        // cashTellerLimit: isChecked
                        //   ? prevData.cashTellerLimit
                        //   : "", // Clear input if unchecked
                      }));
                    }}
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
                      formData.cashTellerLimitEnabled
                        ? "border-black outline-black bg-white"
                        : "bg-slate-300 border-black"
                    } 
                    ${
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
                    value={
                      formData.cashTellerLimitEnabled
                        ? formData.cashTellerLimit
                        : previousForm.cashTellerLimit
                    }
                    disabled={!formData.cashTellerLimitEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        cashTellerLimit: Number(e.target.value),
                      }));
                    }}
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
                    id="cashTeller"
                    checked={formData.cashTellerEnabled}
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
                    checked={formData.cashVaultTellerEnabled}
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
                    checked={formData.generalBankingOperationEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        generalBankingOperationEnabled: e.target.checked,
                      }));
                    }}
                  />
                  <label htmlFor="generalBankingOperation" className="ml-1">
                    General Banking Operation
                    {/* (For Officers) */}
                  </label>
                  {/* <br />
                  <input
                    type="checkbox"
                    id="generalBankingAuthorization"
                    checked={formData.generalBankingAuthorizationEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        generalBankingAuthorizationEnabled: e.target.checked,
                      }));
                    }}
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
                    checked={formData.creditCardRoleEnabled}
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
                    checked={formData.investmentOperationEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        investmentOperationEnabled: e.target.checked,
                      }));
                    }}
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
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        investmentAuthorizationEnabled: e.target.checked,
                      }));
                    }}
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
                    checked={formData.forNonADBranchEnabled}
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
                    checked={formData.generalReportEnabled}
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
                    id="anyBranchReport"
                    checked={formData.anyBranchReportEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        anyBranchReportEnabled: e.target.checked,
                      }));
                    }}
                    className=" ml-5"
                  />
                  <label htmlFor="anyBranchReport" className="ml-1">
                    Any Branch Report / Remote Branch Report
                  </label>
                  <input
                    type="checkbox"
                    id="affairsReport"
                    checked={formData.affairsReportEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        affairsReportEnabled: e.target.checked,
                      }));
                    }}
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
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        headOfficeReportEnabled: e.target.checked,
                      }));
                    }}
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
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        branchUserEnabled: e.target.checked,
                      }));
                    }}
                    className=" ml-5"
                  />
                  <label htmlFor="branchUser" className="ml-1">
                    Branch User
                  </label>
                  <input
                    type="checkbox"
                    id="headOfficeAdmin"
                    checked={formData.headOfficeAdminEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        headOfficeAdminEnabled: e.target.checked,
                      }));
                    }}
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
                        checked={formData.agentBranchUserEnabled}
                        className=" ml-5"
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
                        checked={formData.agentHeadOfficeAdminEnabled}
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
                          disabled
                          // disabled={
                          //   userid !== currentForm.unitheaduserid ||
                          //   (userid === currentForm.unitheaduserid &&
                          //     currentForm.unitheadstatus === "Accepted")
                          //     ? true
                          //     : false
                          // }
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
                      Comment: <strong>{currentForm.bcdstatus}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.imrdstatus}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.investmentOperationEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.iadstatus}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                  {formData.forADBranchEnabled ||
                  formData.forNonADBranchEnabled ? (
                    <td className={`${tableRowClassName} text-center`}>
                      Comment: <strong>{currentForm.idstatus}</strong>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>

        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    </form>
  );
};

export default UserPermissionOrRoleEdit;
