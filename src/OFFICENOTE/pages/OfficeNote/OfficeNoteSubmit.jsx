import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import config from "ckeditor5-custom-build/src/config";
import { useEffect, useState } from "react";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Base_api } from "../../../utils/api/Base_api";
import OfficeNoteHeader from "../../components/OfficeNoteHeader";
import "../../../OFFICENOTE/officeNoteStyle.css";

const OfficeNoteSubmit = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  // const [delegation, setDelegation] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState("");
  const {
    addCheckerUserId,
    addCheckerUserName,
    addCheckerUserStatus,
    official,
  } = useOutletContext();
  const navigate = useNavigate();
  // fetch User
  useEffect(() => {
    fetch(`${Base_api}/api/users/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the response to inspect it
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [userid]);

  // File Upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setDocuments(selectedFiles);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file) => file.name),
    ]);
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("delegation", delegation);
    formData.append("noteSubject", subject);
    formData.append("noteBody", body);
    formData.append("otherApprovalUserIds", addCheckerUserId);
    formData.append("otherApprovalUsernames", addCheckerUserName);
    formData.append("otherApprovalStatuses", addCheckerUserStatus);
    formData.append("divHeadUserid", official.divheadid);
    formData.append("divHeadUsername", official.divhead);
    formData.append("amdUserid", official.amdid);
    formData.append("amdUsername", official.amd);
    formData.append("dmdUserid", official.dmdid);
    formData.append("dmdUsername", official.dmd);
    formData.append("mdUserid", official.mdid);
    formData.append("mdUsername", official.md);

    // formData.append("documents", documents);

    // Append each document individually to FormData
    documents.forEach((file) => {
      formData.append("documents", file); // "documents" is the key expected by the server
    });

    for (const value of formData.values()) {
      // (value);
    }
    try {
      const response = await fetch(
        `${Base_api}/api/officenote/save/${userid}`,
        {
          method: "POST", // Use PUT for updates
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response as JSON

        // Display the error message from the backend
        if (errorData.error) {
          toast.error(errorData.error, {
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
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        toast.success("Note Submitted Successfully...", {
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
          navigate("../dashboard");
        }, 2000);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const placeholder = "Type here......";
  const getConfig = config(placeholder);

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center p-5">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md">
            <OfficeNoteHeader />
            <div className="flex flex-col font-[500] my-1">
              <div className="flex justify-between text-sm">
                <p>{userInfo.department}</p>
                <p>Date: {dayjs().format("DD-MM-YYYY")}</p>
              </div>
              <div className="flex justify-center text-lg font-bold mt-[-10px]">
                <p>Office Note</p>
              </div>
            </div>

            {/* <div className="flex gap-4 font-[500]">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="delegation"
                  id="md"
                  value={1}
                  onChange={(e) => setDelegation(e.target.value)}
                />
                <label htmlFor="md">Delegation of MD</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="delegation"
                  id="bod"
                  value={2}
                  onChange={(e) => setDelegation(e.target.value)}
                />
                <label htmlFor="bod">Delegation of Board of Directors</label>
              </div>
            </div> */}
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
              className="w-full p-1 my-1 border border-gray-400 font-bold"
              data={body}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // ("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
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
                      className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400"
                    >
                      <label className="text-xs">{fileName}</label>

                      <FontAwesomeIcon
                        onClick={() => removeFile(fileName)}
                        icon={faXmark}
                        className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                      />
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <div className="w-full p-1 flex justify-end text-center font-[500]">
              <div className="w-56 my-2 p-2  rounded">
                <div className="relative">
                  <h1 className="">Initiated By</h1>
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black rounded"></span>
                </div>
                <h2>
                  {userInfo.username} ( {userInfo.userid} )
                </h2>
                <h2 className="text-sm font-medium">{userInfo.designation}</h2>
                <h2 className="text-sm font-medium">{userInfo.email}</h2>
                <h2 className="text-sm font-medium">
                  Phone No: {userInfo.contactno}
                </h2>
              </div>
            </div>

            <div className="flex justify-center my-5">
              <button
                type="submit"
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OfficeNoteSubmit;
