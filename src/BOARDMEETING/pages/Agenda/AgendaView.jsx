import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import config from "ckeditor5-custom-build/src/config";
import { useEffect, useState,useRef } from "react";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { decryptId } from "../../../pages/Encrypted/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { encryptId } from "../../../pages/Encrypted/Encrypted";
import './AgendaStyle.css';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jsPDF } from "jspdf";

const AgendaView = () => {

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { md, userid } = decoded;

  const { userId, formId, id } = useParams();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadDocuments, setLoadDocuments] = useState([]);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const contentRef = useRef();
  // const {
  //   addCheckerUserId,
  //   addCheckerUserName,
  //   addCheckerUserStatus,
  //   official,
  // } = useOutletContext();
  const navigate = useNavigate();
  const decryptedUserId = decryptId(userId);
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
        console.log({ result });
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

  const handleView = (userId, formId, id) => {
    console.log("userId ", userId);
        navigate(
          `/office-note/board-memo/view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(
            id
          )}` 
        );
      };

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

  const openModal = (type) => {
      setActionType(type);
      setShowModal(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    };
  
    const handleAccept = (id,meetingId) => {
      console.log("id ", id);
      setSelectedId(id); 
      setMeetingId(meetingId);
      setStatus("Accepted");
      openModal("Accepted");
    };
  
    const handleReject = (id,meetingId) => {
      console.log("handleReject");
      setSelectedId(id); 
      setMeetingId(meetingId);
      setStatus("Rejected");
      openModal("Rejected");
    };
  
    const handleConfirm = () => {
      setShowModal(false);
      handleAcceptReject(actionType, selectedId, meetingId); // Pass the selected ID
    };

    const handlePending = async (id,meetingId) => {
      console.log("handlePending", id)
      // e.preventDefault();
      setStatus("Pending");
      
  
      try {
        const response = await fetch(
          `${Base_api}/api/agendas/proceedNextMeeting/${id}`,
          {
            method: "PUT", // Use PUT for updates
            // body: formData,
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
          toast.success("Agenda has been moved to the next meeting!", {
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
            navigate(`/board-meetings/meeting-view/${encryptId(meetingId)}`);
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const closeModal = () => {
      setShowModal(false);
      document.body.style.overflow = "auto"; // Re-enable scrolling
    };
  
    const handleDone = (e) => {
      e.preventDefault();
      setStatus("Done");
      openModal("Done");
    };
  
    const handleAcceptReject = async (newStatus, ids, meetingId) => { // Accept id as a parameter
      try {
        const formData = {
          status: newStatus,
          comment,
        };
        console.log("formData ", ids);
  
        const response = await fetch(
          `${Base_api}/api/bmms/approval/${userid}/${ids}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          toast.success(`${newStatus} successfully!`, { autoClose: 2000 });
          setTimeout(() => {
            navigate(`/board-meetings/meeting-view/${encryptId(meetingId)}`);
          }, 2000); // Redirect after 2 seconds
        } else {
          toast.error("Error submitting approval!", { autoClose: 2000 });
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred!", { autoClose: 2000 });
      }
    };


  const convertToBengaliNumerals = (dateStr) => {
    const engToBn = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return dateStr.replace(/[0-9]/g, (digit) => engToBn[digit]);
  };

  const generatePDF = async () => {
      const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: [2480, 3508], // Set your desired page size (A4 size in pixels)
      });
  
      const content = contentRef.current; // Reference to your content
      const pageHeight = doc.internal.pageSize.height; // Get the height of the page
      const margin = 80; // Margin for content
      const headerHeight = 20; // Height of the header
      let contentHeight = content.scrollHeight; // Get total height of content
  
      // Adjust the start of the content to leave space for the header
      let yPosition = headerHeight;
  
      const addContentToPDF = (htmlContent, yPosition) => {
        return new Promise((resolve) => {
          doc.html(htmlContent, {
            margin: [margin, 40, margin, 20],
            callback: function () {
              resolve();
            },
            x: margin,
            y: yPosition, // Start content below the header
            html2canvas: { scale: 2.3 }, // Optional: Increase scale for better quality
          });
        });
      };
  
      // Function to handle content and prevent splitting the last line
      while (yPosition < contentHeight) {
        // Check if there's enough space on the current page for the next part of the content
        const availableSpace = pageHeight - yPosition - margin;
  
        // Create a new page if content does not fit
        if (availableSpace < 100) {
          // 100px buffer for last part of content
          doc.addPage();
          yPosition = headerHeight; // Reset yPosition to the top of the new page
        }
  
        // Add content to the current page
        await addContentToPDF(content, yPosition);
  
        // Update the yPosition to where the content ends
        const contentHeightOnPage = doc.lastAutoTable
          ? doc.lastAutoTable.finalY
          : doc.internal.pageSize.height;
        yPosition = contentHeightOnPage + margin; // Adjust for the bottom of the content area
      }
  
      // Save the PDF after rendering all pages
      doc.save(`${formData.refNo}.pdf`);
    };

  return (
    <div className="w-full">
      <ToastContainer />
      {/* <form onSubmit={handleUpdate}> */}
      <div ref={contentRef} className="flex justify-center w-full">
        <div className="flex justify-center a4-size">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md w-full">
          
            <div className="flex flex-col font-[500] my-1">
              <div className="w-full flex-row">
                <div className="flex justify-center">
                  <p>{formData.department}</p>
                                   </div>
                                   <div className="flex justify-end text-sm">
                                     {/* <p>Date: {formData.submitDate}</p> */}
                                     <p>তারিখ: {convertToBengaliNumerals(dayjs(formData.submitDate).locale("bn").format("DD-MM-YYYY"))}</p>
                                   </div>
                                 </div>
                               </div>
                 
                               <p className="font-bold text-[15pt] mt-5">বিষয় : {subject}</p>
                               <hr className="my-2" />
                               {
                                 <div
                                   className="mb-5 officeNote"
                                   dangerouslySetInnerHTML={{ __html: body }}
                                 ></div>
                               }
                               <div className="p-2 border border-slate-40 rounded">
                                 <p>Attachment: </p>
                                 {files.length !== 0 ? (
                                   files.map((file, index) => {
                                     const url = documents[index]; // Assuming same length and order of files and documents
                                     return (
                                       <div key={index}>
                                         <div
                                           onClick={() => window.open(url, "_blank")}
                                           className="bg-slate-300 text-slate-700 py-1 px-2 m-1 rounded font-[500] cursor-pointer"
                                         >
                                           {/* Display file and its corresponding document URL */}
                                           {file}
                                         </div>
                                       </div>
                                     );
                                   })
                                 ) : (
                                   <p className="text-center font-[500]">
                                     No Attachment has been uploaded.
                                   </p>
                                 )}
                               </div>
                               <div className="flex justify-center gap-5 mt-10 mb-10">
                              {userid === md && (
                                <>
                                  <button
                                    className="text-green-900 p-2 px-4 rounded-lg text-lg font-semibold border border-green-900 bg-transparent 
                                    hover:bg-green-700 hover:text-white shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                                    // onClick={handleAccept}
                                    onClick={() =>
                                      handleAccept(
                                        formData.id,
                                        formData.meetingId,
                                      )
                                    }
                                  >
                                    Agenda Approve
                                  </button>
                                  <button
                                    className="text-red-900 p-2 px-4 rounded-lg text-lg font-semibold border border-red-900 bg-transparent 
                                    hover:bg-red-700 hover:text-white shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                                    // onClick={handleReject}
                                    onClick={() =>
                                      handleReject(
                                        formData.id,
                                        formData.meetingId,
                                      )
                                    }
                                  >
                                    Agenda Reject
                                  </button>
                                  <button
                                    className="text-blue-900 p-2 px-4 rounded-lg text-lg font-semibold border border-blue-900 bg-transparent 
                                    hover:bg-blue-700 hover:text-white shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
                                    // onClick={handlePending}
                                    onClick={() =>
                                      handlePending(
                                        formData.id,
                                        formData.meetingId,
                                      )
                                    }
                                  >
                                    Proceed For Next Meeting
                                  </button>
                                </>
                              )}
                            </div>

          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className="text-lg font-bold">
                Are you sure you want to{" "}
                {actionType === "Accepted" ? "Accept" : "Reject"}?
              </h2>
              <div className="mt-4">
                <button
                  onClick={handleConfirm}
                  className="text-white bg-green-500 px-4 py-2 rounded mr-2"
                >
                  OK
                </button>
                <button
                  onClick={closeModal}
                  className="text-white bg-red-500 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end gap-2 mb-3 text-sm items-center">
                {/* {formData.mdStatus === "Accepted" && delegation === 2 ? ( */}
                  <p
                    onClick={() => {
                      handleView(
                        formData.userid,
                        (formData.formId = "6001"),
                        formData.boardMemoId,
                        formData
                      )
                    }}
                    className="w-40 m-3 text-center font-[500] text-white shadow cursor-pointer bg-[#2196F3] p-1 rounded hover:bg-[#0f85e6]"
                  >
                    View Memo
                  </p>
                {/* ) : (
                  ""
                )} */}
      
                <p
                  className="w-40 m-3 text-center font-[500] text-white shadow cursor-pointer bg-[#2196F3] p-1 rounded hover:bg-[#0f85e6]"
                  onClick={generatePDF}
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  Download PDF
                </p>
              </div>
    </div>
  );
};

export default AgendaView;
