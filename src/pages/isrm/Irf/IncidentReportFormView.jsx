import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import ImpactPotentialImpact from "../../../component/Isrm/Irf/ImpactPotentialImpact";
import IncidentTypeCheckboxes from "../../../component/Isrm/Irf/IncidentTypeCheckboxes";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api";
import AdminApproval from "../../AdminDashboard/AdminApproval";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import HandleByViewEdit from "./HandleByViewEdit";
import WitnessViewEdit from "./WitnessViewEdit";

const IncidentReportFormView = ({ type }) => {
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
  const [usergrp, setUsergrp] = useState("");
  const [createdby, setCreatedby] = useState("");
  const [locationOfIncident, setLocationOfIncident] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [handleByUserId, setHandleByUserId] = useState([]);
  const [handleWitness, setHandleWitness] = useState([]);

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [occurredDate, setOccurredDate] = useState("");
  const [occurredTime, setOccurredTime] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [resolvedTime, setResolvedTime] = useState("");
  const [priority, setPriority] = useState("");
  const [incidentReportedBy, setIncidentReportedBy] = useState("");
  const [incidentHandledBy, setIncidentHandledBy] = useState("");
  const [formData, setFormData] = useState({});
  const [typeOfIncident, setTypeOfIncident] = useState([]);
  const [potentialImpact, setPotentialImpact] = useState([]);
  const [downtimeDocumentationName, setDowntimeDocumentationName] =
    useState("");
  const [impactAnalysisDocumentName, setImpactAnalysisDocumentName] =
    useState("");
  const [incidentHandlingDocumentsName, setIncidentHandlingDocumentsName] =
    useState("");
  const [rootCauseAnalysisDocumentsName, setRootCauseAnalysisDocumentsName] =
    useState("");
  const [workCompletionDocumentName, setWorkCompletionDocumentName] =
    useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const response = await fetch(
          `${Base_api}/api/incidentreport/view/${decryptedUserId}`
        );
        const data = await response.json();
        ({ data });
        setUsername(data.username);
        setCurrentUserEmail(data.email);
        setCurrentUserPhone(data.contactno);
        setDesignation(data.designation);
        setDepartment(data.department);

        setUsergrp(data.usergrp);
        setCreatedby(data.createdby);
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
        setLocationOfIncident(data.locationOfIncident);
        ({ formData });
        ({ data });

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
        setHandleWitness(data.witness);

        setUnitHeadSSearchTerm(
          data.unitheadusername + " - " + data.unitheaduserid
        );

        setTypeOfIncident(data.typeOfIncident);
        setPotentialImpact(data.potentialImpact);

        const downtimeDocumentationPath = data.downtimeDocumentationPath;
        const downtimeDocumentation = downtimeDocumentationPath.split("~")[1];
        setDowntimeDocumentationName(downtimeDocumentation);

        const impactAnalysisDocumentPath = data.impactAnalysisDocumentPath;
        const impactAnalysisDocument = impactAnalysisDocumentPath.split("~")[1];
        setImpactAnalysisDocumentName(impactAnalysisDocument);

        const incidentHandlingDocumentsPath =
          data.incidentHandlingDocumentsPath;
        const incidentHandlingDocuments =
          incidentHandlingDocumentsPath.split("~")[1];
        setIncidentHandlingDocumentsName(incidentHandlingDocuments);

        const rootCauseAnalysisDocumentsPath =
          data.rootCauseAnalysisDocumentsPath;
        const rootCauseAnalysisDocuments =
          rootCauseAnalysisDocumentsPath.split("~")[1];
        setRootCauseAnalysisDocumentsName(rootCauseAnalysisDocuments);

        const workCompletionDocumentPath = data.workCompletionDocumentPath;
        const workCompletionDocument = workCompletionDocumentPath.split("~")[1];
        setWorkCompletionDocumentName(workCompletionDocument);

        workCompletionDocument;
        workCompletionDocumentName;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

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

  const tableRowClassName = "border border-black px-4 py-2";
  return (
    <div>
      <form className="p-5 bg-white rounded-xl shadow-[0_5px_10px_0px_gray] m-5 w-[900px] ">
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
                <th className="w-1/12 border p-1 px-2 text-center border-black ">
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
        <h4 className="text-center font-bold bg-gray-300 text-sm p-1 rounded-md mt-3 mb-5">
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
          <h4 className="text-center font-bold bg-gray-300 text-sm p-1 rounded-md mt-3 mb-5">
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
                  disabled
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                />
              </td>
              <td className="border py-2  border-black text-center">
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
                  disabled
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
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
                  disabled
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
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
                  disabled
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                />
              </td>
            </tr>
            <tr>
              <td className="border py-2 border-black text-center">
                <strong>Location of Incident</strong>
              </td>
              <td className="border border-black p-1" colSpan={4}>
                <input
                  type="text"
                  className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                  placeholder="Location Of Incident"
                  value={locationOfIncident}
                  onChange={(e) => setLocationOfIncident(e.target.value)}
                  disabled
                />
              </td>
            </tr>
          </table>
        </div>

        {/* Incident Reported By */}
        <div className="my-5">
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
            Incident Reported By
          </h4>
          <table className="relative w-full text-sm">
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
                    className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    disabled
                  />
                </td>
                <th className="border border-black py-2">
                  <label htmlFor="reported_by_id">Employee ID</label>
                </th>
                <td className="border border-black text-center p-2 relative">
                  <input
                    type="text"
                    className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                    className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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
                    className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
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

        {/* <WitnessTableView /> */}

        <WitnessViewEdit
          handleWitness={handleWitness}
          setHandleWitness={setHandleWitness}
          type={type}
          userId={decryptId(userId)}
        />

        {/* Root cause of Incident */}
        <div>
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
            Provide Information
          </h4>
          <div className="mt-5 flex flex-col gap-2  text-sm border border-black p-5">
            <div className="flex flex-col gap-1">
              <strong>
                <label htmlFor="nameOfTheIncident">Name of the Incident</label>
              </strong>
              <input
                type="text"
                className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                id="nameOfTheIncident"
                placeholder="Name of the Incident"
                value={formData.nameOfTheIncident}
                disabled
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
                value={formData.rootCauseOfIncident}
                disabled
              />
            </div>
          </div>

          <div>
            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
              Type of Incident
            </h4>
            <div className="mt-5 flex flex-col gap-2 border border-black">
              <IncidentTypeCheckboxes
                typeOfIncident={typeOfIncident}
                setTypeOfIncident={setTypeOfIncident}
              />
            </div>
          </div>
          <div>
            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
              Impact / Potential Impact
            </h4>
            <div className="mt-5 flex flex-col gap-2 border border-black">
              <ImpactPotentialImpact
                potentialImpact={potentialImpact}
                setPotentialImpact={setPotentialImpact}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2 border border-black p-5 text-sm">
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
                value={formData.potentialImpactDescription}
                disabled
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
                value={formData.actionTaken}
                disabled
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
                value={formData.prevention}
                disabled
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
                value={formData.proposedSolution}
                disabled
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
                value={formData.lessonLearned}
                disabled
              />
            </div>
          </div>
        </div>

        {/* choose_file */}
        <div className="my-5">
          <h4 className="text-center font-bold text-sm bg-gray-300 p-1 rounded-md ">
            Attachment
          </h4>
          <table className="w-full my-5 text-sm font-[500]">
            <tr>
              <th className="border border-black py-2 w-1/2">
                <label htmlFor="incidentHandlingDocuments">
                  Incident Handling Documents
                </label>
              </th>

              <td className="border border-black p-2 w-1/2 text-center">
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    {formData.incidentHandlingDocumentsDownloadUrl ? (
                      <div className="p-2 border border-slate-40 rounded w-full">
                        <p className="mb-2">Attachment: </p>
                        <label
                          onClick={() =>
                            window.open(
                              formData.incidentHandlingDocumentsDownloadUrl,
                              "_blank"
                            )
                          }
                          className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                        >
                          {incidentHandlingDocumentsName}
                        </label>
                      </div>
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

              <td className="border border-black p-2 text-center">
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    {formData.impactAnalysisDocumentDownloadUrl ? (
                      <div className="p-2 border border-slate-40 rounded">
                        <p className="mb-2">Attachment: </p>
                        <label
                          onClick={() =>
                            window.open(
                              formData.impactAnalysisDocumentDownloadUrl,
                              "_blank"
                            )
                          }
                          className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                        >
                          {impactAnalysisDocumentName}
                        </label>
                      </div>
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

              <td className="border border-black p-2 text-center">
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    {formData.downtimeDocumentationDownloadUrl ? (
                      <div className="p-2 border border-slate-40 rounded">
                        <p className="mb-2">Attachment: </p>
                        <label
                          onClick={() =>
                            window.open(
                              formData.downtimeDocumentationDownloadUrl,
                              "_blank"
                            )
                          }
                          className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                        >
                          {downtimeDocumentationName}
                        </label>
                      </div>
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

              <td className="border border-black p-2 text-center">
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    {formData.rootCauseAnalysisDocumentsDownloadUrl ? (
                      <div className="p-2 border border-slate-40 rounded">
                        <p className="mb-2">Attachment: </p>
                        <label
                          onClick={() =>
                            window.open(
                              formData.rootCauseAnalysisDocumentsDownloadUrl,
                              "_blank"
                            )
                          }
                          className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                        >
                          {rootCauseAnalysisDocumentsName}
                        </label>
                      </div>
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

              <td className="border border-black p-2 text-center">
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2 w-full">
                    {formData.workCompletionDocumentDownloadUrl ? (
                      <div className="p-2 border border-slate-40 rounded">
                        <p className="mb-2">Attachment: </p>
                        <label
                          onClick={() =>
                            window.open(
                              formData.workCompletionDocumentDownloadUrl,
                              "_blank"
                            )
                          }
                          className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                        >
                          {workCompletionDocumentName}
                        </label>
                      </div>
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
              <td className="border border-black w-1/2">
                <IncidentTypeCheckboxes
                  typeOfIncident={typeOfIncident}
                  setTypeOfIncident={setTypeOfIncident}
                />
              </td>

              <td className="border border-black w-1/2 align-top">
                <ImpactPotentialImpact
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
                <td colSpan={2} className={`${tableRowClassName} text-center`}>
                  <div className="relative text-center">
                    <input
                      autoComplete="off"
                      required
                      type="text"
                      id="search-input"
                      name="search"
                      className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Search Here!"
                      value={unitHeadSearchTerm}
                      onChange={handleInputChangeUnit}
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
              </tr>

              <tr>
                <td className={`${tableRowClassName} text-center w-1/2`}>
                  Status :{" "}
                  <strong
                    className={
                      formData.unitheadstatus === "Accepted"
                        ? "text-green-600" // Tailwind CSS class for green text
                        : formData.unitheadstatus === "Rejected"
                        ? "text-red-600" // Tailwind CSS class for red text
                        : ""
                    }
                  >
                    {formData.unitheadstatus}
                  </strong>
                </td>
                <td className={`${tableRowClassName} text-center w-1/2`}>
                  Comment: <strong> {formData.unitheadcmnt}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* To Be Completed By Admin */}
        <div className="my-5">
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
            To be completed by Admin
          </h4>
          <div className="overflow-x-auto font-[600] text-[#1b3c1c] bg-slate-200/95 p-3 rounded-md">
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
                    Status :{" "}
                    <strong
                      className={
                        formData.isrmheadstatus === "Accepted"
                          ? "text-green-600" // Tailwind CSS class for green text
                          : formData.isrmheadstatus === "Rejected"
                          ? "text-red-600" // Tailwind CSS class for red text
                          : ""
                      }
                    >
                      {formData.isrmheadstatus}
                    </strong>
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Status :{" "}
                    <strong
                      className={
                        formData.citostatus === "Accepted"
                          ? "text-green-600" // Tailwind CSS class for green text
                          : formData.citostatus === "Rejected"
                          ? "text-red-600" // Tailwind CSS class for red text
                          : ""
                      }
                    >
                      {formData.citostatus}
                    </strong>
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

        <AdminApproval
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
        />
      </form>
    </div>
  );
};

export default IncidentReportFormView;
