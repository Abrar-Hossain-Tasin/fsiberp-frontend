import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardMeetingLayout from "./components/Layout/BoardMeetingLayout";
// import Test from "./pages/Test";
import CreateMeeting from "./pages/Meeting/CreateMeeting";
import CreateMeetingMinutes from "./pages/Minutes/CreateMeetingMinutes";
import BoardMeetingDashboard from "./pages/Dashboard/BoardMeetingDashboard";
import MeetingDashboard from "./pages/Meeting/MeetingDashboard";
import MeetingMinutesDashboard from "./pages/Minutes/MeetingMinutesDashboard";
import MeetingView from "./pages/Meeting/MeetingView";
import AgendaAdd from "./pages/Agenda/AgendaAdd";
import MeetingEdit from "./pages/Meeting/MeetingEdit";
import CreateAgenda from "./pages/Agenda/CreateAgenda";
import AgendaEdit from "./pages/Agenda/AgendaEdit";
import AgendaView from "./pages/Agenda/AgendaView";
import AgendaDashboard from "./pages/Agenda/AgendaDashboard";
import ViewMeetingMinutes from "./pages/Minutes/ViewMeetingMinutes";
import EditMeetingMinutes from "./pages/Minutes/EditMeetingMinutes";

const BoardMeetingProject = () => {
  return (
    <Routes>
      <Route element={<BoardMeetingLayout />}>
      <Route path="/" element={<BoardMeetingDashboard />} />
      <Route path="/dashboard" element={<BoardMeetingDashboard />} />
      <Route path="/create-board-meeting" element={<CreateMeeting />} />
      <Route path="/board-meeting-dashboard" element={<MeetingDashboard />} />
      <Route path="/create-meeting-minutes/:id" element={<CreateMeetingMinutes />} />
      <Route path="/view-meeting-minutes/:id" element={<ViewMeetingMinutes />} />
      <Route path="/edit-meeting-minutes/:id" element={<EditMeetingMinutes />} />
      <Route path="/meeting-minutes-dashboard" element={<MeetingMinutesDashboard />} />
      <Route path="/meeting-view/:id" element={<MeetingView />} />
      <Route path="/meeting-edit/:id" element={<MeetingEdit />} />
      <Route path="/create-agenda/:id" element={<CreateAgenda />} />
      <Route path="/edit-agenda/:id" element={<AgendaEdit />} />
      <Route path="/view-agenda/:id" element={<AgendaView />} />
      <Route path="/agenda-add" element={<AgendaAdd />} />
      <Route path="/agenda-dashboard" element={<AgendaDashboard />} />
      </Route>
    </Routes>
  );
};

export default BoardMeetingProject;
