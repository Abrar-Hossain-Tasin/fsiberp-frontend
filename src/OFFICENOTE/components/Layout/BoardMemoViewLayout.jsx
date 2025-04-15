import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import OfficeNoteViewSideBar from "../OfficeNoteViewSideBar";
import OfficeNoteNavbar from "../OfficeNoteNavbar";
import OfficeNoteFooter from "../OfficeNoteFooter";
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { decryptId } from "../../../pages/Encrypted/Encrypted";
import BoardMemoViewSideBar from "../BoardMemoViewSideBar";

const BoardMemoViewLayout = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  let { type, userId, formId, id } = useParams();
  const [addCheckerUserId, setAddCheckerUserId] = useState([]);
  const [addCheckerUserName, setAddCheckerUserName] = useState([]);
  const [addCheckerUserStatus, setAddCheckerUserStatus] = useState([]);

  const [official, setOfficial] = useState([]);

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const response = await fetch(
          `${Base_api}/api/boardmemo/official/${decryptedUserId}`
        );
        const result = await response.json();
        setOfficial(result);
      } catch (error) {
        console.error("Error fetching approvers:", error);
      }
    };

    fetchApprovers();
  }, [userid]);

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <OfficeNoteNavbar />
      <div className="flex flex-grow overflow-auto">
        <div className="flex flex-grow justify-center overflow-auto  bg-[url('../src/assets/mega.png')] bg-white bg-cover bg-center">
          {
            <Outlet
              context={{
                addCheckerUserId,
                addCheckerUserName,
                addCheckerUserStatus,
                official,
              }}
            />
          }
        </div>
        <div className="overflow-auto min-w-[350px]">
          <BoardMemoViewSideBar
            setAddCheckerUserId={setAddCheckerUserId}
            setAddCheckerUserName={setAddCheckerUserName}
            setAddCheckerUserStatus={setAddCheckerUserStatus}
            official={official}
          />
        </div>
      </div>
      <OfficeNoteFooter />
    </div>
  );
};

export default BoardMemoViewLayout;
