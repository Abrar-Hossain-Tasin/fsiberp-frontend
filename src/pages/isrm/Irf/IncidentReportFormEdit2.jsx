import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import WitnessTable from "./WitnessTable";

const IncidentReportFormEdit2 = () => {
  const { userId, formId, id } = useParams();
  const [username, setUsername] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [witness, setWitness] = useState([]);
  const [submitDate, setSubmitDate] = useState("");
  const [referenceValue, setReferenceValue] = useState("");
  const [formData, setFormData] = useState({});

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
        setSubmitDate(data.submitDate);
        setReferenceValue(data.referenceValue);
        ({ formData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  const handleWitnessChange = (fetchedData) => {
    setWitness(fetchedData);
    ({ fetchedData });
  };

  useEffect(() => {
    witness;
  }, []);

  return (
    <div>
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
          submitDate={submitDate}
          referenceValue={referenceValue}
        />
      </div>
      {/* User Info */}
      <div>
        <Dynamictable userid={decryptId(userId)} />
      </div>

      {/* Requestor Info */}
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={4}>
                <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
                  To be completed by respective Requestor
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="w-1/12 border p-1 px-2 text-left border-black">
                To
              </th>
              <td className="w-5/12 border p-1 px-2 text-left border-black">
                Md. Mustafejur Mostafejur Rahman, FAVP & Head of Information
                Security
              </td>
              <th className="w-1/12 border p-1 px-2 text-left border-black">
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
              <th className="border p-1 px-2 text-left border-black">CC</th>
              <td className="border p-1 px-2 text-left border-black">
                Md. Mushfiqur Rahaman, VP & HOD, ICTD
              </td>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="tel">Tel</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>{contactno}</div>
              </td>
            </tr>
            <tr>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="dt">Date</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>{submitDate}</div>
              </td>
              <th className="border p-1 px-2 text-left border-black">
                <label htmlFor="email">Email</label>
              </th>
              <td className="border p-1 px-2 text-left border-black">
                <div>{email}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Witness Table */}
      <WitnessTable handleWitnessChange={handleWitnessChange} />
    </div>
  );
};

export default IncidentReportFormEdit2;
