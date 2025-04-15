import React from "react";
import { Outlet } from "react-router-dom";
import BoardMeetingNavber from "./BoardMeetingNavber";
import BoardMeetingFooter from "./BoardMeetingFooter";

const BoardMeetingLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <BoardMeetingNavber />
      
      <div className="flex flex-grow w-screen overflow-hidden">
        <div className="flex flex-grow justify-center overflow-auto  bg-[url('../src/assets/mega.png')] bg-white bg-cover bg-center">
          {
            <Outlet />
          }
          </div>
          </div>
          <div>
          <BoardMeetingFooter />
      </div>
    </div>
  );
};

export default BoardMeetingLayout;
