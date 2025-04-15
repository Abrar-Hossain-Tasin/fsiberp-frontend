import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./index.css";

import Header from "./component/Header";
import ErrorPage from "./error-page.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import Dashboard from "./pages/AdminDashboard/Dashboard.jsx";
import ViewForm from "./pages/AdminDashboard/ViewForm.jsx";
import ChangePassword from "./pages/Changepassword";
import Isrm from "./pages/Isrm";
import Login from "./pages/Login.jsx";
import Namu from "./pages/Namu";
import Sau from "./pages/Sau";
import Shu from "./pages/Shu";
import AccessRightsRequestForm from "./pages/isrm/Arrf/AccessRightsRequestForm.jsx";
import ChangeRequestForm from "./pages/isrm/Crf/ChangeRequestForm.jsx";
import DatabaseAccessRightSubmitForm from "./pages/isrm/DARRF/DatabaseAccessRightSubmitForm.jsx";
import Irf from "./pages/isrm/Irf/Irf.jsx";
import Pauf from "./pages/isrm/Pauf/Pauf";
import Psf from "./pages/isrm/Psf/Psf";
import Rarf from "./pages/isrm/Rarf/Rarf.jsx";
import AccessControlRequestForm from "./pages/namu/Acpf/AccessControlRequestForm.jsx";
import IRF from "./pages/namu/Irf/Irf.jsx";
import Wef from "./pages/namu/Wef/Wef.jsx";
import Dicf from "./pages/sau/Dicf/Dicf.jsx";
import Eacf from "./pages/sau/Eacf/Eacf.jsx";
import Gef from "./pages/sau/Gef/Gef.jsx";
import PrivateRoute from "./utils/privateroute";

import SelectRowTable from "./pages/AdminDashboard/SelectRowTable.jsx";

import Profile from "./pages/Profile";

import BmsLayout from "./BMS/component/BmsHeader/BmsHeader";

import BmsEditForm from "./BMS/pages/BmsEditForm/BmsEditForm";
import BmsViewForm from "./BMS/pages/BmsViewForm/BmsViewForm";

import BmsAdminDashboard from "./BMS/pages/BmsAdminDashboard/BmsAdminDashboard";
import DebitVoucherSubmit from "./BMS/pages/DebitVoucher/DebitVoucherSubmit";
import Bms_Dashboard from "./BMS/pages/UserDashboard/Bms_Dashboard.jsx";
import AfterLogin from "./pages/AfterLoginFirstPage/AfterLogin";
import Cbs from "./pages/Cbs";
import UserPermissionOrRole from "./pages/Cbs/UserPermission/UserPermissionOrRole";
import ProfileErp from "./pages/ProfileErp";
import SuperAdminAllDept from "./pages/SuperAdmin/SuperAdminAllForms/SuperAdminAllDept";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminRollID from "./pages/SuperAdmin/SuperAdminRollid/SuperAdminRollID";
import EmployeeTable from "./pages/isrm/Irf/WitnessTable.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OfficeNoteProject from "./OFFICENOTE/App.jsx";
import Reports from "./pages/reports/Reports.jsx";
import HomeChangePassword from "./pages/HomeChangePassword.jsx";
import BoardMeetingProject from "./BOARDMEETING/App.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} errorElement={<ErrorPage />} />

        <Route
          path="/office-note/*"
          element={
            <PrivateRoute privateRoute>
              <OfficeNoteProject />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/board-meetings/*"
          element={
            <PrivateRoute privateRoute>
              <BoardMeetingProject />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/isrm"
          element={
            <PrivateRoute privateRoute>
              <Header>
                <Isrm />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute privateRoute>
              <Header>
                <Reports />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/isrm"
          element={
            <PrivateRoute privateRoute>
              <Header>
                <Isrm />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/darrf"
          element={
            <PrivateRoute rivateRoute>
              <Header>
                <DatabaseAccessRightSubmitForm />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/SelectRowTable"
          element={
            <PrivateRoute rivateRoute>
              <Header>
                <SelectRowTable />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/EmployeeTable"
          element={
            <PrivateRoute rivateRoute>
              <Header>
                <EmployeeTable />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/UserPermissionOrRole"
          element={
            <PrivateRoute rivateRoute>
              <Header>
                <UserPermissionOrRole />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/namu"
          element={
            <Header>
              <Namu />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/cbs"
          element={
            <Header>
              <Cbs />
            </Header>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/cbs/upor"
          element={
            <Header>
              <UserPermissionOrRole />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/profile"
          element={
            <Header>
              <Profile />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/erp-profile"
          element={<ProfileErp />}
          errorElement={<ErrorPage />}
        />

        <Route
          path="/shu"
          element={
            <Header>
              <Shu />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/sau"
          element={
            <Header>
              <Sau />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Header>
                <Dashboard />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <AfterLogin />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/functional-role-change"
          element={
            <PrivateRoute>
              <Header>
                <SuperAdminDashboard />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/role-id-change"
          element={
            <PrivateRoute>
              <Header>
                <SuperAdminRollID />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/super-admin-dashboard-allforms"
          element={
            <PrivateRoute>
              <Header>
                <SuperAdminAllDept />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <Header>
                <AdminDashboard />
              </Header>
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/:type/:userId/:formId/:id"
          element={
            <PrivateRoute>
              <Header>
                {/* <Print> */}
                <ViewForm />
                {/* </Print> */}
              </Header>
            </PrivateRoute>
          }
        />

        <Route
          path="/bms/:type/:userId/:formId/:id"
          element={
            <PrivateRoute>
              <BmsLayout>
                <BmsViewForm />
              </BmsLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="bms/:type/:userId/:formId/:id"
          element={
            <PrivateRoute>
              <BmsLayout>
                <BmsEditForm />
              </BmsLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/isrm/arrf"
          element={
            <Header>
              {" "}
              <AccessRightsRequestForm />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/irf"
          element={
            <Header>
              <Irf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/rarf"
          element={
            <Header>
              <Rarf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/puaf"
          element={
            <Header>
              <Pauf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/psf"
          element={
            <Header>
              <Psf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/sau/eacf"
          element={
            <Header>
              <Eacf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/sau/gmcf"
          element={
            <Header>
              <Gef />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/isrm/crf"
          element={
            <Header>
              <ChangeRequestForm />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/namu/acpf"
          element={
            <Header>
              <AccessControlRequestForm />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/namu/wef"
          element={
            <Header>
              <Wef />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/namu/irf"
          element={
            <Header>
              <IRF />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/home-change-password"
          element={
            <PrivateRoute>
              <HomeChangePassword />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/changepassword"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/sau/dicf"
          element={
            <Header>
              <Dicf />
            </Header>
          }
          errorElement={<ErrorPage />}
        />

        {/* BMS_Start */}
        <Route
          path="/debitvoucher"
          element={
            <BmsLayout>
              <DebitVoucherSubmit />
            </BmsLayout>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/bms-user-dashboard"
          element={
            <BmsLayout>
              <Bms_Dashboard />
            </BmsLayout>
          }
          errorElement={<ErrorPage />}
        />

        <Route
          path="/bms-admin-dashboard"
          element={
            <BmsLayout>
              <BmsAdminDashboard />
            </BmsLayout>
          }
          errorElement={<ErrorPage />}
        />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
