import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import OfficeNoteSideBar from "../OfficeNoteSideBar";
import OfficeNoteFooter from "../OfficeNoteFooter";
import OfficeNoteNavbar from "../OfficeNoteNavbar";
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";

const OfficeNoteLayout = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [addCheckerUserId, setAddCheckerUserId] = useState([]);
  const [addCheckerUserName, setAddCheckerUserName] = useState([]);
  const [addCheckerUserStatus, setAddCheckerUserStatus] = useState([]);

  const [official, setOfficial] = useState([]);

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/officenote/official/${userid}`
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
    <div className="flex flex-col h-[100vh] w-screen overflow-hidden">
      <OfficeNoteNavbar />
      <div className="flex flex-grow w-screen overflow-hidden">
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
          <OfficeNoteSideBar
            setAddCheckerUserId={setAddCheckerUserId}
            setAddCheckerUserName={setAddCheckerUserName}
            setAddCheckerUserStatus={setAddCheckerUserStatus}
            official={official}
          />
        </div>
      </div>
      <div>
        <OfficeNoteFooter />
      </div>
    </div>
  );
};

export default OfficeNoteLayout;
