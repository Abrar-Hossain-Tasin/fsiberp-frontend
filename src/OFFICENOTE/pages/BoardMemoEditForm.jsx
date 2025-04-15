import { useParams } from "react-router-dom";
import BoardMemoDynamicFormLoader from "./BoardMemoDynamicFormLoader";

const BoardMemoEditForm = () => {
  const { formId, type } = useParams();
  formId, type;
  return (
    <div className="m-auto">
      {formId ? (
        <BoardMemoDynamicFormLoader formId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardMemoEditForm;
