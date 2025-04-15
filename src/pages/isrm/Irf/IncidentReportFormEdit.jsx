import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AllFormsHeader from "../../../component/AllFormsHeader";
import ImpactPotentialImpactEdit from "../../../component/Isrm/Irf/ImpactPotentialImpactEdit";
import IncidentTypeCheckboxesEdit from "../../../component/Isrm/Irf/IncidentTypeCheckboxesEdit";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import HandleByViewEdit from "./HandleByViewEdit";
import WitnessViewEdit from "./WitnessViewEdit";

const IncidentReportFormEdit = ({ type }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const { userId, formId, id } = useParams();
  const [username, setUsername] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const [submitDate, setSubmitDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [handleByUserId, setHandleByUserId] = useState([]);
  const [handleWitness, setHandleWitness] = useState([]);

  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
  const [typeOfIncident, setTypeOfIncident] = useState([]);
  const [potentialImpact, setPotentialImpact] = useState([]);

  const [witness, setWitness] = useState([]);
  const [formData, setFormData] = useState({});

  const [rootCauseOfIncident, setRootCauseOfIncident] = useState("");
  const [nameOfTheIncident, setNameOfTheIncident] = useState("");
  const [potentialImpactDescription, setPotentialImpactDescription] =
    useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [prevention, setPrevention] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [lessonLearned, setLessonLearned] = useState("");

  const [incidentHandlingDocuments, setIncidentHandlingDocuments] =
    useState(null);
  const [impactAnalysisDocument, setImpactAnalysisDocument] = useState(null);
  const [downtimeDocumentation, setDowntimeDocumentation] = useState(null);
  const [rootCauseAnalysisDocuments, setRootCauseAnalysisDocuments] =
    useState(null);
  const [workCompletionDocument, setWorkCompletionDocument] = useState(null);

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

  const tableRowClassName = "border border-black px-4 py-2";

  const handleWitnessChange = (fetchedData) => {
    setWitness(fetchedData);
    // ({ fetchedData });
  };

  useEffect(() => {
    // ({ aaaa: witness });
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/users/${userid}`);
        const data = await response.json();
        // ({ data });
        setUsername(data.username);
        setContactno(data.contactno);
        setCurrentUserEmail(data.email);
        setCurrentUserPhone(data.contactno);
        setDesignation(data.designation);
        setDepartment(data.department);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // incidentreport emplist start

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
        setSearchTerm(foundUser?.username);

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
      .filter((user) => user.username.toLowerCase().includes(searchTerm))
      .sort((a, b) => a.username.localeCompare(b.username)); // Sort in ascending order
    setFilteredUsers(results);
  }, [searchTerm, userList]);

  const handleUserClick = (user) => {
    setSearchTerm(user.username);
    setUserData(user); // Set the selected user data
    setIncidentReportedBy(user.userid);
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

  // Fetch existing form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        decryptedUserId, decryptedFormId, decryptedId;
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        setSubmitDate(data.submitdate);
        setPriority(data.priority);
        // ({ formData });

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
        setUnitHeadSSearchTerm(
          `${data.unitheaduserid} - ${data.unitheadusername}`
        );
        setHandleWitness(data.witness);

        // Extract date and time
        if (data.incidentOccurred) {
          const [dateOccurred, timeOccurred] = data.incidentOccurred.split(" ");
          setOccurredDate(dateOccurred ? dateOccurred : "");
          setOccurredTime(timeOccurred ? timeOccurred : "");
        }
        if (data.incidentResolved) {
          const [dateResolved, timeResolved] = data.incidentResolved.split(" ");
          setResolvedDate(dateResolved ? dateResolved : "");
          setResolvedTime(timeResolved ? timeResolved : "");
        }

        setIncidentReportedBy(data.incidentReportedBy);
        // setIncidentHandledBy(data.incidentHandledBy);
        setHandleByUserId(data.incidentHandledBy);

        setUnitHeadSSearchTerm(
          data.unitheadusername + " - " + data.unitheaduserid
        );
        if (data.typeOfIncident) {
          setTypeOfIncident(data.typeOfIncident);
        } else {
          setTypeOfIncident([]);
        }
        // (data.typeOfIncident);
        if (data.potentialImpact) {
          setPotentialImpact(data.potentialImpact);
        } else {
          setPotentialImpact([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  const handleIncidentChange = (selectedIncidents) => {
    // ("Selected Incidents:", selectedIncidents);
    // You can also prepare FormData here if needed
    const formData = new FormData();
    selectedIncidents.forEach((incident) => {
      formData.append("incidents[]", incident); // Append each selected incident
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // ("Selected Incident Types:", typeOfIncident);

      const formData = new FormData(e.target);

      // Append each selected incident type to the FormData using the correct field name

      // Append each selected incident type to the FormData using the correct field name
      if (typeOfIncident) {
        typeOfIncident.forEach((incident) => {
          formData.append("typeOfIncident[]", incident);
        });
      } else {
        formData.append("typeOfIncident[]", "");
      }

      if (potentialImpact) {
        potentialImpact.forEach((impact) => {
          formData.append("potentialImpact[]", impact);
        });
      } else {
        formData.append("potentialImpact[]", "");
      }

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
      // formData.append("incidentHandledBy", incidentHandledBy);
      formData.append("unitheaduserid", unitheaduserid);
      formData.append("unitheadusername", unitheadusername);

      formData.append("incidentHandledBy", handleByUserId);

      // formData.append("witness", witness);
      formData.append("witness", handleWitness);

      // for (const value of formData.values()) {
      //   (value);
      // }
      // Log the key/value pairs
      // for (var pair of formData.entries()) {
      //   (pair[0] + " - " + pair[1]);
      // }

      const decryptedId = decryptId(id);
      // ({ decryptedId });

      const response = await fetch(
        `${Base_api}/api/incidentreport/update/${decryptedId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      // (response);

      if (response.ok) {
        toast.success("Form updated successfully!", {
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
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Error updating form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleUpdate}
        className="p-5 bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 w-[900px]"
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
            lpageno="1"
            rdiv="ICTD"
            rformname="IRF"
            submitDate={submitDate}
            referenceValue={formData.referenceValue}
          />
        </div>
        {/* Requestor Info */}
        <div>
          <table className="w-full font-medium my-5 text-sm">
            <tbody>
              <tr>
                <th className="w-1/12 border p-1 px-2 text-center border-black">
                  To
                </th>
                <td className="w-5/12 border p-1 px-2 text-left border-black">
                  Md. Mostafejur Rahman, FAVP & Head of Information Security
                </td>
                <th className="w-1/12 border p-1 px-2 text-center border-black">
                  <label htmlFor="from">From</label>
                </th>
                <td className="w-5/12 border p-1 px-2 text-left border-black ">
                  <div className="flex justify-center">
                    <label htmlFor="">
                      {username} - {designation} - {department}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="border p-1 px-2 text-center border-black">CC</th>
                <td className="border p-1 px-2 text-left border-black">
                  Md. Mushfiqur Rahaman, VP & HOD, ICTD
                </td>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="tel">Tel</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{currentUserPhone}</div>
                </td>
              </tr>
              <tr>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="dt">Date</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{submitDate}</div>
                </td>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="email">Email</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{currentUserEmail}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by respective Requestor
        </h4>
        {/* Priority */}
        <div className="my-5">
          <table className="w-full text-sm font-[500]">
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
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            Particulars of incident
          </h4>
          <table className="w-full text-sm font-[500]">
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
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                  required
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
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                  required
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
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                  required
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
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="border py-2 border-black text-center">
                <strong>Location of Incident</strong>
              </td>
              <td className="border py-2 border-black p-2" colSpan={4}>
                <input
                  type="text"
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                  placeholder="Location Of Incident"
                  value={locationOfIncident}
                  onChange={(e) => setLocationOfIncident(e.target.value)}
                />
              </td>
            </tr>
          </table>
        </div>
        {/* Incident Reported By */}
        <div className="my-5 text-sm">
          <h4 className="text-center font-bold bg-gray-300 p-1 my-5 rounded-md ">
            Incident Reported By
          </h4>
          <table className="relative w-full font-[500]">
            <tbody>
              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="reported_by_name">Name</label>
                </th>
                <td className="border border-black text-center p-2 relative">
                  <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    required
                  />
                  {searchTerm && filteredUsers.length > 0 && (
                    <div className="absolute left-0 right-0 bg-white shadow-lg h-52 z-10 overflow-auto">
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
                <th className="border border-black py-2">
                  <label htmlFor="reported_by_id">Employee ID</label>
                </th>
                <td className="border border-black text-center p-2 relative">
                  <input
                    type="text"
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    value={
                      userData
                        ? userData.userid
                        : incidentReportedBy
                        ? incidentReportedBy
                        : "N/A"
                    }
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="reported_by_email">Email</label>
                </th>
                <td className="border border-black text-center p-2 relative">
                  <input
                    type="text"
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    value={userData ? userData.email : email ? email : "N/A"}
                    disabled
                  />
                </td>
                <th className="border border-black py-2">
                  <label htmlFor="reported_by_number">Phone Number</label>
                </th>
                <td className="border border-black text-center p-2 relative">
                  <input
                    type="text"
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    value={
                      userData
                        ? userData.contactno
                        : contactno
                        ? contactno
                        : "N/A"
                    }
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <HandleByViewEdit
          handleByUserId={handleByUserId}
          setHandleByUserId={setHandleByUserId}
          type={type}
          userId={decryptId(userId)}
        />
        {/* Witness Table */}
        {/* <WitnessTable handleWitnessChange={handleWitnessChange} /> */}
        <WitnessViewEdit
          handleWitness={handleWitness}
          setHandleWitness={setHandleWitness}
          type={type}
          userId={decryptId(userId)}
        />
        {/* Root cause of Incident */}
        <div className="my-5 text-sm">
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
            Provide Information
          </h4>
          <div className="mt-5 flex flex-col gap-2 border border-black p-5">
            <div className="flex flex-col gap-1">
              <strong>
                <label htmlFor="nameOfTheIncident">Name of the Incident</label>
              </strong>
              <input
                type="text"
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                id="nameOfTheIncident"
                placeholder="Name of the Incident"
                value={nameOfTheIncident}
                onChange={(e) => setNameOfTheIncident(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1">
              <strong>
                <label htmlFor="rootCauseOfIncident">
                  Root cause of Incident
                </label>
              </strong>
              <input
                type="text"
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                id="rootCauseOfIncident"
                placeholder="Root Cause Of Incident"
                value={rootCauseOfIncident}
                onChange={(e) => setRootCauseOfIncident(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="my-5">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
              Type of Incident
            </h4>

            <div className="mt-5 flex flex-col gap-2 border border-black">
              <IncidentTypeCheckboxesEdit
                typeOfIncident={typeOfIncident}
                setTypeOfIncident={setTypeOfIncident}
              />
            </div>
          </div>
          <div className="my-5">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
              Impact / Potential Impact
            </h4>
            <div className="mt-5 flex flex-col gap-2 border border-black">
              <ImpactPotentialImpactEdit
                potentialImpact={potentialImpact}
                setPotentialImpact={setPotentialImpact}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2 border border-black p-5">
            <div className="flex flex-col gap-1">
              <strong>
                <label htmlFor="potentialImpactDescription">
                  Provide a brief description
                </label>
              </strong>
              <input
                type="text"
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                  Prevention: What Action Has Been taken to prevent a
                  reocurrence?
                </label>
              </strong>
              <input
                type="text"
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                id="lessonLearned"
                placeholder="Lesson Learned"
                value={lessonLearned}
                onChange={(e) => setLessonLearned(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* choose_file */}
        <div className="my-5">
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md text-sm ">
            Attachment
          </h4>
          <table className="w-full my-5 text-sm">
            <tr>
              <th className="border border-black py-2 w-1/2">
                <label htmlFor="incidentHandlingDocuments">
                  Incident Handling Documents
                </label>
              </th>

              <td className="border border-black p-2 w-1/2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center">
                    <input
                      type="file"
                      className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="incidentHandlingDocuments"
                      name="incidentHandlingDocuments"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    {formData.incidentHandlingDocumentsDownloadUrl ? (
                      <Link
                        to={formData.incidentHandlingDocumentsDownloadUrl}
                        className="p-1 w-72 flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Incident Handling Documents
                      </Link>
                    ) : (
                      "No document has been uploaded."
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
                  <div className="flex justify-center">
                    <input
                      type="file"
                      className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="impactAnalysisDocument"
                      name="impactAnalysisDocument"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    {formData.impactAnalysisDocumentDownloadUrl ? (
                      <Link
                        to={formData.impactAnalysisDocumentDownloadUrl}
                        className="p-[4px] w-72 flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Impact Analysis Document
                      </Link>
                    ) : (
                      "No document has been uploaded."
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
                  <div className="flex justify-center">
                    <input
                      type="file"
                      className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="downtimeDocumentation"
                      name="downtimeDocumentation"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    {formData.downtimeDocumentationDownloadUrl ? (
                      <Link
                        to={formData.downtimeDocumentationDownloadUrl}
                        className="p-[4px] w-72 flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Downtime Documentation
                      </Link>
                    ) : (
                      "No document has been uploaded."
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
                  <div className="flex justify-center">
                    <input
                      type="file"
                      className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="rootCauseAnalysisDocuments"
                      name="rootCauseAnalysisDocuments"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    {formData.rootCauseAnalysisDocumentsDownloadUrl ? (
                      <Link
                        to={formData.rootCauseAnalysisDocumentsDownloadUrl}
                        className="p-[4px] flex-shrink-0 w-72 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Root Cause Analysis Documents
                      </Link>
                    ) : (
                      "No document has been uploaded."
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
                  <div className="flex justify-center">
                    <input
                      type="file"
                      className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      id="workCompletionDocument"
                      name="workCompletionDocument"
                      onChange={handleFileChange}
                    />{" "}
                  </div>
                  <div className="flex justify-center">
                    {formData.workCompletionDocumentDownloadUrl ? (
                      <Link
                        to={formData.workCompletionDocumentDownloadUrl}
                        className="p-[4px] w-72 flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                        target="_blank" // Optional: opens in a new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        View Work completion document
                      </Link>
                    ) : (
                      "No document has been uploaded."
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
        {/* <div className="my-5">
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
              <td className="border border-black py-2 w-1/2">
                <IncidentTypeCheckboxesEdit
                  typeOfIncident={typeOfIncident}
                  setTypeOfIncident={setTypeOfIncident}
                />
              </td>

              <td className="border border-black w-1/2 align-top">
                <ImpactPotentialImpactEdit
                  potentialImpact={potentialImpact}
                  setPotentialImpact={setPotentialImpact}
                />
              </td>
            </tr>
          </table>
        </div> */}
        {/* Incident Verified By */}
        <div>
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md my-4 text-sm">
            Incident Verified By
          </h4>
          <table className="w-full text-sm font-[500]">
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  className={`${tableRowClassName} text-center w-1/3`}
                >
                  <div className="relative text-center">
                    <input
                      autoComplete="off"
                      type="text"
                      id="search-input"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Here!"
                      value={unitHeadSearchTerm}
                      onChange={handleInputChangeUnit}
                      required
                    />
                    {showOptions && (
                      <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredOptions.map((item) => (
                          <li
                            key={item.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-[500]"
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
                <td className={`${tableRowClassName} text-center w-1/3`}>
                  Status : <strong>{formData.unitheadstatus}</strong>
                </td>
                <td className={`${tableRowClassName} text-center w-1/3`}>
                  Comment: <strong>{formData.unitheadcmnt}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* To Be Completed By Admin */}

        <div>
          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md my-5 text-sm">
            To be completed by Admin
          </h4>
          <div className="overflow-x-auto font-[600] text-[#1b3c1c] bg-slate-200/95 p-3 rounded-md text-sm">
            <table className="w-full text-sm font-[500]">
              <thead>
                <tr>
                  <th className={`${tableRowClassName} w-1/2`}>
                    Recommended by Head of ISRM Unit/CISO
                  </th>
                  <th className={`${tableRowClassName} w-1/2`}>
                    Approval by HOICTD/CTO/CIO/CITO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${tableRowClassName} text-center `}>
                    {formData.isrmheadusername}
                  </td>
                  <td className={`${tableRowClassName} text-center `}>
                    {formData.citousername}
                  </td>
                </tr>

                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong> {formData.isrmheadstatus}</strong>
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong> {formData.citostatus}</strong>
                  </td>
                </tr>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment: <strong> {formData.isrmheadcmnt}</strong>
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment: <strong> {formData.citocmnt}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReportFormEdit;
