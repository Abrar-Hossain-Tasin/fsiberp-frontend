import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../officeNoteStyle.css";
import OfficeNoteHeader from "./OfficeNoteHeader";

const ViewNote = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  let { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:8080/api/officenote/view/${id}`
        );
        const result = await response.json();
        result;
        setSubject(result.noteSubject);
        setBody(result.noteBody);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  return (
    <form className="w-full">
      <div className="flex justify-center p-5 bg-white">
        <div className="p-5 w-full border shadow-md mx-5">
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
          <p className="font-bold text-[20pt]">{subject}</p>
          <hr />
          {<div dangerouslySetInnerHTML={{ __html: body }}></div>}
        </div>
      </div>
    </form>
  );
};

export default ViewNote;
