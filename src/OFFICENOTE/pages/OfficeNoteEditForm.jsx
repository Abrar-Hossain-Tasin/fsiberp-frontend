import { useParams } from "react-router-dom";
import OfficeNoteDynamicFormLoader from "./OfficeNoteDynamicFormLoader";

const OfficeNoteEditForm = () => {
  const { formId, type } = useParams();
  formId, type;
  return (
    <div className="m-auto">
      {formId ? (
        <OfficeNoteDynamicFormLoader foImId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfficeNoteEditForm;
