import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Dynamictable from "../../../component/Dynamictable";
import { Base_api } from "../../../utils/api/Base_api";
const UserPermissionOrRole = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [branches, setBranches] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [filteredBranches1, setFilteredBranches1] = useState([]);
  const [selectedBranchCode1, setSelectedBranchCode1] = useState("");

  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredBranches2, setFilteredBranches2] = useState([]);
  const [selectedBranchCode2, setSelectedBranchCode2] = useState(""); // To store the selected branch code

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cbs-user-permission/branches"
        );
        const data = await response.json();
        setBranches(data); // Assuming data is an array of branch objects
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    // Update filtered branches based on search term for first input
    if (searchTerm1) {
      const filtered = branches.filter((branch) =>
        branch.branchname.toLowerCase().includes(searchTerm1.toLowerCase())
      );
      setFilteredBranches1(filtered);
    } else {
      setFilteredBranches1([]);
    }
  }, [searchTerm1, branches]);

  useEffect(() => {
    // Update filtered branches based on search term for second input
    if (searchTerm2) {
      const filtered = branches.filter((branch) =>
        branch.branchname.toLowerCase().includes(searchTerm2.toLowerCase())
      );
      setFilteredBranches2(filtered);
    } else {
      setFilteredBranches2([]);
    }
  }, [searchTerm2, branches]);

  const handleSuggestionClick1 = (branch) => {
    setSearchTerm1(branch.branchname); // Set the input value to the selected branch name for first input
    setSelectedBranchCode1(branch.branchcode); // Set the branch code for the selected branch
    setFilteredBranches1([]); // Clear suggestions
  };

  const handleSuggestionClick2 = (branch) => {
    setSearchTerm2(branch.branchname); // Set the input value to the selected branch name for second input
    setSelectedBranchCode2(branch.branchcode); // Set the branch code for the selected branch
    setFilteredBranches2([]); // Clear suggestions
  };

  const handleInputChange1 = (e) => {
    setSearchTerm1(e.target.value); // Update search term for first input
    setFilteredBranches1([]); // Clear suggestions if input changes
  };

  const handleInputChange2 = (e) => {
    setSearchTerm2(e.target.value); // Update search term for second input
    setFilteredBranches2([]); // Clear suggestions if input changes
  };

  const inputClassName =
    "text-[#514f4f] border-2 border-[#d2d2e4] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]";

  const tableRowClassName = "border px-4 py-2 border-black";

  const [formData, setFormData] = useState({
    // Initial state for both tables
    cashDebit: "",
    cashDebitEnabled: false,
    cashCredit: "",
    cashCreditEnabled: false,
    transferDebit: "",
    transferDebitEnabled: false,
    transferCredit: "",
    transferCreditEnabled: false,
    clearingDebit: "",
    clearingDebitEnabled: false,
    clearingCredit: "",
    clearingCreditEnabled: false,
    // Add fields for Authorization Limit
    authCashDebit: "",
    authCashDebitEnabled: false,
    authCashCredit: "",
    authCashCreditEnabled: false,
    authTransferDebit: "",
    authTransferDebitEnabled: false,
    authTransferCredit: "",
    authTransferCreditEnabled: false,
    authClearingDebit: "",
    authClearingDebitEnabled: false,
    authClearingCredit: "",
    authClearingCreditEnabled: false,
    //Add fields for Cash Management
    cashTellerLimit: "",
    cashTellerLimitEnabled: false,
    cashTellerEnabled: false,
    cashVaultTellerEnabled: false,
    //Add fields for GENERAL BANKING MANAGEMENT
    generalBankingOperationEnabled: false,
    generalBankingAuthorizationEnabled: false,
    smsServiceEnabled: false,
    creditCardRoleEnabled: false,

    investmentOperationEnabled: false,
    investmentAuthorizationEnabled: false,
    forADBranchEnabled: false,
    forNonADBranchEnabled: false,
    generalReportEnabled: false,
    anyBranchReportEnabled: false,
    affairsReportEnabled: false,
    headOfficeReportEnabled: false,
    branchUserEnabled: false,
    headOfficeAdminEnabled: false,
    branchDayCloseEnabled: false,
    agentBranchUserEnabled: false,
    agentHeadOfficeAdminEnabled: false,

    newBranchName: "",
    newBranchCode: "",
    previousBranchName: "",
    previousBranchCode: "",
    transferDate: "",

    transactionType: [
      "Cash Debit",
      "Cash Credit",
      "Transfer Debit",
      "Transfer Credit",
    ],
    transactionLimit: [],

    authorizationType: [
      "Cash Debit",
      "Cash Credit",
      "Transfer Debit",
      "Transfer Credit",
    ],
    authorizationLimit: [100000, 100000, 400000, 400000],
    cashTellerLimit: 90000000,
    tellerType: ["Cash Teller", "Cash Vault Teller"],
    generalBankingManagement: [
      "General Banking Operation (For Officers)",
      "General Banking Authorization (For In-Charge)",
      "SMS Service",
      "Credit Card Role",
    ],
    investmentManagement: [
      "Investment Operation (For Officers)",
      "Investment Authorization (For In-Charge)",
    ],
    tradeFinanceManagement: [
      "General Operation For AD Branch",
      "Authorization (For In-Charge) For AD Branch",
    ],
    reports: [
      "Branch Level General Reports (By Defaults)",
      "Branch Level Administrative Reports (For Branch/Sub-Branch/Divisional In-Charge)",
    ],
    fsibCloudAdminPanel: ["Branch Administrator", "Head Office Administrator"],
    branchDayClose: ["Branch Day Close/Open"],
    agentBankingModule: ["branch user", "head office admin"],
    unitheaduserid: "05940",
    unitheadusername: "Md. Ishak",
    unitheadstatus: "Pending",
    implementedbystatus: "Pending",
    implementedbydeptid: 7,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   (formData);
  // try {
  //   const response = await fetch(
  //     `${Base_api}/api/cbs-user-permission/save/${userid}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }

  //   const result = await response.json();
  //   ("Form submitted successfully:", result);
  //   // Optionally reset form or show success message
  // } catch (error) {
  //   console.error("Error submitting form:", error);
  // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionLimit = [];
    const transactionType = [];

    // Collect values based on formData
    [
      { key: "cash", label: "Cash" },
      { key: "transfer", label: "Transfer" },
      { key: "clearing", label: "Clearing" },
      { key: "online", label: "Online" },
    ].forEach((item) => {
      // Check if debit is enabled and add to transactionLimit
      if (formData[`${item.key}DebitEnabled`]) {
        transactionLimit.push(formData[`${item.key}Debit`]);
        transactionType.push(`${item.label} Debit`); // Add the type as well
      }
      // Check if credit is enabled and add to transactionLimit
      if (formData[`${item.key}CreditEnabled`]) {
        transactionLimit.push(formData[`${item.key}Credit`]);
        transactionType.push(`${item.label} Credit`); // Add the type as well
      }
    });

    // Submit to API
    try {
      const response = await fetch(
        `${Base_api}/api/cbs-user-permission/save/${userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionLimit, transactionType }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      "Success:", data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <section className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 h-[450vh]">
        {/* header_title */}
        <div className="m-5 text-center">
          <h3 className="font-bold text-xl">
            CBS-User Permission/Role (“BankUltimus”- CBS Systems)
          </h3>
          <mark className="font-bold text-xl underline text-">
            (Please tick mark all the relevant tick box to facilitate the
            mentioned option)
          </mark>
        </div>
        {/* header_title */}

        {/* user_details */}
        <div className="mx-10 w-[716px]">
          <div className="mt-4">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md">
              User Details
            </h4>
          </div>
          <Dynamictable userid={userid} />
        </div>
        {/* user_details */}

        <div className="mt-4 w-[716px] mx-10">
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md">
            To be completed by respective Requestor
          </h4>
        </div>

        <section className="mt-4 w-[716px] mx-10">
          <div className="flex gap-1 mb-5">
            {/* update_user_info */}
            <div className="">
              <table className="w-full">
                <tbody>
                  <tr className="text-sm">
                    <th className="border px-2 py-2 border-black">
                      Request For
                    </th>
                    <th className="border px-2 py-2 border-black">
                      <input type="checkbox" id="update_user" />
                      <label htmlFor="update_user" className="ml-1">
                        Update User Permission
                      </label>
                    </th>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="">Unique User ID:</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="newBranchName"
                        // value={formData.newBranchName}
                        // onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="">User Name:</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="newBranchID"
                        // value={formData.newBranchName}
                        // onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="newBranchName">New Branch Name</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="branchSearch1"
                        placeholder="Search branches..."
                        value={searchTerm1}
                        onChange={handleInputChange1} // Use the new handler for first input
                      />
                      {searchTerm1 && filteredBranches1.length > 0 && (
                        <ul className="border border-black mt-1">
                          {filteredBranches1.map((branch) => (
                            <li
                              key={branch.branchcode}
                              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSuggestionClick1(branch)}
                            >
                              {branch.branchname}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="newBranchCode">New Branch Code</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="branchID1"
                        value={selectedBranchCode1} // Bind the input to the selected branch code
                        readOnly // Make it read-only if you don't want to allow manual editing
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="previousBranchName">
                        Previous Branch Name
                      </label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="previousBranchName"
                        value={formData.previousBranchName}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="previousBranchCode">
                        Previous Branch Code
                      </label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="previousBranchCode"
                        value={formData.previousBranchCode}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="transferDate">Transfer Date</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="date"
                        className={inputClassName}
                        id="transferDate"
                        value={formData.transferDate}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Add other fields as necessary */}
                </tbody>
              </table>
            </div>
            {/* update_user_info */}

            {/* New User Info */}
            <div className="">
              <table className="w-full">
                <tbody>
                  <tr className="text-sm">
                    <th className="border px-2 py-2 border-black">
                      Request For
                    </th>
                    <th className="border px-2 py-2 border-black">
                      <input type="checkbox" id="update_user" />
                      <label htmlFor="update_user" className="ml-1">
                        New User Informationn
                      </label>
                    </th>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="">Branch Name:</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="branchSearch2"
                        placeholder="Search branches..."
                        value={searchTerm2}
                        onChange={handleInputChange2} // Use the new handler for second input
                      />
                      {searchTerm2 && filteredBranches2.length > 0 && (
                        <ul className="border border-black mt-1">
                          {filteredBranches2.map((branch) => (
                            <li
                              key={branch.branchcode}
                              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSuggestionClick2(branch)}
                            >
                              {branch.branchname}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    {/* <td className="border px-2 py-2 border-black">
                      Branch ID:
                    </td> */}
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="">Branch ID:</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="branchID2"
                        value={selectedBranchCode2} // Bind the input to the selected branch code
                        readOnly // Make it read-only if you don't want to allow manual editing
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="">Profile ID:</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="newProfileID"
                        placeholder="Profile ID"
                        // value={formData.newBranchName}
                        // onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="userName">User Name</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Enter User Name"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="userDesignation">User Designation</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="userDesignation"
                        value={formData.userDesignation}
                        onChange={handleChange}
                        placeholder="Enter User Designation"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="officialEmail">Official Email</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="email"
                        className={inputClassName}
                        id="officialEmail"
                        value={formData.officialEmail}
                        onChange={handleChange}
                        placeholder="Enter Official Email"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="contactNumber">Contact Number</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="tel"
                        className={inputClassName}
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter Contact Number"
                      />
                    </td>
                  </tr>

                  {/* <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="unitheadusername">
                        Unit Head Username
                      </label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <input
                        type="text"
                        className={inputClassName}
                        id="unitheadusername"
                        value={formData.unitheadusername}
                        onChange={handleChange}
                        placeholder="Enter Unit Head Username"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="border px-2 py-2 border-black">
                      <label htmlFor="unitheadstatus">Unit Head Status</label>
                    </td>
                    <td className="border px-2 py-2 border-black">
                      <select
                        className={inputClassName}
                        id="unitheadstatus"
                        value={formData.unitheadstatus}
                        onChange={handleChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>

          {/* branch_transfer */}

          <div className="my-5 hidden">
            <table className="w-full">
              <tr className="">
                <th className={tableRowClassName} colSpan={5}>
                  If transferred from another Branch/Sub-Branch/Head Office
                </th>
              </tr>

              <tr>
                <th className={tableRowClassName}>New Branch Name</th>
                <th className={tableRowClassName}>New Branch Code</th>
                <th className={tableRowClassName}>Prev. Branch Name</th>
                <th className={tableRowClassName}>Prev. Branch Code</th>
                <th className={tableRowClassName}>Transfer Date</th>
              </tr>

              <tr>
                <td className={`${tableRowClassName} text-center`}>
                  <input
                    rows="1"
                    cols="30"
                    type="text"
                    className={`${inputClassName} w-full`}
                    placeholder="New Branch Name"
                  />
                </td>

                <td className={`${tableRowClassName} text-center`}>
                  <input
                    rows="1"
                    cols="30"
                    type="text"
                    className={`${inputClassName} w-full`}
                    placeholder="New Branch Code"
                  />
                </td>

                <td className={`${tableRowClassName} text-center`}>
                  <input
                    rows="1"
                    cols="30"
                    type="text"
                    className={`${inputClassName} w-full`}
                    placeholder="Prev. Branch Name"
                  />
                </td>

                <td className={`${tableRowClassName} text-center`}>
                  <input
                    rows="1"
                    cols="30"
                    type="text"
                    className={`${inputClassName} w-full`}
                    placeholder="Prev. Branch Code"
                  />
                </td>

                <td className={`${tableRowClassName} text-center`}>
                  <input
                    rows="1"
                    cols="30"
                    type="date"
                    className={`${inputClassName} w-full`}
                    placeholder="Transfer Date"
                  />
                </td>
              </tr>
            </table>
          </div>

          {/* branch_transfer */}

          {/* Transaction_limit_start */}

          <div>
            <table className="w-full">
              <tr className="">
                <th className={tableRowClassName} colSpan={4}>
                  TRANSACTION LIMIT
                </th>
              </tr>

              {[
                { label: "Cash", key: "cash" },
                { label: "Transfer", key: "transfer" },
                { label: "Clearing", key: "clearing" },
                { label: "Online", key: "online" },
              ].map((item, index) => (
                <tr key={index}>
                  {/* Debit Column */}
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`${item.key}Debit`}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}DebitEnabled`]: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor={`${item.key}Debit`} className="ml-1">
                      {item.label} Debit
                    </label>
                  </td>

                  <td className={tableRowClassName}>
                    <input
                      type="text"
                      className={`${inputClassName} w-full`}
                      placeholder={`${item.label} Debit`}
                      disabled={!formData[`${item.key}DebitEnabled`]}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}Debit`]: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  {/* Credit Column */}
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`${item.key}Credit`}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}CreditEnabled`]: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor={`${item.key}Credit`} className="ml-1">
                      {item.label} Credit
                    </label>
                  </td>

                  <td className={tableRowClassName}>
                    <input
                      type="text"
                      className={`${inputClassName} w-full`}
                      placeholder={`${item.label} Credit`}
                      disabled={!formData[`${item.key}CreditEnabled`]}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}Credit`]: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>

          {/* Transaction_limit_end */}

          {/* Authorization_limit_start */}

          <div className="mt-2">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  Authorization Limit
                </th>
              </tr>

              {[
                { label: "Cash", key: "authCash" },
                { label: "Transfer", key: "authTransfer" },
                { label: "Clearing", key: "authClearing" },
              ].map((item, index) => (
                <tr key={index}>
                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`${item.key}Debit`}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}DebitEnabled`]: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor={`${item.key}Debit`} className="ml-1">
                      {item.label} Debit
                    </label>
                  </td>

                  <td className={tableRowClassName}>
                    <textarea
                      rows="1"
                      cols="30"
                      className={`${inputClassName} w-full`}
                      placeholder={`${item.label} Debit`}
                      disabled={!formData[`${item.key}DebitEnabled`]}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}Debit`]: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td className={tableRowClassName}>
                    <input
                      type="checkbox"
                      id={`${item.key}Credit`}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}CreditEnabled`]: e.target.checked,
                        }));
                      }}
                    />
                    <label htmlFor={`${item.key}Credit`} className="ml-1">
                      {item.label} Credit
                    </label>
                  </td>

                  <td className={tableRowClassName}>
                    <textarea
                      rows="1"
                      cols="30"
                      className={`${inputClassName} w-full`}
                      placeholder={`${item.label} Credit`}
                      disabled={!formData[`${item.key}CreditEnabled`]}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          [`${item.key}Credit`]: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>

          {/* Authorization_limit_end */}

          {/* cash_management_start */}

          <div>
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  Cash Management
                </th>
              </tr>

              <tr>
                <td className={tableRowClassName}>
                  <input
                    type="checkbox"
                    id="cashTellerLimit"
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        cashTellerLimitEnabled: e.target.checked,
                      }));
                    }}
                  />
                  <label htmlFor="cashTellerLimit" className="ml-1">
                    Cash Teller Limit
                  </label>
                </td>

                <td className={tableRowClassName}>
                  <textarea
                    rows="1"
                    cols="30"
                    className={`${inputClassName} w-full`}
                    placeholder="Cash Teller Limit"
                    disabled={!formData.cashTellerLimitEnabled}
                    onChange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        cashTellerLimit: e.target.value,
                      }));
                    }}
                  />
                </td>

                <td className={tableRowClassName}>Teller Type</td>
                <td className={tableRowClassName}>
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
            </table>
          </div>

          {/* cash_management_end */}

          {/* gb_management_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  GENERAL BANKING MANAGEMENT
                </th>
              </tr>

              <tr>
                <td className={tableRowClassName}>
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
                  <label htmlFor="generalBankingAuthorization" className="ml-1">
                    General Banking Authorization (For In-Charge)
                  </label>
                </td>

                <td className={tableRowClassName}>
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
            </table>
          </div>
          {/* gb_management_end */}

          {/* invest_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  INVESTMENT MANAGEMENT
                </th>
              </tr>

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
                    Investment Authorization (For In-Charge)
                  </label>
                </td>
              </tr>
            </table>
          </div>
          {/* invest_end */}

          {/* trade_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  TRADE FINANCE MANAGEMENT
                </th>
              </tr>

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
            </table>
          </div>
          {/* trade_end */}

          {/* report_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  Reports
                </th>
              </tr>

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
            </table>
          </div>
          {/* report_end */}

          {/* cloud_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  FSIBL CLOUD Admin. Panel
                </th>
              </tr>

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
            </table>
          </div>
          {/* cloud_end */}

          {/* day_close_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  Branch Day Close
                </th>
              </tr>

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
            </table>
          </div>
          {/* day_close_end */}

          {/* agent_banking_start */}
          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName} colSpan={4}>
                  Agent Banking Module (nCore365)
                </th>
              </tr>

              <tr>
                <td className={`${tableRowClassName} text-center`}>
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
                  <input
                    type="checkbox"
                    id="agentHeadOfficeAdmin"
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
                </td>
              </tr>
            </table>
          </div>
          {/* agent_banking_end */}

          <div className="mt-4">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md">
              To Be Completed By Admin
            </h4>
          </div>

          <div className="mt-5">
            <table className="w-full">
              <tr>
                <th className={tableRowClassName}>
                  Unit Head / Manager Operation / Head Of Branch
                </th>
                <th className={tableRowClassName}>Implemented By</th>
              </tr>

              <tr className="text-center">
                <td className={tableRowClassName}>Farhan</td>
                <td className={tableRowClassName}>Farhan</td>
              </tr>

              <tr className="text-center">
                <td className={tableRowClassName}>
                  Status <strong>Pending</strong>{" "}
                </td>
                <td className={tableRowClassName}>
                  Status <strong>Pending</strong>{" "}
                </td>
              </tr>

              <tr className="text-center">
                <td className={tableRowClassName}>
                  Comment: <strong>Pending</strong>{" "}
                </td>
                <td className={tableRowClassName}>
                  Comment: <strong>Pending</strong>{" "}
                </td>
              </tr>
            </table>
          </div>

          <div className="mt-5">
            <div className="flex justify-center items-center ">
              {/* Submit Button */}
              <div className="mt-5 text-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>

              <div>{/* <Print /> */}</div>
            </div>
          </div>
        </section>
      </section>
    </form>
  );
};

export default UserPermissionOrRole;
