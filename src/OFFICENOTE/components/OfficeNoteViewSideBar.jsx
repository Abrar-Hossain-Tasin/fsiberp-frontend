import React, { useEffect, useState } from "react";
// import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { decryptId } from "../../pages/Encrypted/Encrypted";
import { Base_api } from "../../utils/api/Base_api";
import OfficeNoteAdminApproval from "../pages/OfficeNoteAdminApproval";
import AddCheckerEdit from "./AddCheckerEdit";

const OfficeNoteViewSideBar = ({
  setAddCheckerUserId,
  setAddCheckerUserName,
  setAddCheckerUserStatus,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, official, onms } = decoded;
  let { type, userId, formId, id } = useParams();
  const [formData, setFormData] = useState({});
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [comment, setComment] = useState([]);
  const [offData, setOffData] = useState({});

  const decryptedUserId = decryptId(userId);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);

  // fetch User
  useEffect(() => {
    fetch(`${Base_api}/api/users/${decryptedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the response to inspect it
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/officenote/emplist/${decryptedUserId}`
        );
        const data = await response.json();
        // ({ data });
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/officenote/official/${decryptedUserId}`
        );
        const value = await response.json();
        setOffData(value);
        // (userid);
      } catch (error) {
        console.error("Error fetching approvers:", error);
      }
    };

    fetchApprovers();
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          // `${Base_api}/api/onms/comments/06203/5001/85`
          `${Base_api}/api/onms/comments/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const result = await response.json();
        setComment(result);
        result;

        // const messages = result.map((comment) => comment.message);
        // ({ messages });
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${Base_api}/api/officenote/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const result = await response.json();
        setFormData(result);
        // (result);
        setSubject(result.noteSubject);
        setBody(result.noteBody);
        const documentPaths = result.documentPaths;
        setDocuments(result.documentDownloadUrl);

        const a = documentPaths.map((item) => item.split("~"));
        const b = a.map((item) => item[item.length - 1]);
        setFiles(b);
        // ({ a });
        // ({ b });
        // (formData.otherApprovalUserIds);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  const otherApprovalUserIds = formData.otherApprovalUserIds;
  // useEffect(() => {
  //   ({ otherApprovalUserIds });
  // }, []);

  // ({ otherApprovalUserIds });
  // ({ filteredOptions });

  const approvedUsers = (otherApprovalUserIds || [])
    .map((userId) => filteredOptions.find((user) => user.userid === userId))
    .filter((user) => user !== undefined); // Filter out any undefined values
  // ({ approvedUsers });

  return (
    <div className="h-full p-1 bg-[url('../src/assets/mega.png')] bg-gray-300 text-white overflow-auto">
      {type === "edit" ? (
        <div className="flex flex-col gap-2 bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
          <div>
            <div>
              <AddCheckerEdit
                setAddCheckerUserId={setAddCheckerUserId}
                setAddCheckerUserName={setAddCheckerUserName}
                setAddCheckerUserStatus={setAddCheckerUserStatus}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* 
      {userid === formData.userid ? (
        ""
      ) : ( */}
      {onms === 1 && userid !== formData.userid ? (
        <div className="flex flex-col gap-2 bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
          <div>
            <OfficeNoteAdminApproval />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bg-[#094276] p-2 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-1">
        <h1 className="font-bold mb-1 underline">Checked By : </h1>
        {approvedUsers.map((user, index) => {
          const userMessages = comment.filter(
            (comments) => comments.userid === user.userid
          );

          const sortedMessages = userMessages.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          return (
            <div key={index} className="mb-2">
              <h2 className="text-md">
                Name: {user.username} ({user.userid})
              </h2>
              <h2 className="text-sm font-medium">{user.designation}</h2>
              <h2 className="text-xs mb-2">
                Status :{" "}
                {formData.otherApprovalStatuses[index] || "Unknown Status"}
              </h2>
              {official === 0 && sortedMessages.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedMessages.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#094276] p-2 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-1">
        <h2 className="font-bold mb-1 underline">
          Head of Branch/Division/Zonal :
        </h2>
        <p className="text-md">
          Name: {formData.divHeadUsername} ({formData.divHeadUserid})
        </p>
        <h2 className="text-sm font-medium">{offData.divheaddesg}</h2>
        <h2 className="text-xs mb-2">
          Status : {formData.divHeadStatus || "Unknown Status"}
        </h2>

        {(() => {
          const divHeadComments = comment.filter(
            (comments) => comments.userid === formData.divHeadUserid
          );

          const sortedDivHeadComments = divHeadComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          return (
            <div>
              {/* {sortedDivHeadComments.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedDivHeadComments.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )} */}
              {official === 0 && sortedDivHeadComments.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedDivHeadComments.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* <div className="bg-gradient-to-b from-[#2e429c] to-[#09750e] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2"> */}
      <div className="bg-[#094276] p-2 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-1">
        <h2 className="font-bold mb-1 underline">Deputy Managing Director :</h2>
        <p className="text-md">
          Name: {formData.dmdUsername} ({formData.dmdUserid})
        </p>
        <h2 className="text-xs mb-2">
          Status : {formData.dmdStatus || "Unknown Status"}
        </h2>

        {(() => {
          const dmdComments = comment.filter(
            (comments) => comments.userid === formData.dmdUserid
          );

          const sortedDmdComments = dmdComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          return (
            <div>
              {sortedDmdComments.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedDmdComments.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>
      <div className="bg-[#094276] p-2 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-1">
        <h2 className="font-bold mb-1 underline">
          Additional Managing Director :
        </h2>
        <p className="text-md">
          Name: {formData.amdUsername} ({formData.amdUserid})
        </p>
        <h2 className="text-xs mb-2">
          Status : {formData.amdStatus || "Unknown Status"}
        </h2>

        {(() => {
          const amdComments = comment.filter(
            (comments) => comments.userid === formData.amdUserid
          );

          const sortedAmdComments = amdComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          return (
            <div>
              {sortedAmdComments.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedAmdComments.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>
      <div className="bg-[#094276] p-2 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-1">
        <h2 className="font-bold mb-1 underline">Managing Director :</h2>
        <p className="text-md">
          Name: {formData.mdUsername} ({formData.mdUserid})
        </p>
        <h2 className="text-xs mb-2">Status : {formData.mdStatus}</h2>

        {(() => {
          const mdComments = comment.filter(
            (comments) => comments.userid === formData.mdUserid
          );

          const sortedMdComments = mdComments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          return (
            <div>
              {sortedMdComments.length > 0 && (
                <div className="bg-slate-500 p-1 rounded">
                  <p className="text-sm">Remarks:</p>
                  {sortedMdComments.map((messageItem, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="p-1 rounded mb-1 text-sm bg-[#D0E2F4] text-black"
                    >
                      <p className="">
                        {msgIndex + 1}. {messageItem.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {new Date(messageItem.createdAt).toLocaleString()}
                      </p>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default OfficeNoteViewSideBar;
