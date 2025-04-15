import { useParams } from "react-router-dom";
import { decryptId } from "./path/to/your/encryption";

function ViewForm() {
  const { type, userId, formId, id } = useParams();

  const decryptedUserId = decryptId(userId);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);

  // Use decrypted IDs as needed
  "Decrypted User ID:", decryptedUserId;
  "Decrypted Form ID:", decryptedFormId;
  "Decrypted ID:", decryptedId;

  return <div>{/* Your form rendering logic */}</div>;
}
