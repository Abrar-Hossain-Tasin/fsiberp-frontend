import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jsPDF } from "jspdf";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import "../../../OFFICENOTE/officeNoteStyle.css";
import { decryptId } from "../../../pages/Encrypted/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";
import OfficeNoteHeader from "../../components/OfficeNoteHeader";

const OfficeNoteView = () => {
  let { userId, formId, id } = useParams();
  const navigate = useNavigate();
  const decryptedUserId = decryptId(userId);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [delegation, setDelegation] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [offData, setOffData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const contentRef = useRef();

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
          `${Base_api}/api/officenote/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const result = await response.json();
        setFormData(result);
        setDelegation(result.delegation);
        console.log(result.delegation);
        console.log(result);
        setSubject(result.noteSubject);
        setBody(result.noteBody);
        const documentPaths = result.documentPaths;
        setDocuments(result.documentDownloadUrl);

        const a = documentPaths.map((item) => item.split("~"));
        const b = a.map((item) => item[item.length - 1]);
        setFiles(b);
        // ({ a });
        // ({ b });
        // (result.otherApprovalUserIds);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/officenote/emplist/${decryptedUserId}`
        );
        const data = await response.json();
        ({ data });
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  // Filter users based on otherApprovalUserIds
  const otherApprovalUserIds = formData.otherApprovalUserIds;

  ({ otherApprovalUserIds });

  // // Filter users based on otherApprovalUserIds
  // const approvedUsers = filteredOptions.filter(user =>
  //   otherApprovalUserIds.includes(user.userid) // Check if userid is in the approval list
  // );

  // // Filter users based on otherApprovalUserIds
  // const approvedUsers = filteredOptions.filter((user) =>
  //   otherApprovalUserIds.includes(user.userid)
  // );

  // Filter users based on otherApprovalUserIds while maintaining index alignment
  const approvedUsers = (otherApprovalUserIds || [])
    .map((userId) => filteredOptions.find((user) => user.userid === userId))
    .filter((user) => user !== undefined); // Filter out any undefined values
  const lastIndex = approvedUsers.length - 1;

  ({ approvedUsers });

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
      <div className="shadow-[0_5px_10px_0px_gray] rounded-md">
        <div ref={contentRef} className="flex justify-center w-full">
          <div className="flex justify-center p-5">
            <div className="p-5 w-[950px] bg-white shadow-[0_5px_10px_0px_gray] rounded-md">
              <OfficeNoteHeader />
              <div className="flex flex-col font-[500] my-1">
                <div className="flex justify-between text-sm">
                  <p>{userInfo.department}</p>
                  <p>Date: {formData.submitDate}</p>
                </div>
                <div className="flex justify-end text-sm">
                  <p>Ref No. {formData.refNo}</p>
                </div>
                <div className="flex justify-center text-lg font-bold mt-[-10px]">
                  <p className="underline">Office Note</p>
                </div>
              </div>
              {/* <div className="flex gap-4 font-[500]">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="delegation"
                    id="md"
                    value={1}
                    checked={delegation === 1}
                    readOnly
                  />
                  <label htmlFor="md">Delegation of MD</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="delegation"
                    id="bod"
                    value={2}
                    checked={delegation === 2}
                    readOnly
                  />
                  <label htmlFor="bod">Delegation of Board of Directors</label>
                </div>
              </div> */}
              <p className="font-bold text-[15pt] ">Subject : {subject}</p>
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

              <div className="w-full flex flex-wrap justify-between gap-2 p-10 font-[500]">
                <div className=" w-[45%] h-32">
                  <div className="flex h-full items-start justify-start">
                    <div className="flex flex-col text-center">
                      <div className="w-80 my-2 p-2 rounded">
                        <h1 className="mb-2">Initiated By</h1>
                        <div className="flex w-full border border-t-1 border-black"></div>
                        <h2>
                          {userInfo.username} ( {userInfo.userid} )
                        </h2>
                        <h2 className="text-sm font-medium">
                          {userInfo.designation}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                {approvedUsers.map((user, index) => (
                  <div key={user.userid} className=" w-[45%] h-32">
                    {formData.otherApprovalStatuses[index] === "Accepted" ? (
                      <div
                        className={`flex h-full items-start ${
                          (2 + index) % 2 === 0
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="flex flex-col text-center">
                          <div className="w-80 my-2 p-2 rounded">
                            <div className="relative">
                              <h1 className="mb-2">Checked By</h1>
                              {/* <h2>
                          {formData.otherApprovalStatuses[index] ||
                            "Unknown Status"}
                        </h2> */}
                              <div className="flex w-full border border-t-1 border-black"></div>
                            </div>
                            <h2>
                              {user.username} ( {user.userid} )
                            </h2>
                            <h2 className="text-sm font-medium">
                              {user.designation}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

                {formData.divHeadStatus === "Accepted" ? (
                  <div className=" w-[45%] h-32">
                    <div
                      className={`flex h-full items-start ${
                        (1 + lastIndex) % 2 === 0
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex flex-col text-center">
                        <div className="w-80 my-2 p-2 rounded">
                          <h1 className="mb-2">Checked By</h1>
                          {/* <h2>{formData.divHeadStatus || "Unknown Status"}</h2> */}
                          <div className="flex w-full border border-t-1 border-black"></div>
                          <h2>
                            {offData.divhead} ( {offData.divheadid} )
                          </h2>
                          <h2 className="text-sm font-medium">
                            {offData.divheaddesg}
                          </h2>
                          <h2 className="text-sm font-medium">
                            Head Of {userInfo.department}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="px-10">
                <div className="w-full flex flex-col justify-between gap-2  font-[500]">
                  <div className="flex justify-between">
                    {formData.dmdStatus === "Accepted" ? (
                      <div className=" w-[45%] h-32">
                        <div className="flex h-full items-start justify-start">
                          <div className="flex flex-col text-center">
                            <div className="w-80 my-2 p-2 rounded">
                              <h1 className="mb-2">Approved By</h1>
                              {/* <h2>{formData.dmdStatus || "Unknown Status"}</h2> */}
                              <div className="flex w-full border border-t-1 border-black"></div>
                              <h2>
                                {offData.dmd} ( {offData.dmdid} )
                              </h2>
                              <h2 className="text-sm font-medium">
                                {offData.dmddesg}, Please
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {formData.amdStatus === "Accepted" ? (
                      <div className=" w-[45%] h-32">
                        <div className="flex h-full items-start justify-end">
                          <div className="flex flex-col text-center">
                            <div className="w-80 my-2 p-2 rounded">
                              <h1 className="mb-2">Approved By</h1>
                              {/* <h2>{formData.amdStatus || "Unknown Status"}</h2> */}
                              <div className="flex w-full border border-t-1 border-black"></div>
                              <h2>
                                {offData.amd} ( {offData.amdid} )
                              </h2>
                              <h2 className="text-sm font-medium">
                                {offData.amddesg}, Please
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {formData.mdStatus === "Accepted" ? (
                    <div className="flex justify-center">
                      <div className=" w-[45%] h-32">
                        <div className="flex h-full items-start justify-center">
                          <div className="flex flex-col text-center">
                            <div className="w-80 my-2 p-2 rounded">
                              <h1 className="mb-2">Approved By</h1>
                              {/* <h2>{formData.mdStatus}</h2> */}
                              <div className="flex w-full border border-t-1 border-black"></div>
                              <h2>
                                {offData.md} ( {offData.mdid} )
                              </h2>
                              <h2 className="text-sm font-medium">
                                {offData.mddesg}, Please
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-2 mb-3 text-sm items-center">
          {formData.mdStatus === "Accepted" && delegation === 2 ? (
            <p
              onClick={() => navigate(`../create-board-memo/${formData.id}`)}
              className="w-40 m-3 text-center font-[500] text-white shadow cursor-pointer bg-[#2196F3] p-1 rounded hover:bg-[#0f85e6]"
            >
              Create Memo
            </p>
          ) : (
            ""
          )}

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
    </div>
  );
};

export default OfficeNoteView;
