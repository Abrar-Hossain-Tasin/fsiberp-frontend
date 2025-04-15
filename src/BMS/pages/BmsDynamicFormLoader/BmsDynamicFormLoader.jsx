import { decryptId } from "../Encrypted/Encrypted.jsx";

import DebitVoucherEdit from "../DebitVoucher/DebitVoucherEdit";
import DebitVoucherView from "../DebitVoucher/DebitVoucherView";

const BmsDynamicFormLoader = ({ formId, type }) => {
  const decryptedFormId = decryptId(formId);
  if (decryptedFormId === "3001") {
    return type === "view" ? <DebitVoucherView /> : <DebitVoucherEdit />;
  } else {
    return (
      <div>
        {decryptId(formId) === 3001 ? "hello" : "Hi"} {type}Form not found
      </div>
    );
  }
};

export default BmsDynamicFormLoader;
