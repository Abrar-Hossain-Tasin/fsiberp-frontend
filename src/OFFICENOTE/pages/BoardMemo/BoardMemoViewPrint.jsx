import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jsPDF } from "jspdf";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { usePDF } from "react-to-pdf";
import "../../../OFFICENOTE/officeNoteStyle.css";
import { Base_api } from "../../../utils/api/Base_api";
import OfficeNoteHeader from "../../components/OfficeNoteHeader";
import "../../officeNoteStyle.css";
import dayjs from "dayjs";

const BoardMemoViewPrint = () => {
  // let { userId, formId, id } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
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

  const userId = "06203";
  const formId = 5001;
  const id = 164;

  const { toPDF, targetRef } = usePDF({
    filename: `${formData.refNo}.pdf`,
  });

  // fetch User
  useEffect(() => {
    fetch(`${Base_api}/api/users/${userId}`)
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
          `${Base_api}/api/boardmemo/official/${userId}`
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
          `${Base_api}/api/boardmemo/user/viewform/${userId}/${formId}/${id}`
        );
        const result = await response.json();
        setFormData(result);
        result;
        setSubject(result.noteSubject);
        setBody(result.noteBody);
        const documentPaths = result.documentPaths;
        setDocuments(result.documentDownloadUrl);
        console.log(formData.otherApprovalUserIds);
        const a = documentPaths.map((item) => item.split("~"));
        const b = a.map((item) => item[item.length - 1]);
        setFiles(b);
        ({ a });
        ({ b });
        result.otherApprovalUserIds;
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
          `${Base_api}/api/boardmemo/emplist/${userId}`
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

  const approvedUsers = (otherApprovalUserIds || [])
    .map((userId) => filteredOptions.find((user) => user.userid === userId))
    .filter((user) => user !== undefined); // Filter out any undefined values
  const lastIndex = approvedUsers.length - 1;

  ({ approvedUsers });

  const contentRef = useRef();

  // const generatePDF = () => {
  //   // const doc = new jsPDF();
  //   var doc = new jsPDF({
  //     orientation: "p",
  //     unit: "px",
  //     format: [1116, 1580],
  //   });

  //   // Using jsPDF's html() method to add HTML content from the ref
  //   // doc.html(contentRef.current, {
  //   //   margin: [50, 50, 50, 50],
  //   //   callback: function (doc) {
  //   //     doc.save("generated.pdf");
  //   //   },
  //   // });
  //   doc.html(contentRef.current, {
  //     margin: [50, 50, 50, 50], // Adjusted margins
  //     autoPaging: true, // Enable auto paging
  //     callback: function (doc) {
  //       doc.save("generated.pdf");
  //     },
  //   });
  // };

  // const generatePDF = async () => {
  //   const doc = new jsPDF({
  //     orientation: "p",
  //     unit: "px",
  //     format: [2480, 3508], // Set your desired page size
  //   });

  //   const content = contentRef.current; // Reference to your content
  //   const pageHeight = doc.internal.pageSize.height; // Get height of PDF page
  //   const margin = 50; // Margin for content
  //   let contentHeight = content.scrollHeight; // Get total height of content

  //   (pageHeight, contentHeight);

  //   // Function to add content to the PDF
  //   const addContentToPDF = async (htmlContent) => {
  //     return new Promise((resolve) => {
  //       doc.html(htmlContent, {
  //         margin: [margin, margin, margin, margin],
  //         callback: function () {
  //           resolve();
  //         },
  //         x: margin,
  //         y: margin,
  //         html2canvas: { scale: 2.3 }, // Optional: Increase scale for better quality
  //       });
  //     });
  //   };

  //   let currentPage = 0;
  //   let renderedHeight = 0; // Track height rendered on the current page

  //   while (renderedHeight < contentHeight) {
  //     // Create a new page if needed
  //     if (currentPage > 0) {
  //       doc.addPage();
  //     }

  //     // Render the content on the current page
  //     await addContentToPDF(content);

  //     // Update the rendered height
  //     renderedHeight += pageHeight - margin; // Adjust for margin
  //     ({ renderedHeight });
  //     currentPage++;
  //   }

  //   // Save the PDF after rendering all pages
  //   doc.save("generated.pdf");
  // };

  // const generatePDF = async () => {
  //   const doc = new jsPDF({
  //     orientation: "p",
  //     unit: "px",
  //     format: [2480, 3508], // Set your desired page size (A4 size in pixels)
  //   });

  //   const content = contentRef.current; // Reference to your content
  //   const pageHeight = doc.internal.pageSize.height; // Get the height of the page
  //   const margin = 50; // Margin for content
  //   const headerHeight = 80; // Height of the header
  //   let contentHeight = content.scrollHeight; // Get total height of content

  //   (pageHeight, contentHeight);

  //   // HTML content for the header (you can customize it as needed)
  //   const headerHtml = `
  //     <div style="width: 100%; text-align: center; font-size: 18px; font-weight: bold; padding: 10px;">
  //       <h1>My Fixed Header</h1>
  //       <p style="font-size: 14px;">A brief description or tagline here.</p>
  //       <hr style="border: 1px solid #000;" />
  //     </div>
  //   `;

  //   // Function to draw the header (HTML version not required)
  //   const drawHeader = () => {
  //     // Set font style for header text
  //     doc.setFontSize(18);
  //     doc.setFont("helvetica", "bold");

  //     // Draw the header text
  //     doc.text("My Fixed Header", margin, headerHeight - 40); // Adjust position as needed
  //     doc.setFontSize(12);
  //     doc.text(
  //       "A brief description or tagline here.",
  //       margin,
  //       headerHeight - 20
  //     ); // Adjust position as needed

  //     // Draw a horizontal line
  //     doc.setLineWidth(0.5);
  //     doc.line(margin, headerHeight - 10, 2480 - margin, headerHeight - 10); // Horizontal line under the header
  //   };

  //   // Function to add content to the PDF
  //   const addContentToPDF = async (htmlContent) => {
  //     return new Promise((resolve) => {
  //       doc.html(htmlContent, {
  //         margin: [margin, margin, margin, margin],
  //         callback: function () {
  //           resolve();
  //         },
  //         x: margin,
  //         y: headerHeight, // Start content below the header
  //         html2canvas: { scale: 2.3 }, // Optional: Increase scale for better quality
  //       });
  //     });
  //   };

  //   let currentPage = 0;
  //   let renderedHeight = headerHeight; // Start from the height of the header

  //   while (renderedHeight < contentHeight) {
  //     // Create a new page if needed
  //     if (currentPage > 0) {
  //       doc.addPage();
  //     }

  //     // Draw the header on the current page
  //     drawHeader();

  //     // Render the content on the current page
  //     await addContentToPDF(content);

  //     // Update the rendered height (subtracting the header height from the total page height)
  //     renderedHeight += pageHeight - headerHeight - margin;
  //     ({ renderedHeight });
  //     drawHeader();
  //     currentPage++;
  //   }

  //   // Save the PDF after rendering all pages
  //   doc.save("generated.pdf");
  // };

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: [2480, 3508], // Set your desired page size (A4 size in pixels)
    });

    const content = contentRef.current; // Reference to your content
    const pageHeight = doc.internal.pageSize.height; // Get the height of the page
    const margin = 70; // Margin for content
    const headerHeight = 80; // Height of the header
    let contentHeight = content.scrollHeight; // Get total height of content

    // Adjust the start of the content to leave space for the header
    let yPosition = headerHeight;

    const addContentToPDF = (htmlContent, yPosition) => {
      return new Promise((resolve) => {
        doc.html(htmlContent, {
          margin: [margin, margin, margin, margin],
          callback: function () {
            resolve();
          },
          x: margin,
          y: yPosition, // Start content below the header
          html2canvas: { scale: 2.4 }, // Optional: Increase scale for better quality
        });
      });
    };

    const drawHeader = () => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("My Fixed Header", margin, headerHeight - 40);
      doc.setFontSize(12);
      doc.text(
        "A brief description or tagline here.",
        margin,
        headerHeight - 20
      );
      doc.setLineWidth(0.5);
      doc.line(margin, headerHeight - 10, 2480 - margin, headerHeight - 10);
    };

    // Function to handle content and prevent splitting the last line
    while (yPosition < contentHeight) {
      // Check if there's enough space on the current page for the next part of the content
      const availableSpace = pageHeight - yPosition - margin;

      // Create a new page if content does not fit
      if (availableSpace < 100) {
        // 100px buffer for last part of content
        doc.addPage();
        drawHeader(); // Draw the header on the new page
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
    doc.save("generated.pdf");
  };

  const convertToBengaliNumerals = (dateStr) => {
    const engToBn = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return dateStr.replace(/[0-9]/g, (digit) => engToBn[digit]);
  };

  return (
    <div className="h-full p-5 overflow-auto">
      <div ref={contentRef}>
        <div
          // ref={contentRef}
          className="h-full p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md "
        >
          <div className="w-full border shadow-md p-5">
            <OfficeNoteHeader />
            <div className="flex flex-col font-[500] my-1">
              <div className="flex justify-between text-sm">
                <p>{userInfo.nativeDivisionName}</p>
                <p>তারিখ: {convertToBengaliNumerals(dayjs(formData.submitDate).locale("bn").format("DD-MM-YYYY"))}</p>
              </div>
              <div className="flex justify-end text-sm">
                <p>Ref No. {formData.refNo}</p>
              </div>
              <div className="flex justify-center text-lg font-bold mt-[-10px]">
                <p className="underline">Office Note</p>
              </div>
            </div>
            <p className="font-bold text-[15pt] ">Subject : {subject}</p>
            <hr className="my-2" />
            {
              <div
                className="mb-5"
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
                        (2 + index) % 2 === 0 ? "justify-end" : "justify-start"
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
        <div className="w-full flex justify-end gap-2 mb-3 text-sm items-center">
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

      {/* <form className="h-full p-5">
        <div
          id="content"
          className="h-full p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md overflow-auto"
        >
          <div className="w-full border shadow-md p-5">
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
            <p className="font-bold text-[15pt] ">Subject : {subject}</p>
            <hr className="my-2" />
            {
              <div
                className="mb-5"
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
                        (2 + index) % 2 === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex flex-col text-center">
                        <div className="w-80 my-2 p-2 rounded">
                          <div className="relative">
                            <h1 className="mb-2">Checked By</h1>
                            
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
          <div></div>
        </div>
      </form>
      <div className="w-full flex justify-end gap-2 mb-3 text-sm items-center">
        <p
          className="w-40 m-3 text-center font-[500] text-white shadow cursor-pointer bg-[#2196F3] p-1 rounded hover:bg-[#0f85e6]"
          onClick={() => toPDF()}
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faDownload} />
          </span>
          Download PDF
        </p>
      </div> */}
    </div>
  );
};

export default BoardMemoViewPrint;
