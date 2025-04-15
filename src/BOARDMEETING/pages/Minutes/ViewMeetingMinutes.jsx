import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import config from "ckeditor5-custom-build/src/config";
import { useEffect, useState, useRef } from "react";
import Bank_Logo_Large from '../../../assets/Bank_Logo_Large.png'; 
import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from '../../../pages/Encrypted/Encrypted';
import './MinutesStyle.css';
import { jsPDF } from "jspdf";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const ViewMeetingMinutes = () => {
  const { id } = useParams();
  const decryptedId = parseInt(decryptId(id), 10);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const contentRef = useRef();
  // fetch User
  // useEffect(() => {
  //   fetch(`${Base_api}/api/users/${userid}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Log the response to inspect it
  //       setUserInfo(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //     });
  // }, [userid]);

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
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${Base_api}/api/meeting-minutes/view/${decryptedId}`
        );
        const result = await response.json();
        console.log({ result });
        setFormData(result);

        setSubject(result.meetingSubject);
        setBody(result.meetingSummary);

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
      <div ref={contentRef} className="flex justify-center w-full">
        <div className="flex justify-center a4-size">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md w-full">
           
            <div className="flex flex-col font-[500] my-1">
              <div className="flex justify-center p-5 ">
              <img src={Bank_Logo_Large} alt="Company Logo" className="h-16" />
              </div>
              <div className="w-full flex-row">
                <div className="flex justify-end text-sm">
                <p>তারিখ: {convertToBengaliNumerals(dayjs(formData.submitDate).locale("bn").format("DD-MM-YYYY"))}</p>
              </div>
              </div>
            </div>
              
                      <p className="font-bold text-[15pt] m-5 text-center underline">{subject}</p>
                      <hr className="my-2" />
                      {
                        <div
                          className="mb-5 officeNote"
                          dangerouslySetInnerHTML={{ __html: body }}
                        ></div>
                      }
                      {/* <div className="p-2 border border-slate-40 rounded">
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
                      </div> */}

          </div>
        </div>
      </div>

 <div className="w-full flex justify-end mb-3 p-6 text-sm items-center">
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

export default ViewMeetingMinutes;
