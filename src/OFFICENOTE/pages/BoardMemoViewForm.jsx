import { useParams } from "react-router-dom";
import BoardMemoDynamicFormLoader from "./BoardMemoDynamicFormLoader";

const BoardMemoViewForm = () => {
  const { formId, type } = useParams();
  // (formId, type);

  return (
    <div className="w-full">
      {formId ? (
        <BoardMemoDynamicFormLoader formId={formId} type={type} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardMemoViewForm;
