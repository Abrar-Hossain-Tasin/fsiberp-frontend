import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import ImpactPotentialImpactEdit from "../../../component/Isrm/Irf/ImpactPotentialImpactEdit";
import IncidentTypeCheckboxesEdit from "../../../component/Isrm/Irf/IncidentTypeCheckboxesEdit";
import Requestor from "../../../component/Requestor";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import EmployeeTable from "./WitnessTable";

const IncidentReportFormEdit = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const { userId, formId, id } = useParams();
  const [username, setUsername] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [submitDate, setSubmitDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const [rootCauseOfIncident, setRootCauseOfIncident] = useState("");
  const [nameOfTheIncident, setNameOfTheIncident] = useState("");
  const [potentialImpactDescription, setPotentialImpactDescription] =
    useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [prevention, setPrevention] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [lessonLearned, setLessonLearned] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [incidentOccurred, setIncidentOccurred] = useState("");
  const [incidentResolved, setIncidentResolved] = useState("");
  const [occurredDate, setOccurredDate] = useState("");
  const [occurredTime, setOccurredTime] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [resolvedTime, setResolvedTime] = useState("");
  const [priority, setPriority] = useState("");
  const [locationOfIncident, setLocationOfIncident] = useState("");
  const [incidentReportedBy, setIncidentReportedBy] = useState("");
  const [incidentHandledBy, setIncidentHandledBy] = useState("");
  const [formData, setFormData] = useState({});
  const [typeOfIncident, setTypeOfIncident] = useState([]);
  const [potentialImpact, setPotentialImpact] = useState([]);
  const [witness, setWitness] = useState([]);

  // Witness state
  const [selectedEmployees, setSelectedEmployees] = useState({
    one: { id: "", email: "", phone: "", designation: "" },
    two: { id: "", email: "", phone: "", designation: "" },
    three: { id: "", email: "", phone: "", designation: "" },
  });
  const [witnessList, setWitnessList] = useState([]);
  const [nametwo, setNameTwo] = useState({ one: "", two: "", three: "" });
  const [suggestionstwo, setSuggestionsTwo] = useState({
    one: [],
    two: [],
    three: [],
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/access/view/${userid}`);
        const data = await response.json();
        setUsername(data.username);
        setContactno(data.contactno);
        setEmail(data.email);
        setDesignation(data.designation);
        setDepartment(data.department);
        setSubmitDate(data.submitdate);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch existing form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        setSubmitDate(data.submitdate);
        setPriority(data.priority);
        ({ formData });

        setRootCauseOfIncident(data.rootCauseOfIncident);
        setNameOfTheIncident(data.nameOfTheIncident);
        setPotentialImpactDescription(data.potentialImpactDescription);
        setActionTaken(data.actionTaken);
        setPrevention(data.prevention);
        setProposedSolution(data.proposedSolution);
        setLessonLearned(data.lessonLearned);
        setIncidentReportedBy(data.incidentReportedBy);
        setLocationOfIncident(data.locationOfIncident);

        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);

        // Extract date and time
        const [dateOccurred, timeOccurred] = data.incidentOccurred.split(" ");
        const [dateResolved, timeResolved] = data.incidentResolved.split(" ");

        setOccurredDate(dateOccurred);
        setOccurredTime(timeOccurred);
        setResolvedDate(dateResolved);
        setResolvedTime(timeResolved);
        setIncidentReportedBy(data.incidentReportedBy);
        setIncidentHandledBy(data.incidentHandledBy);

        setUnitHeadSSearchTerm(
          data.unitheadusername + " - " + data.unitheaduserid
        );

        setTypeOfIncident(data.typeOfIncident);
        setPotentialImpact(data.potentialImpact);

        // Fetch witness data
        const witnessIds = data.witness || [];
        const witnessDataPromises = witnessIds.map(async (witnessId) => {
          const response = await fetch(
            `${Base_api}/api/user/view/${witnessId}`
          );
          return response.json();
        });

        const witnesses = await Promise.all(witnessDataPromises);
        setSelectedEmployees({
          one: witnesses[0] || {
            id: "",
            email: "",
            phone: "",
            designation: "",
          },
          two: witnesses[1] || {
            id: "",
            email: "",
            phone: "",
            designation: "",
          },
          three: witnesses[2] || {
            id: "",
            email: "",
            phone: "",
            designation: "",
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  // Fetch employees for witness
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${decryptedUserId}`
        );
        const data = await response.json();
        "Fetched Employees:", data; // Log the fetched data
        setWitnessList(data);

        // Check if witnessList is populated
        // ("Witness List:", witnessList);

        // Function to find a Witness by userid
        const findWitnessById = (targetWitnessId) => {
          const witness = witnessList.find(
            (witness) => witness.userid === targetWitnessId
          );
          return witness;
        };

        // Set selected employees based on witness IDs
        const witnessIdToFind = formData.witness || [];
        witnessIdToFind.forEach((id) => {
          const foundWitness = findWitnessById(id);
          if (foundWitness) {
            setSelectedEmployees((prev) => ({
              ...prev,
              [foundWitness.index]: foundWitness,
            }));
          }
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [userId, formData]);

  // Assuming formData.witness is an array of user IDs
  const filteredWitnessList = witnessList.filter((witness) => {
    return witness
      ? formData.witness.includes(witness.userid)
      : formData.witness.includes(null);
  });

  //   Unit Head Search start
  const [unitHeadSearchTerm, setUnitHeadSSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [userData, setUserData] = useState(null); // State to store selected user data
  const [eligibleUsers, setEligibleUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const decryptedUserId = decryptId(userId);
      try {
        const response = await fetch(`${unitHeadSearch}/${decryptedUserId}`);
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChangeUnit = (e) => {
    const { value } = e.target;
    setUnitHeadSSearchTerm(value);

    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };
  const handleOptionClick = (username, userid) => {
    setUnitHeadSSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    setUnitheaduserid(userid);
    setUnitheadusername(username);
  };
  //   Unit Head Search End

  // incidentreport emplist start

  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      const decryptedUserId = decryptId(userId);
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${decryptedUserId}`
        );
        const data = await response.json();
        setUserList(data); // Assuming data is an array of user objects

        // Function to find a user by userid
        const findUserById = (targetUserId) => {
          const user = userList.find((user) => user.userid === targetUserId);
          return user;
        };

        // Example usage
        const userIdToFind = incidentReportedBy; // replace with the userId you're looking for
        const foundUser = findUserById(userIdToFind);
        // ({ foundUser });
        setSearchTerm(foundUser?.username + " - " + foundUser?.userid);

        setEmail(foundUser?.email);
        setContactno(foundUser?.contactno);
        // (data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, [userid, incidentReportedBy]);

  useEffect(() => {
    // Filter and sort users based on the search term when it changes
    const results = userList
      .filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.username.localeCompare(b.username)); // Sort in ascending order
    setFilteredUsers(results);
  }, [searchTerm, userList]);

  const handleUserClick = (user) => {
    setSearchTerm(user.username + "- ID: " + user.userid);
    setUserData(user); // Set the selected user data
    // ("Selected User Data:", user); // Optional: Log the selected user data
  };
  // incidentreport emplist end

  // File Upload start

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.name === "incidentHandlingDocuments") {
      setIncidentHandlingDocuments(file ? file : "");
    } else if (event.target.name === "employeeIdCard") {
      setImpactAnalysisDocument(file ? file : "");
    } else if (event.target.name === "downtimeDocumentation") {
      setDowntimeDocumentation(file ? file : "");
    } else if (event.target.name === "rootCauseAnalysisDocuments") {
      setRootCauseAnalysisDocuments(file ? file : "");
    } else if (event.target.name === "workCompletionDocument") {
      setWorkCompletionDocument(file ? file : "");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData(e.target);

      // Append selected incidents to FormData
      typeOfIncident.forEach((incident) => {
        formData.append("typeOfIncident[]", incident);
      });

      potentialImpact.forEach((impact) => {
        formData.append("potentialImpact[]", impact);
      });

      // Combine date and time into a single datetime string
      if (occurredDate && occurredTime) {
        const incidentOccurred = `${occurredDate} ${occurredTime}`;
        formData.append("incidentOccurred", incidentOccurred);
      }

      if (resolvedDate && resolvedTime) {
        const incidentResolved = `${resolvedDate} ${resolvedTime}`;
        formData.append("incidentResolved", incidentResolved);
      }

      // Check if priority is already appended to avoid duplicates
      if (!formData.has("priority")) {
        formData.append("priority", priority);
      }

      formData.append("incidentReportedBy", incidentReportedBy); // Use employee ID

      // Add other data to FormData
      formData.append("workCompletionDocument", workCompletionDocument);
      formData.append("rootCauseAnalysisDocuments", rootCauseAnalysisDocuments);
      formData.append("downtimeDocumentation", downtimeDocumentation);
      formData.append("impactAnalysisDocument", impactAnalysisDocument);
      formData.append("incidentHandlingDocuments", incidentHandlingDocuments);
      formData.append("locationOfIncident", locationOfIncident);
      formData.append("rootCauseOfIncident", rootCauseOfIncident);

      formData.append("nameOfTheIncident", nameOfTheIncident);
      formData.append("potentialImpactDescription", potentialImpactDescription);
      formData.append("actionTaken", actionTaken);
      formData.append("prevention", prevention);
      formData.append("proposedSolution", proposedSolution);
      formData.append("lessonLearned", lessonLearned);
      formData.append("incidentHandledBy", incidentHandledBy);
      formData.append("unitheaduserid", unitheaduserid);
      formData.append("unitheadusername", unitheadusername);

      formData.append("witness", witness);

      // const employeeArray = Object.values(selectedEmployees);
      // const pfIds = employeeArray
      //   .filter((witness) => witness.id)
      //   .map((witness) => witness.id);

      // // Append each ID to FormData as a separate entry
      // pfIds.forEach((id) => {
      //   formData.append("witness[]", id); // Use witness[] to indicate an array
      // });

      // witnessList.forEach((witnessId) => {
      //   formData.append("witness[]", witnessId);
      // });

      const decryptedId = decryptId(id);

      const response = await fetch(
        `${Base_api}/api/incidentreport/update/${decryptedId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Form Update successfully!");
      } else {
        toast.error("Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChangeTwo = (index) => (e) => {
    const inputValue = e.target.value;
    ({ index }), { inputValue };
    setNameTwo((prev) => ({ ...prev, [index]: inputValue }));

    if (inputValue) {
      const filteredSuggestions = witnessList.filter(
        (emp) =>
          emp.username &&
          emp.username.toLowerCase().includes(inputValue.toLowerCase())
      );

      ({ filteredSuggestions });
      ({ witnessList });

      setSuggestionsTwo((prev) => ({ ...prev, [index]: filteredSuggestions }));
    } else {
      setSuggestionsTwo((prev) => ({ ...prev, [index]: [] }));
    }
  };

  const handleSuggestionClickTwo = (index) => (emp) => {
    setNameTwo((prev) => ({ ...prev, [index]: emp.username }));
    setSelectedEmployees((prev) => ({
      ...prev,
      [index]: {
        id: emp.userid, // Ensure this is correctly set
        email: emp.email,
        phone: emp.contactno,
        designation: emp.designation,
      },
    }));
    setSuggestionsTwo((prev) => ({ ...prev, [index]: [] }));

    setWitnessPfIds([emp.userid]);
  };

  const tableRowClassName = "border border-slate-400 px-4 py-2";
  return (
    <div>
      <form
        onSubmit={handleUpdate}
        className="p-5 bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 w-[800px]"
      >
        {/* Header */}
        <div>
          <AllFormsHeader
            divname="ICT Division"
            formname="INCIDENT REPORT FORM"
            dno="1006"
            vno="3.0"
            edate="08.10.2023"
            fpageno="1"
            lpageno="2"
            rdiv="ICTD"
            rformname="IRF"
            transferDate={formData.transferDate}
            referenceValue={formData.referenceValue}
          />
        </div>
        {/* User Info */}
        <div>
          <Dynamictable userid={decryptId(userId)} />
        </div>
        {/* Requestor Info */}
        <div>
          <Requestor />
          <table className="w-full">
            <tr>
              <th className="w-1/12 border p-1 px-2 text-left border-black">
                To
              </th>
              <td className="w-5/12 border p-1 px-2 text-left border-black">
                <strong>
                  Md. Mustafejur Mostafejur Rahman, FAVP & Head of Information
                  Security
                </strong>
              </td>
              <th className="w-1/12 border p-1 px-2 text-left border-black">
                <label htmlFor="from">From</label>
              </th>
              <td className="w-5/12 border p-1 px-2 text-left border-black ">
                <div className="flex justify-center">
                  <label htmlFor="">
                    <strong>
                      {username} - {designation} - {department}
                    </strong>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border p-1 px-2 text-left border-black">CC</th>
              <td className="border p-1 px-2 text-left border-black">
                <strong>Md. Mushfiqur Rahaman, VP & HOD, ICTD</strong>
              </td>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="tel">Tel</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>
                  <strong>{contactno}</strong>
                </div>
              </td>
            </tr>
            <tr>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="dt">Date</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>
                  <strong>{submitDate}</strong>
                </div>
              </td>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="email">Email</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>
                  <strong>{email}</strong>
                </div>
              </td>
            </tr>
          </table>
        </div>
        {/* Priority */}
        <div className="my-5">
          <table className="w-full">
            <tr>
              <th className="border py-2 border-black">Priority</th>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="High"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="High" className="pl-1">
                  High
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Medium"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="Medium" className="pl-1">
                  Medium
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Low"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="Low" className="pl-1">
                  Low
                </label>
              </td>
            </tr>
          </table>
        </div>
        {/* Particulars of incident */}
        <div>
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            Particulars of incident
          </h4>
          <table className="w-full">
            <tr>
              <th className="border py-2 border-black">Incident Occurred</th>
              <td className="border py-2 border-black text-center">
                <label htmlFor="occurred_date">Date</label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="date"
                  id="occurred_date"
                  name="occurred_date"
                  value={occurredDate}
                  onChange={(e) => setOccurredDate(e.target.value)}
                  className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                />
              </td>
              <td className="border py-2 border-black text-center">
                <label htmlFor="occurred_time">Time</label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="time"
                  step="1"
                  id="occurred_time"
                  name="occurred_time"
                  value={occurredTime}
                  onChange={(e) => setOccurredTime(e.target.value)}
                  className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                />
              </td>
            </tr>
            <tr>
              <th className="border py-2 border-black">Incident Resolved</th>
              <td className="border py-2 border-black text-center">
                <label htmlFor="resolved_date">Date</label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="date"
                  id="resolved_date"
                  name="resolved_date"
                  value={resolvedDate}
                  onChange={(e) => setResolvedDate(e.target.value)}
                  className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                />
              </td>
              <td className="border py-2 border-black text-center">
                <label htmlFor="resolved_time">Time</label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="time"
                  step="1"
                  id="resolved_time"
                  name="resolved_time"
                  value={resolvedTime}
                  onChange={(e) => setResolvedTime(e.target.value)}
                  className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border py-2 border-black text-center">
                <label htmlFor="LocationOfIncident">Location of Incident</label>
              </td>
              <td colSpan={3} className="border py-2 border-black text-center">
                <input
                  type="text"
                  id="LocationOfIncident"
                  placeholder="Location of Incident"
                  value={locationOfIncident}
                  onChange={(e) => setLocationOfIncident(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
            </tr>
          </table>
        </div>

        {/* Incident Reported By */}
        <div className=" bg-white shadow-lg rounded-lg">
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              Incident Reported By
            </h4>
            <table className="relative w-full">
              <tbody>
                <tr>
                  <td className="p-1 border border-black">Name: </td>
                  <td className="p-1 border border-black relative">
                    <input
                      type="text"
                      placeholder="Search by username"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchTerm && filteredUsers.length > 0 && (
                      <div className="absolute left-0 right-0 bg-white shadow-lg h-52 overflow-auto">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            onClick={() => handleUserClick(user)}
                            className="p-2 hover:bg-blue-100 cursor-pointer rounded-md transition-colors"
                          >
                            {user.username} (ID: {user.userid})
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-1 border border-black">Employee Id: </td>
                  <td className="p-1 border border-black">
                    {userData
                      ? userData.userid
                      : incidentReportedBy
                      ? incidentReportedBy
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="p-1 border border-black">Email:</td>
                  <td className="p-1 border border-black">
                    {userData ? userData.email : email ? email : "N/A"}
                  </td>
                  <td className="p-1 border border-black">Phone: </td>
                  <td className="p-1 border border-black">
                    {userData
                      ? userData.contactno
                      : contactno
                      ? contactno
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-1 border border-black">
                    Incident Handled By
                  </td>
                  <td colSpan={2} className="p-1 border border-black">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={incidentHandledBy}
                      onChange={(e) => setIncidentHandledBy(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <EmployeeTable witness={witness} setWitness={setWitness} />

        {/* Witness Section */}

        {/* Root cause of Incident */}
        <div className="mt-5 flex flex-col gap-2 border border-slate-400 p-5">
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
            Provide Information
          </h4>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="rootCauseOfIncident">
                Root cause of Incident
              </label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="rootCauseOfIncident"
              placeholder="Root Cause Of Incident"
              value={rootCauseOfIncident}
              onChange={(e) => setRootCauseOfIncident(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="nameOfTheIncident">Name of the Incident</label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="nameOfTheIncident"
              placeholder="Name of the Incident"
              value={nameOfTheIncident}
              onChange={(e) => setNameOfTheIncident(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="potentialImpactDescription">
                Provide a brief description
              </label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="potentialImpactDescription"
              placeholder="Provide a brief description"
              value={potentialImpactDescription}
              onChange={(e) => setPotentialImpactDescription(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="actionTaken">
                Action Taken: What Steps Have Been Taken So Far?
              </label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="actionTaken"
              placeholder="What Steps Have Been Taken So Far?"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="prevention">
                Prevention: What Action Has Been taken to prevent a reocurrence?
              </label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="prevention"
              placeholder="What Action Has Been taken to prevent a reocurrence?"
              value={prevention}
              onChange={(e) => setPrevention(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="proposedSolution">
                Provide solution for further occurrence
              </label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="proposedSolution"
              placeholder="Provide solution for further occurrence"
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <strong>
              <label htmlFor="lessonLearned">Lesson Learned</label>
            </strong>
            <input
              type="text"
              className="p-1 border border-slate-400 rounded-md"
              id="lessonLearned"
              placeholder="Lesson Learned"
              value={lessonLearned}
              onChange={(e) => setLessonLearned(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* choose_file */}
        <div className="my-5">
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
            Attachment
          </h4>
          <table className="w-full my-5">
            <tr>
              <th className="border border-black py-2">
                <label htmlFor="incidentHandlingDocuments">
                  Incident Handling Documents
                </label>
              </th>

              <td className="border border-black p-2 ">
                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="file"
                      className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="incidentHandlingDocuments"
                      name="incidentHandlingDocuments"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {formData.incidentHandlingDocumentsDownloadUrl ? (
                      <Link
                        to={formData.incidentHandlingDocumentsDownloadUrl}
                        className="py-1 px-3 rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Employee Id Card
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th className="border border-black py-2">
                <label htmlFor="impactAnalysisDocument">
                  Impact Analysis Document
                </label>
              </th>

              <td className="border border-black p-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="file"
                      className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="impactAnalysisDocument"
                      name="impactAnalysisDocument"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {formData.impactAnalysisDocumentDownloadUrl ? (
                      <Link
                        to={formData.impactAnalysisDocumentDownloadUrl}
                        className="py-1 px-3 rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Employee Id Card
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th className="border border-black py-2">
                <label htmlFor="downtimeDocumentation">
                  Downtime Documentation
                </label>
              </th>

              <td className="border border-black p-2 ">
                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="file"
                      className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="downtimeDocumentation"
                      name="downtimeDocumentation"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {formData.downtimeDocumentationDownloadUrl ? (
                      <Link
                        to={formData.downtimeDocumentationDownloadUrl}
                        className="py-1 px-3 rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Employee Id Card
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th className="border border-black py-2">
                <label htmlFor="rootCauseAnalysisDocuments">
                  Root Cause Analysis Documents
                </label>
              </th>

              <td className="border border-black p-2">
                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="file"
                      className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="rootCauseAnalysisDocuments"
                      name="rootCauseAnalysisDocuments"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {formData.rootCauseAnalysisDocumentsDownloadUrl ? (
                      <Link
                        to={formData.rootCauseAnalysisDocumentsDownloadUrl}
                        className="py-1 px-3 rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Employee Id Card
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th className="border border-black py-2">
                <label htmlFor="workCompletionDocument">
                  Work completion document
                </label>
              </th>

              <td className="border border-black p-3">
                <div className="flex flex-col gap-2">
                  <div>
                    <input
                      type="file"
                      className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="workCompletionDocument"
                      name="workCompletionDocument"
                      onChange={handleFileChange}
                    />{" "}
                  </div>
                  <div>
                    {formData.workCompletionDocumentDownloadUrl ? (
                      <Link
                        to={formData.workCompletionDocumentDownloadUrl}
                        className="py-1 px-3 rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Employee Id Card
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </table>
          {/*
           */}
        </div>

        {/* Type of Incident /Impact / Potential Impact  */}
        <div className="my-5">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2 text-center">
                Type of Incident
              </th>

              <th className="border border-black py-2 text-center">
                Impact / Potential Impact
              </th>
            </tr>
            <tr className="h-full">
              <td className="border border-black py-2">
                <IncidentTypeCheckboxesEdit
                  // selectedIncidents={selectedIncidents}
                  // setSelectedIncidents={setSelectedIncidents}
                  typeOfIncident={typeOfIncident}
                  setTypeOfIncident={setTypeOfIncident}
                />
              </td>

              <td className="border border-black">
                <ImpactPotentialImpactEdit
                  potentialImpact={potentialImpact}
                  setPotentialImpact={setPotentialImpact}
                />
              </td>
            </tr>
          </table>
        </div>

        {/* Incident Verified By */}
        <table className="w-full">
          <thead>
            <tr>
              <th className={tableRowClassName} colSpan={4}>
                <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                  Incident Verified By
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={2}
                className={`${tableRowClassName} text-center w-3/5`}
              >
                <div className="relative text-center">
                  <input
                    autoComplete="off"
                    required
                    type="text"
                    id="search-input"
                    name="search"
                    className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Here!"
                    value={unitHeadSearchTerm}
                    onChange={handleInputChangeUnit}
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
            </tr>

            <tr>
              <td className={`${tableRowClassName} text-center`}>
                Status : <strong>{formData.unitheadstatus}</strong>
              </td>
              <td className={`${tableRowClassName} text-center`}>
                Comment: {formData.unitheadcmnt}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Submit Button */}
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReportFormEdit;
