import { useParams } from "react-router-dom";
import OfficeNoteDynamicFormLoader from "./OfficeNoteDynamicFormLoader";

const OfficeNoteViewForm = () => {
  const { formId, type } = useParams();
  // (formId, type);

  return (
    <div className="w-full">
      {formId ? (
        <OfficeNoteDynamicFormLoader formId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfficeNoteViewForm;
