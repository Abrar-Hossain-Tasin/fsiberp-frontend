import React from "react";
import { decryptId } from "../../pages/Encrypted/Encrypted";
import OfficeNoteEdit from "./OfficeNote/OfficeNoteEdit";
import OfficeNoteView from "./OfficeNote/OfficeNoteView";

const OfficeNoteDynamicFormLoader = ({ type, formId }) => {
  console.log(type, decryptId(formId));
  if (decryptId(formId) === "5001") {
    return type === "view" ? <OfficeNoteView /> : <OfficeNoteEdit />;
  }
};

export default OfficeNoteDynamicFormLoader;
