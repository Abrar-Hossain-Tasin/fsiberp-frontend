import React from "react";
import { decryptId } from "../../pages/Encrypted/Encrypted";
import BoardMemoView from "./BoardMemo/BoardMemoView";
import BoardMemoEdit from "./BoardMemo/BoardMemoEdit";

const BoardMemoDynamicFormLoader = ({ type, formId }) => {
  if (decryptId(formId) === "6001") {
    return type === "view" ? <BoardMemoView /> : <BoardMemoEdit />;
  }
};

export default BoardMemoDynamicFormLoader;
