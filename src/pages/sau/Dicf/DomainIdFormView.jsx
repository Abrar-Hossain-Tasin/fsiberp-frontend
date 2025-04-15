import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable.jsx";
import RadioButton from "../../../component/RadioButton/RadioButton";
import Requestor from "../../../component/Requestor.jsx";
import DomainAdminApproval from "../../../component/Sau/DomainId/DomainAdminApproval";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import AdminApproval from "../../AdminDashboard/AdminApproval";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const DomainIdFormView = () => {
  const { userId, formId, id } = useParams();
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({});
  const [joiningLetter, setJoiningLetter] = useState(null);
  const [files, setFiles] = useState([]);
  const [action, setAction] = useState("");
  const [previousBranchName, setPreviousBranchName] = useState("");
  const [previousBranchCode, setPreviousBranchCode] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchCode, setNewBranchCode] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [unitHeadUserId, setUnitHeadUserId] = useState(null);
  const [unitHeadUserName, setUnitHeadUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }

        const data = await response.json();
        setFormData(data);
        setJoiningLetter(data.joiningLetter);
        setAction(data.action);
        setPreviousBranchName(data.previousBranchName);
        setPreviousBranchCode(data.previousBranchCode);
        setNewBranchName(data.newBranchName);
        setNewBranchCode(data.newBranchCode);
        setTransferDate(data.transferDate);
        setUnitHeadUserId(data.unitheaduserid);
        setUnitHeadUserName(data.unitheadusername);
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);

        const documentPaths = data.joiningLetterPath;

        setJoiningLetter(data.joiningLetterDownloadUrl);
        documentPaths;

        const a = documentPaths.split("~");
        a;
        const b = a[a.length - 1];
        setFiles(b);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  return (
    <div className="m-auto">
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <div className="mx-6 w-[850px]">
          <div>
            <AllFormsHeader
              divname="ICT Division"
              formname="Domain ID Create/Freeze/Edit"
              dno="1010"
              vno="3.0"
              edate="08.10.2023"
              fpageno="1"
              lpageno="1"
              rdiv="ICTD"
              rformname="DIC"
              submitdate={formData.submitdate}
              referenceValue={formData.referencevalue}
            />

            <div className="mt-4">
              <Dynamictable userid={decryptId(userId)} />
            </div>

            <Requestor />

            {/* Action Section */}
            <div>
              <table className="w-full text-sm font-[500]">
                <tbody>
                  <tr>
                    <td className="border border-black py-2 pl-2 text-center">
                      <strong>Action</strong>
                    </td>
                    <td className="border border-black py-2 pl-2">
                      <div className="text-center">
                        {[
                          "Create",
                          "Freeze",
                          "Edit",
                          "Reset",
                          "Unlock",
                          "Transfer",
                        ].map((actionType) => (
                          <RadioButton
                            key={actionType}
                            id={actionType.toLowerCase()}
                            name="action"
                            htmlFor={actionType.toLowerCase()}
                            labeltext={actionType}
                            className="ml-2 mr-2"
                            checked={action === actionType}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Transfer Details Section */}
            <div className="my-4">
              <table className="w-full text-sm font-[500]">
                <thead>
                  <tr>
                    <th className="border border-black py-2" colSpan="4">
                      Transfer Details
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black py-2">Previous Place</th>
                    <th className="border border-black py-2">
                      Previous Branch Code
                    </th>
                    <th className="border border-black py-2">Present Place</th>
                    <th className="border border-black py-2">
                      Present Branch Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black py-2 text-center">
                      <input
                        value={previousBranchName}
                        readOnly
                        className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      />
                    </td>
                    <td className="border border-black py-2 text-center">
                      <input
                        value={previousBranchCode}
                        readOnly
                        className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      />
                    </td>
                    <td className="border border-black py-2 text-center">
                      <input
                        value={newBranchName}
                        readOnly
                        className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      />
                    </td>
                    <td className="border border-black py-2 text-center">
                      <input
                        value={newBranchCode}
                        readOnly
                        className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Date of Join/Transfer Section */}

            <div className="flex items-center space-x-5">
              <div className="w-full">
                <table className="w-full text-sm font-[500]">
                  <tr>
                    <th className="border border-black py-2 text-center">
                      Date of Join / Transfer
                    </th>
                    <td className="border border-black py-2 text-center">
                      <input
                        type="date"
                        readOnly
                        value={transferDate}
                        className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      />
                    </td>
                    <th className="border border-black py-2 text-center">
                      Joining Letter
                    </th>
                    <td className="border border-black py-2 text-center">
                      <div className="flex justify-center w-full">
                        {formData.joiningLetterDownloadUrl ? (
                          <div className="p-2 border border-slate-40 rounded w-full">
                            <p className="mb-2">Attachment: </p>
                            <label
                              onClick={() =>
                                window.open(
                                  formData.joiningLetterDownloadUrl,
                                  "_blank"
                                )
                              }
                              className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded text-xs font-[500] cursor-pointer"
                            >
                              {files}
                            </label>
                          </div>
                        ) : (
                          "No document has been uploaded."
                        )}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            {/* Unit Head Search Section */}
            <div className="mt-4 mb-4">
              <table className="w-full text-sm font-[500]">
                <thead>
                  <tr>
                    <th className="border border-black w-2/4">
                      Approved by (Head of Branch/Unit/Division/Department)
                    </th>
                    <th className="border border-black w-1/4">Status</th>
                    <th className="border border-black w-1/4">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black">
                      <div className="flex justify-center">
                        <input
                          type="text"
                          id="search-input"
                          className="text-[#3b3838] w-80 border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
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
                            ? "text-green-600" // Tailwind CSS class for green text
                            : formData.unitheadstatus === "Rejected"
                            ? "text-red-600" // Tailwind CSS class for red text
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

            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
              To be completed by respective officials for giving Access
              permission
            </h4>
            <DomainAdminApproval />

            {/* Terms and Conditions Section */}
            <div className="my-4 text-[16px] font-[600] text-[#421414]">
              <h2 className="text-center text-xl underline">
                <strong>Terms and Condition</strong>
              </h2>
              <h2 className="underline">
                <strong>Password:</strong>
              </h2>
              <ol className="list-decimal ml-4 mt-2">
                <li>
                  The minimum password length at least 6 characters, combination
                  of uppercase, lowercase, numbers & may include special
                  characters.
                </li>

                <li>The maximum validity period of password will be 45 days</li>

                <li>
                  In case of wrong password for 3 times your Account will be
                  locked.
                </li>
                <li>Same passwords to be used again after at least 4 times.</li>
              </ol>
            </div>
            <AdminApproval
              status={status}
              setStatus={setStatus}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainIdFormView;
