import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import AccountTypeEdit from "../Arrf/AccountTypeEdit";
import AccessToDatabaseTableView from "./AccessToDatabaseTableView";

import AdminApproval from "../../AdminDashboard/AdminApproval";

import ImplementedUnitHeadSearch from "../../../component/CRF/ImplementedUnitHeadSearch";
import ActionPurposeView from "./ActionPurposeView";

const DatabaseAccessRightViewForm = ({ type }) => {
  const { userId, formId, id } = useParams();
  const navigate = useNavigate();
  const [actype, setActype] = useState(" ");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [action, setAction] = useState("");
  const [other, setOther] = useState("");
  const [accesstodatabase, setAccesstodatabase] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [implbyunitheaduserid, setImplbyunitheaduserid] = useState(null);
  const [implbyunitheadusername, setImplbyunitheadusername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [implbyunitheadsearchTerm, setImplbyunitheadSearchTerm] = useState("");
  const [unit, setUnit] = useState("");
  const [formData, setFormData] = useState({});

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [unitHeadUserId, setUnitHeadUserId] = useState(null);
  const [unitHeadUserName, setUnitHeadUserName] = useState("");

  const [implementedbyusername, setImplementedbyusername] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId, type;
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        ({ data });
        setFormData(data);
        ({ data });
        ({ formData });
        setOther(data.other);
        setActype(data.actype);
        setAction(data.action);
        setImplementedbyusername(data.implementedbyusername);

        if (data.actype === "temporary") {
          setFromDate(data.tempdatefrom);
          setToDate(data.tempdateto);
          setFromTime(data.temptimefrom);
          setToTime(data.temptimeto);
        }
        setAccesstodatabase(data.accesstodatabase);
        setSearchTerm(data.unitheadusername + " - " + data.unitheaduserid);
        setImplbyunitheadSearchTerm(data.implbyunitheadusername);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] p-5 my-5 w-[900px]">
      <div className="my-5">
        <AllFormsHeader
          divname="ICT Division"
          formname="Database Access Right Request Form"
          dno="1015"
          vno="3.0"
          edate="08.10.2023"
          fpageno="1"
          lpageno="1"
          rdiv="ICT Division"
          rformname="DARRF"
          submitdate={formData.submitdate}
          referenceValue={formData.referencevalue}
        />

        <div className="my-4">
          <Dynamictable userid={decryptId(userId)} />
        </div>
        <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by respective Requestor
        </h4>
        <AccountTypeEdit
          actype={actype}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          fromTime={fromTime}
          setFromTime={setFromTime}
          toTime={toTime}
          setToTime={setToTime}
          type={type}
        />

        <ActionPurposeView type={type} action={action} setAction={setAction} />

        <AccessToDatabaseTableView
          type={type}
          accesstodatabase={accesstodatabase}
          setAccesstodatabase={setAccesstodatabase}
        />

        {/* <UnitHeadSearch
          unitheaduserid={unitheaduserid}
          setUnitheaduserid={setUnitheaduserid}
          unitheadusername={unitheadusername}
          setUnitheadusername={setUnitheadusername}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          type={type}
        /> */}

        <div className="mt-4 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border border-black">
                  Approved by (Head of Branch/Unit/Division/Department)
                </th>
                <th className="border border-black">Status</th>
                <th className="border border-black">Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      id="search-input"
                      className="text-[#3b3838] border-[1px]  border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 text-sm placeholder-opacity-100"
                      placeholder="Search Here!"
                      value={searchTerm}
                      readOnly
                    />
                  </div>
                </td>
                <td className="border border-black text-center">
                  <strong
                    className={
                      formData.unitheadstatus === "Accepted"
                        ? "text-green-700" // Tailwind CSS class for green text
                        : formData.unitheadstatus === "Rejected"
                        ? "text-red-500" // Tailwind CSS class for red text
                        : ""
                    }
                  >
                    {formData.unitheadstatus}
                  </strong>
                </td>
                <td className="border border-black text-center">
                  <strong>{formData.unitheadcmnt}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <DbAdminApproval
          implbyunitheaduserid={implbyunitheaduserid}
          setImplbyunitheaduserid={setImplbyunitheaduserid}
          implbyunitheadusername={implbyunitheadusername}
          setImplbyunitheadusername={setImplbyunitheadusername}
          implbyunitheadsearchTerm={implbyunitheadsearchTerm}
          setImplbyunitheadSearchTerm={setImplbyunitheadSearchTerm}
          unit={unit}
          setUnit={setUnit}
          type={type}
        /> */}
        <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by Admin
        </h4>
        <div className=" text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded">
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="text-sm">
                <tr>
                  <th className="py-2 px-4 border border-black">
                    Recommended by Head of ISRM Unit/CISO
                  </th>
                  <th className="py-2 px-4 border border-black">
                    Approval by HOICTD/CTO/CIO/CITO
                  </th>
                  <th className="py-2 px-4 border border-black">
                    Implementer's Unit Head
                  </th>
                  <th className="py-2 px-4 border border-black">
                    Implemented by
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-center">
                <tr>
                  <td className="py-2 px-4 border border-black">
                    Md. Mostafejur Rahman
                  </td>
                  <td className="py-2 px-4 border border-black">
                    Md. Mushfiqur Rahman
                  </td>
                  <td className="py-2 px-4 border border-black">
                    <ImplementedUnitHeadSearch
                      implbyunitheaduserid={implbyunitheaduserid}
                      setImplbyunitheaduserid={setImplbyunitheaduserid}
                      implbyunitheadusername={implbyunitheadusername}
                      setImplbyunitheadusername={setImplbyunitheadusername}
                      implbyunitheadsearchTerm={implbyunitheadsearchTerm}
                      setImplbyunitheadSearchTerm={setImplbyunitheadSearchTerm}
                      unit={unit}
                      setUnit={setUnit}
                      type={type}
                    />
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {implementedbyusername
                      ? implementedbyusername
                      : "Implementer's Unit Name"}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border border-black">
                    Status:{" "}
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
                  <td className="py-2 px-4 border border-black">
                    Status:{" "}
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
                  <td className="py-2 px-4 border border-black">
                    Status:{" "}
                    <strong
                      className={
                        formData.implbyunitheadstatus === "Accepted"
                          ? "text-green-600" // Tailwind CSS class for green text
                          : formData.implbyunitheadstatus === "Rejected"
                          ? "text-red-600" // Tailwind CSS class for red text
                          : ""
                      }
                    >
                      {formData.implbyunitheadstatus}
                    </strong>
                  </td>
                  <td className="py-2 px-4 border border-black">
                    Status:{" "}
                    <strong
                      className={
                        formData.implementedbystatus === "Done"
                          ? "text-green-600" // Tailwind CSS class for green text
                          : formData.implementedbystatus === "Rejected"
                          ? "text-red-600" // Tailwind CSS class for red text
                          : ""
                      }
                    >
                      {formData.implementedbystatus}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border border-black">
                    Comment: <strong>{formData.isrmheadcmnt}</strong>
                  </td>
                  <td className="py-2 px-4 border border-black">
                    Comment: <strong>{formData.citocmnt}</strong>
                  </td>
                  <td className="py-2 px-4 border border-black">
                    Comment: <strong>{formData.implbyunitheadcmnt}</strong>
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {/* Comment: <strong>No Comment.</strong> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-5">
          <AdminApproval
            status={status}
            setStatus={setStatus}
            comment={comment}
            setComment={setComment}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseAccessRightViewForm;
