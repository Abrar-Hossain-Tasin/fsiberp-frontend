// src/components/EditForm.js
import { useParams } from "react-router-dom";

import BmsDynamicFormLoader from "../BmsDynamicFormLoader/BmsDynamicFormLoader";

const BmsEditForm = () => {
  const { formid, type } = useParams();

  return (
    <div className="m-auto">
      {formid ? (
        <BmsDynamicFormLoader formId={formid} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BmsEditForm;
