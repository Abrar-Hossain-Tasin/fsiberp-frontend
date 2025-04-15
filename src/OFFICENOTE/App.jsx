import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewNote from "./components/ViewNote";
import OfficeNoteDashboard from "./pages/OfficeNoteDashboard";
import OfficeNoteDashboardLayout from "./components/Layout/OfficeNoteDashboardLayout";
import OfficeNoteViewForm from "./pages/OfficeNoteViewForm";
import OfficeNoteEditForm from "./pages/OfficeNoteEditForm";
import OfficeNoteSubmit from "./pages/OfficeNote/OfficeNoteSubmit";
import OfficeNoteAdminDashboard from "./pages/OfficeNoteAdminDashboard";
import OfficeNoteViewLayout from "./components/Layout/OfficeNoteViewLayout";
import OfficeNoteLayout from "./components/Layout/OfficeNoteLayout";
import Hello from "./pages/Hello";
import OfficeNoteViewPrint from "./pages/OfficeNote/OfficeNoteViewPrint";
import DemoTable from "./components/DemoTable";
import BoardMemoSubmit from "./pages/BoardMemo/BoardMemoSubmit";
import BoardMemoDashboard from "./pages/BoardMemoDashboard";
import BoardMemoViewLayout from "./components/Layout/BoardMemoViewLayout";
import BoardMemoEditForm from "./pages/BoardMemoEditForm";
import BoardMemoViewForm from "./pages/BoardMemoViewForm";
import BoardMemoLayout from "./components/Layout/BoardMemoLayout";
import BoardMemoAdminDashboard from "./pages/BoardMemoAdminDashboard";

const OfficeNoteProject = () => {
  return (
    <Routes>
      <Route element={<OfficeNoteDashboardLayout />}>
        <Route path="/" element={<OfficeNoteDashboard />} />
        <Route path="/dashboard" element={<OfficeNoteDashboard />} />
        <Route path="/admin-dashboard" element={<OfficeNoteAdminDashboard />} />
        <Route path="/board-memo-dashboard" element={<BoardMemoDashboard />} />
        <Route path="/board-memo-admin-dashboard" element={<BoardMemoAdminDashboard />} />
      </Route>

      <Route element={<OfficeNoteLayout />}>
        <Route path="/create-office-note" element={<OfficeNoteSubmit />} />

        <Route path="/hello" element={<Hello />} />
        <Route path="/OfficeNoteViewPrint" element={<OfficeNoteViewPrint />} />
        <Route path="/DemoTable" element={<DemoTable />} />
        <Route path="/:id" element={<ViewNote />} />
      </Route>

      <Route element={<BoardMemoLayout />}>
        <Route
          path="/create-board-memo/:noteId"
          element={<BoardMemoSubmit />}
        />
      </Route>

      <Route element={<OfficeNoteViewLayout />}>
        <Route
          path="/:type/:userId/:formId/:id"
          element={<OfficeNoteViewForm />}
        />
        <Route
          path="/:type/:userId/:formId/:id"
          element={<OfficeNoteEditForm />}
        />
      </Route>
      <Route element={<BoardMemoViewLayout />}>
        <Route
          path="/board-memo/:type/:userId/:formId/:id"
          element={<BoardMemoViewForm />}
        />
        <Route
          path="/board-memo/:type/:userId/:formId/:id"
          element={<BoardMemoEditForm />}
        />
        {/* <Route
          path="/board-meetings/board-memo/view/:id"
          element={<BoardMemoViewForm />} // Reuse the view form component
        /> */}
        <Route path="/board-meetings/board-memo/:type/:id" element={<BoardMemoViewForm />} />
      </Route>
    </Routes>
  );
};

export default OfficeNoteProject;
