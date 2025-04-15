// src/components/ViewForm.js
import { useParams } from "react-router-dom";
import DynamicFormLoader from "./DynamicFormLoader";

const ViewForm = () => {
  const { formId, type } = useParams();

  return (
    <div className="m-auto">
      {formId ? (
        <DynamicFormLoader formId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewForm;
