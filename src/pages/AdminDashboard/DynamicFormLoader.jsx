import React from "react";
// import DebitVoucherEdit from "../../BMS/pages/DebitVoucher/DebitVoucherEdit";
// import DebitVoucherView from "../../BMS/pages/DebitVoucher/DebitVoucherView";
import UserPermissionOrRoleEdit from "../Cbs/UserPermission/UserPermissionOrRoleEdit";
import UserPermissionOrRoleView from "../Cbs/UserPermission/UserPermissionOrRoleView";
import AccessRightsRequestFormEdit from "../isrm/Arrf/AccessRightsRequestFormEdit";
import AccessRightsRequestFormView from "../isrm/Arrf/AccessRightsRequestFormView";
import DatabaseAccessRightEditForm from "../isrm/DARRF/DatabaseAccessRightEditForm";
import DatabaseAccessRightViewForm from "../isrm/DARRF/DatabaseAccessRightViewForm";
import IncidentReportFormEdit from "../isrm/Irf/IncidentReportFormEdit";
import IncidentReportFormView from "../isrm/Irf/IncidentReportFormView";
import AccessControlRequestFormEdit from "../namu/Acpf/AccessControlRequestFormEdit";
import AccessControlRequestFormView from "../namu/Acpf/AccessControlRequestFormView";
import DomainFormEdit from "../sau/Dicf/DomainFormEdit";
import DomainIdFormView from "../sau/Dicf/DomainIdFormView";
import EmailAddressCreationFormEdit from "../sau/Eacf/EmailAddressCreationFormEdit";
import EmailAddressCreationFormView from "../sau/Eacf/EmailAddressCreationFormView";
import GroupEmailUpdate from "../sau/Gef/GroupEmailUpdate";
import GroupEmailView from "../sau/Gef/GroupEmailView";
import { decryptId } from "./encryption/Encrypted";

const DynamicFormLoader = ({ formId, type }) => {
  const decryptedFormId = decryptId(formId);
  if (decryptedFormId === "1001") {
    return type === "view" ? (
      <AccessRightsRequestFormView />
    ) : (
      <AccessRightsRequestFormEdit />
    );
  } else if (decryptedFormId === "2001") {
    return type === "view" ? (
      <UserPermissionOrRoleView />
    ) : (
      <UserPermissionOrRoleEdit />
    );
  } else if (decryptedFormId === "1002") {
    return type === "view" ? (
      <AccessControlRequestFormView type={type} />
    ) : (
      <AccessControlRequestFormEdit type={type} />
    );
  } else if (decryptedFormId === "1004") {
    return type === "view" ? (
      <EmailAddressCreationFormView />
    ) : (
      <EmailAddressCreationFormEdit />
    );
  } else if (decryptedFormId === "1005") {
    return type === "view" ? (
      <GroupEmailView type={type} />
    ) : (
      <GroupEmailUpdate type={type} />
    );
  } else if (decryptedFormId === "1006") {
    return type === "view" ? (
      <IncidentReportFormView type={type} />
    ) : (
      <IncidentReportFormEdit type={type} />
    );
  } else if (decryptedFormId === "1015") {
    return type === "view" ? (
      <DatabaseAccessRightViewForm type={type} />
    ) : (
      <DatabaseAccessRightEditForm type={type} />
    );
  } else if (decryptedFormId === "1010") {
    return type === "view" ? <DomainIdFormView /> : <DomainFormEdit />;
  } else {
    return (
      <div>
        {decryptId(formId) === 1001 ? "hello" : "Hi"} {type}Form not found
      </div>
    );
  }
};

export default DynamicFormLoader;
