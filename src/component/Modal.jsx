import { useState } from "react";
import ChangePassword from "./ChangePassword";
import ChangePasswordModal from "./ChangePasswordModal";

const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Change Password</button>
      <ChangePassword open={open} onClose={() => setOpen(false)}>
        <ChangePasswordModal />
      </ChangePassword>
    </div>
  );
};

export default Modal;
