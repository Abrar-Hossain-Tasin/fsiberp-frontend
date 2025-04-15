// src/components/EditForm.js
import { useParams } from "react-router-dom";
import DynamicFormLoader from "./DynamicFormLoader";

const EditForm = () => {
  const { formid, type } = useParams();

  return (
    <div className="m-auto">
      {formid ? (
        <DynamicFormLoader formId={formid} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditForm;
