import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import config from "ckeditor5-custom-build/src/config";
import { useEffect, useState } from "react";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { decryptId } from "../../../pages/Encrypted/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";
import OfficeNoteHeader from "../../components/OfficeNoteHeader";
import "../../../OFFICENOTE/officeNoteStyle.css";
const BoardMemoEdit = () => {
  const { userId, formId, id } = useParams();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadDocuments, setLoadDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const {
    addCheckerUserId,
    addCheckerUserName,
    addCheckerUserStatus,
    official,
  } = useOutletContext();
  const navigate = useNavigate();
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
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${Base_api}/api/boardmemo/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const result = await response.json();
        console.log({ result });
        setFormData(result);

        setSubject(result.memoSubject);
        setBody(result.memoBody);

        const documentPaths = result.documentPaths;
        setDocuments(result.documentDownloadUrl);
        if (documentPaths) {
          const a = documentPaths.map((item) => item.split("~"));
          const b = a.map((item) => item[item.length - 1]);
          setFiles(b);
        } else {
        }
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setLoadDocuments(selectedFiles);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file) => file.name),
    ]);
  };

  const removeFile = async (fileName, index) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
    try {
      const response = await fetch(
        `${Base_api}/api/officenote/removefile/${decryptId(id)}/${index}`,
        {
          method: "DELETE", // Use PUT for updates
        }
      );
    } catch (error) {
      error;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    ({ addCheckerUserId });
    const formData = new FormData();
    formData.append("memoSubject", subject);
    formData.append("memoBody", body);
    formData.append("draft", 0);
    formData.append("otherApprovalUserIds", addCheckerUserId);
    formData.append("otherApprovalUsernames", addCheckerUserName);
    formData.append("otherApprovalStatuses", addCheckerUserStatus);
    // formData.append("documents", documents);

    // Append each document individually to FormData

    loadDocuments.forEach((file) => {
      formData.append("documents", file); // "documents" is the key expected by the server
    });

    try {
      const response = await fetch(
        `${Base_api}/api/boardmemo/update/${decryptedId}`,
        {
          method: "PUT", // Use PUT for updates
          body: formData,
        }
      );
      response;
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response as JSON

        // Display the error message from the backend
        if (errorData.error) {
          toast.error(errorData.error, {
            autoClose: 2000,
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        toast.success("Form Updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("../board-memo-dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateDraft = async (e) => {
    e.preventDefault();

    ({ addCheckerUserId });
    const formData = new FormData();
    formData.append("memoSubject", subject);
    formData.append("memoBody", body);
    formData.append("draft", 1);
    formData.append("otherApprovalUserIds", addCheckerUserId);
    formData.append("otherApprovalUsernames", addCheckerUserName);
    formData.append("otherApprovalStatuses", addCheckerUserStatus);
    // formData.append("documents", documents);

    // Append each document individually to FormData

    loadDocuments.forEach((file) => {
      formData.append("documents", file); // "documents" is the key expected by the server
    });

    try {
      const response = await fetch(
        `${Base_api}/api/boardmemo/update/${decryptedId}`,
        {
          method: "PUT", // Use PUT for updates
          body: formData,
        }
      );
      response;
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response as JSON

        // Display the error message from the backend
        if (errorData.error) {
          toast.error(errorData.error, {
            autoClose: 2000,
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        toast.success("Form Updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("../board-memo-dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateDraft = localStorage.getItem("updateDraft");

  const placeholder = "টাইপ করুন.....";
  const getConfig = config(placeholder);

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <div className="flex justify-center p-5">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md">
            <OfficeNoteHeader />
            <div className="flex flex-col font-[500] my-1">
              <div className="w-full flex-row">
                <div className="flex justify-center">
                  <p>{userInfo.nativeDivisionName}</p>
                </div>
                <div className="flex justify-end text-sm">
                  <p>Date: {formData.submitDate}</p>
                </div>
              </div>

              <div className="flex justify-start text-sm font-bold ">
                <table>
                  <tbody>
                    <tr>
                      <td>স্মারক নং</td>
                      <td className="px-2">:</td>
                      <td>{formData.refNo}</td>
                    </tr>
                    <tr>
                      <td> আলোচ্য সূচী নং</td>
                      <td className="px-2">:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>প্রতি</td>
                      <td className="px-2">:</td>
                      <td>ব্যাংকের নির্বাহী কমিটি/পরিচালনা পর্ষদ সমীপে</td>
                    </tr>
                    <tr>
                      <td>হতে</td>
                      <td className="px-2">:</td>
                      <td>ব্যবস্থাপনা পরিচালক</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <input
              className="w-full p-1 my-1 border border-gray-400 font-bold"
              type="text"
              value={subject}
              placeholder="Subject here..."
              onChange={(e) => setSubject(e.target.value)}
            />

            <CKEditor
              editor={Editor}
              config={getConfig}
              data={body}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // ("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
                // ({ event, editor, data, body });
              }}
              onBlur={(event, editor) => {
                // ("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // ("Focus.", editor);
              }}
            />
            <div className="flex items-center gap-3 border border-slate-400 p-1">
              {/* Custom button (icon) that triggers file input */}
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
              />

              <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                <label htmlFor="file-upload" className="px-1">
                  {files.length > 1 ? "Attachments" : "Attachment"}
                </label>
                <label
                  htmlFor="file-upload"
                  className="flex items-center cursor-pointer"
                >
                  {/* Attachments */}
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                  />
                </label>{" "}
              </div>
              {files.length === 0 ? (
                <label htmlFor="" className="text-slate-500 text-xs font-[500]">
                  (File size must be under 250KB)
                </label>
              ) : (
                ""
              )}

              {files.length > 0 && (
                <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                  {files.map((fileName, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-[#cee6f7] px-1 py-1 rounded border border-slate-400"
                    >
                      <label className="text-xs">{fileName}</label>

                      <FontAwesomeIcon
                        onClick={() => removeFile(fileName, index)}
                        icon={faXmark}
                        className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                      />
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-center gap-3 my-5">
              {updateDraft === "true" ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateDraft}
                    type="button"
                    className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                  >
                    Update Draft
                  </button>
                  <button
                    type="submit"
                    className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                ""
              )}
              {updateDraft === "false" ? (
                <button
                  type="submit"
                  className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                >
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardMemoEdit;
