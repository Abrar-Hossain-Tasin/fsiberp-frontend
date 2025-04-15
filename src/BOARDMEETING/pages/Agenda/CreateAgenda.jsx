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
import { jwtDecode } from "jwt-decode";

// import OfficeNoteHeader from "../../components/OfficeNoteHeader";
// import "../../../OFFICENOTE/officeNoteStyle.css";
const CreateAgenda = () => {
   const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const { userid } = decoded;
  const { userId, formId, id } = useParams();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadDocuments, setLoadDocuments] = useState([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  // const {
  //   addCheckerUserId,
  //   addCheckerUserName,
  //   addCheckerUserStatus,
  //   official,
  // } = useOutletContext();
  const navigate = useNavigate();
  const decryptedUserid = decryptId(userid);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);

  // fetch User
  // useEffect(() => {
  //   fetch(`${Base_api}/api/users/${decryptedUserId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Log the response to inspect it
  //       setUserInfo(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${Base_api}/api/agendas/view/${decryptedId}`
        );
        const result = await response.json();
        // console.log({ userid });
        setFormData(result);

        setSubject(result.agendaSubject);
        setBody(result.agendaBody);

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
        `${Base_api}/api/agendas/removefile/${decryptId(id)}/${index}`,
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

    // ({ addCheckerUserId });
    const formData = new FormData();
    formData.append("agendaSubject", subject);
    formData.append("agendaBody", body);
    // formData.append("draft", 0);
    // formData.append("otherApprovalUserIds", addCheckerUserId);
    // formData.append("otherApprovalUsernames", addCheckerUserName);
    // formData.append("otherApprovalStatuses", addCheckerUserStatus);
    // formData.append("documents", documents);

    // Append each document individually to FormData

    loadDocuments.forEach((file) => {
      formData.append("documents", file); // "documents" is the key expected by the server
    });
    console.log("userid ", userid);
    try {
      const response = await fetch(
        `${Base_api}/api/agendas/update/${userid}/${decryptedId}`,
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
        toast.success("Agenda Created successfully!", {
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
      console.error("Error:", error);
    }
  };

  const convertToBengaliNumerals = (dateStr) => {
    const engToBn = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return dateStr.replace(/[0-9]/g, (digit) => engToBn[digit]);
  };

  const placeholder = "টাইপ করুন.....";
    const getConfig = config(placeholder);

  return (
    <div className="w-2/3">
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <div className="flex justify-center p-5">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md">
            {/* <OfficeNoteHeader /> */}
            <div className="flex flex-col font-[500] my-1">
              <div className="w-full flex-row">
                <div className="flex justify-center">
                  <p>{formData.department}</p>
                </div>
                <div className="flex justify-end text-sm">
                  <p>তারিখ: {convertToBengaliNumerals(dayjs().locale("bn").format("DD-MM-YYYY"))}</p>
                </div>
                <div className="flex justify-center text-lg font-bold mt-[-10px]">
                <p>Board Agenda</p>
              </div>
              </div>

              {/* <div className="flex justify-start text-sm font-bold ">
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
              </div> */}
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
              {/* {updateDraft === "true" ? (
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
              )} */}
              {/* {updateDraft === "false" ? ( */}
                <button
                  type="submit"
                  className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                >
                  Submit
                </button>
              {/* ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAgenda;
