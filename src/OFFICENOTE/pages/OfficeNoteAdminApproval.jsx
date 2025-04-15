import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Base_api } from "../../utils/api/Base_api";
import { decryptId } from "./encryption/Encrypted";
// import { decryptId } from "../../pages/AdminDashboard/encryption/Encrypted";

const OfficeNoteAdminApproval = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const { md } = decoded;
  let { type, userId, formId, id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [delegation, setDelegation] = useState("");
  
  const handleAcceptReject = async (newStatus) => {
    console.log("Delegation before API call:", delegation);
    try {
      const formData = {
        status: newStatus,
        delegation: delegation,
      };
      const response = await fetch(
        `${Base_api}/api/onms/approval/${userid}/${decryptId(
          formId
        )}/${decryptId(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success(`${newStatus} successfully!`, { autoClose: 2000 });
        setTimeout(() => {
          navigate("./admin-dashboard");
        }, 2000); // Redirect after 2 seconds
        // location.reload();
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      error;
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };

  const handleCommentAndReview = async (e) => {
    console.log(userid);
    e.preventDefault();
    try {
      const formData = {
        comment,
      };
      const response = await fetch(
        `${Base_api}/api/officenote/backward/${userid}/${decryptId(
          formId
        )}/${decryptId(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      ({ result });
      if (response.ok) {
        toast.success(`${result.message}`, { autoClose: 4000 });
        setTimeout(() => {
          navigate("./admin-dashboard");
        }, 4000); // Redirect after 2 seconds
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      error;
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };

  const handleBoardMeeting = (e) => {
    e.preventDefault();
    setStatus("Accepted");
    setDelegation("2");
    openModal("Accepted");
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setStatus("Accepted");
    setDelegation("1");
    openModal("Accepted");
  };
  const handleConfirm = () => {
    setShowModal(false);
    handleAcceptReject(actionType); // Call the function to handle the action
  };
  const openModal = (type) => {
    setShowModal(true);
    setActionType(type);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const showCommentBox = (e) => {
    console.log(decoded);
    e.preventDefault();
    setShowComment(true);
  };
  return (
    <div className="flex flex-col gap-2 bg-[#073763] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
      <div>
        <form>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <button
                className="bg-[#4CAF50] p-1 rounded w-full"
                onClick={handleAccept}
              >
                Approved
              </button>
              <button
                className="bg-[#FF9800] p-1 rounded w-full"
                onClick={showCommentBox}
              >
                Review
              </button>
            </div>
            {userid === md && (
                <div className="flex gap-1">
                  <button
                    className="bg-[#2196F3] p-1 rounded w-full"
                    onClick={handleBoardMeeting}
                  >
                    Proceed for Board Meeting
                  </button>
                </div>
              )}
            {showComment ? (
              <div className="flex flex-col gap-1">
                <textarea
                  rows={3}
                  type="text"
                  placeholder="Comment Here"
                  onChange={(e) => setComment(e.target.value)}
                  className="p-1 rounded text-black"
                />
                <button
                  className="bg-[#2196F3] p-1 rounded w-full"
                  onClick={handleCommentAndReview}
                >
                  Send Feedback
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded w-60 shadow-[0_0_10px_black] ">
            <h2 className="text-black text-lg font-bold">
              Are you sure you want to approve?
            </h2>
            <div className="mt-4">
              <button
                onClick={handleConfirm}
                className="text-white bg-green-500 px-4 py-2 rounded mr-2"
              >
                OK
              </button>
              <button
                onClick={closeModal}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeNoteAdminApproval;
