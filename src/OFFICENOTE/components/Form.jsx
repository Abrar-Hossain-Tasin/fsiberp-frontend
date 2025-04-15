import dayjs from "dayjs";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import OfficeNoteHeader from "./OfficeNoteHeader";

const Form = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const config = {
    readonly: false,
    minHeight: "245px",
    width: "100%",
    enableDragAndDropFileToEditor: true,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["file", "paragraph"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    toolbarSticky: true,
    // style: {
    //   background: "#27272E",
    //   color: "rgba(255,255,255,0.5)",
    // },
  };

  // const config = useMemo(
  //   () => ({
  //     placeholder: "Start typings...",
  //     showXPathInStatusbar: false,
  //     showCharsCounter: false,
  //     showWordsCounter: false,
  //     toolbarAdaptive: false,
  //     toolbarSticky: true,
  //     buttons: [
  //       "source",
  //       "|",
  //       "bold",
  //       "italic",
  //       "underline",
  //       "brush",
  //       "|",
  //       "ul",
  //       "ol",
  //       "|",
  //       "font",
  //       "fontsize",
  //       "brush",
  //       "paragraph",
  //       "|",
  //       "image",
  //       "table",
  //       "link",
  //       "|",
  //       "left",
  //       "center",
  //       "right",
  //       "justify",
  //       "|",
  //       "undo",
  //       "redo",
  //       "|",
  //       "hr",
  //       "eraser",
  //       "fullsize",
  //     ],
  //   }),
  //   []
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("body", body);
    const data = {
      noteSubject: subject,
      noteBody: content,
    };
    data;
    try {
      const response = await fetch(
        `http://localhost:8080/api/officenote/save/06203`,
        {
          method: "POST", // Use PUT for updates
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      {/* <CustomToolbarGrid /> */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center p-5">
          <div className="p-5 bg-white shadow-[0_5px_10px_0px_gray] rounded-md">
            <OfficeNoteHeader />
            <div className="flex flex-col font-[500] my-1">
              <div className="flex justify-between text-sm">
                <p>ICT Division</p>
                <p>{dayjs().format("DD-MM-YYYY")}</p>
              </div>
              <div className="flex justify-center text-lg font-bold mt-[-10px]">
                <p>Office Note</p>
              </div>
            </div>

            <input
              className="w-full p-1 my-1 border border-gray-400 font-bold"
              type="text"
              value={subject}
              placeholder="Subject here..."
              onChange={(e) => setSubject(e.target.value)}
            />
            <JoditEditor
              ref={editor}
              // config={config}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />

            <button
              type="submit"
              className="my-1 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
