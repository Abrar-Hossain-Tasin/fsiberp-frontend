// src/components/ViewForm.js
import { useParams } from "react-router-dom";

import BmsDynamicFormLoader from "../BmsDynamicFormLoader/BmsDynamicFormLoader";

const BmsViewForm = () => {
  const { formId, type } = useParams();

  return (
    <div className="m-auto">
      {formId ? (
        <BmsDynamicFormLoader formId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BmsViewForm;
