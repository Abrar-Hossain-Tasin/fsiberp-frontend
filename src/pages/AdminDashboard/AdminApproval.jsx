import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../../utils/api/Base_api";
import { decryptId } from "./encryption/Encrypted";

// List of units that have access to both dashboards
const unitsWithAccess = [2, 7, 8, 10];

const AcceptRejectComponent = ({
  status,
  setStatus,
  comment,
  setComment,
  comment2,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [actionType, setActionType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let { userId, formId, id } = useParams();
  const navigate = useNavigate();
  const handleAccept = (e) => {
    e.preventDefault();
    setStatus("Accepted");

    openModal("Accepted");
  };

  const handleReject = (e) => {
    e.preventDefault();
    setStatus("Rejected");
    openModal("Rejected");
  };

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleAcceptReject(actionType); // Call the function to handle the action
  };

  const handleAcceptReject = async (newStatus) => {
    try {
      const formData = {
        status: newStatus,
        comment,
        comment2,
      };
      console.log(formData);

      const response = await fetch(
        `${Base_api}/api/approval/${userid}/${decryptId(formId)}/${decryptId(
          id
        )}`,
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
          navigate("/admin-dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      error;
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };

  return (
    <div className="accept-reject-button">
      <form>
        <input
          type="text"
          placeholder="Comment Here"
          onChange={(e) => setComment(e.target.value)}
          className="text-[#514f4f] text border-[1px] border-black w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
        />
        <br /> <br />
        <div className="flex justify-center ">
          <button
            onClick={handleAccept}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-10"
          >
            Reject
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold">
              Are you sure you want to{" "}
              {actionType === "Accepted" ? "accept" : "reject"}?
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

      <ToastContainer />
    </div>
  );
};
const DoneComponent = ({ setStatus }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  let { userId, formId, id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const navigate = useNavigate();

  const handleAcceptReject = async (newStatus) => {
    try {
      const formData = {
        status: newStatus,
      };
      formData;

      const response = await fetch(
        `${Base_api}/api/approval/${userid}/${decryptId(formId)}/${decryptId(
          id
        )}`,
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
          navigate("/admin-dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      error;
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };
  const handleConfirm = () => {
    setShowModal(false);
    handleAcceptReject(actionType); // Call the function to handle the action
  };

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handleDone = (e) => {
    e.preventDefault();
    setStatus("Done");
    openModal("Done");
  };

  return (
    <div className="accept-reject-button">
      <form>
        <div className="flex justify-center ">
          <button
            onClick={handleDone}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Done
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold">
              Are you sure you make it {actionType.toLowerCase()}?
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

      <ToastContainer />
    </div>
  );
};

const AdminApproval = ({
  status,
  setStatus,
  comment,
  setComment,
  comment2,
  setComment2,
  divheaduserid,
  divheadusername,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [currentForm, setCurrentForm] = useState({});
  const [formData, setFormData] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, unit, user_roleid, AccessControlUser, department } = decoded;

  let { userId, formId, id } = useParams();
  const navigate = useNavigate();
  // Fetch Form data
  useEffect(() => {
    const getData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [userId]);

  // Fetch CBS Form data
  useEffect(() => {
    const getData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (decryptedFormId === "2001") {
          const current =
            data.find(
              (item) => item.id === Math.max(...data.map((f) => f.id))
            ) || {};

          setCurrentForm(current);
          console.log({ current });
          console.log(typeof current.bcduserid);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [userid]);

  const handleAcceptReject = async (newStatus) => {
    try {
      const formData = {
        status: newStatus,
        comment,
        comment2,
        comment3: divheadusername,
      };

      const response = await fetch(
        `${Base_api}/api/approval/${userid}/${decryptId(formId)}/${decryptId(
          id
        )}`,
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
          navigate("/admin-dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      error;
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleAcceptReject(actionType); // Call the function to handle the action
  };

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setStatus("Accepted");

    openModal("Accepted");
  };

  const handleReject = (e) => {
    e.preventDefault();
    setStatus("Rejected");
    openModal("Rejected");
  };

  const handleDone = (e) => {
    e.preventDefault();
    setStatus("Done");
    openModal("Done");
  };
  const handleEmailDone = (e) => {
    e.preventDefault();
    setStatus("Done");
    setComment(comment);
    setComment2(comment2);
    openModal("Done");
  };
  console.log(department);
  // handle accept reject start
  if (user_roleid === 1 || user_roleid === 2) {
    // For CBS Accept and Reject start
    if (
      userid === currentForm.unitheaduserid &&
      currentForm.unitheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      Number(currentForm.bcduserid) === department &&
      currentForm.bcdstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      Number(currentForm.iaduserid) === department &&
      currentForm.iadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      Number(currentForm.imrduserid) === department &&
      currentForm.imrdstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      Number(currentForm.iduserid) === department &&
      currentForm.idstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    // For CBS Accept and Reject end

    if (
      userid === formData.unitheaduserid &&
      formData.unitheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === formData.isrmheaduserid &&
      formData.isrmheadstatus === "Pending"
    ) {
      formData.isrmheaduserid;
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (userid === formData.citouserid && formData.citostatus === "Pending") {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === formData.implbyunitheaduserid &&
      formData.implbyunitheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === formData.saheaduserid &&
      formData.saheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === formData.networkheaduserid &&
      formData.networkheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === formData.gsdheaduserid &&
      formData.gsdheadstatus === "Pending"
    ) {
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
    if (
      userid === currentForm.divheaduserid &&
      currentForm.divheadstatus === "Pending"
    ) {
      currentForm.divheaduserid, currentForm.divheadstatus;
      return (
        <AcceptRejectComponent
          status={status}
          setStatus={setStatus}
          comment={comment}
          setComment={setComment}
          comment2={comment2}
        />
      );
    }
  }

  // handle done start
  if (user_roleid === 3 && unitsWithAccess.includes(Number(unit))) {
    if (
      formData.implementedbystatus === "Pending" &&
      formData.citostatus === "Accepted"
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <div className="flex justify-center ">
              <button
                onClick={handleDone}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Done
              </button>
            </div>
          </form>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold">
                  Are you sure you make it {actionType.toLowerCase()}?
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

          <ToastContainer />
        </div>
      );
    }
  }

  // for CBS
  if (
    unit === 2 &&
    user_roleid === 3 &&
    currentForm.formid === "2001" &&
    currentForm.unitheadstatus === "Accepted" &&
    currentForm.implementedbystatus === "Pending"
  ) {
    return <DoneComponent status={status} setStatus={setStatus} />;
  }

  // for Email Creation
  if (
    unit === 11 &&
    user_roleid === 3 &&
    formData.formid === "1004" &&
    formData.implbyunitheadstatus === "Accepted" &&
    formData.implementedbystatus === "Pending"
  ) {
    return (
      <div className="accept-reject-button">
        <form>
          <div className="flex justify-center ">
            <button
              onClick={handleEmailDone}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Done
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className="text-lg font-bold">
                Are you sure you make it {actionType.toLowerCase()}?
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

        <ToastContainer />
      </div>
    );
  }

  // for Group Email Creation
  if (
    unit === 11 &&
    user_roleid === 3 &&
    formData.formid === "1005" &&
    formData.implbyunitheadstatus === "Accepted" &&
    formData.implementedbystatus === "Pending"
  ) {
    return <DoneComponent status={status} setStatus={setStatus} />;
  }

  // for Domain Creation
  if (
    unit === 10 &&
    user_roleid === 3 &&
    formData.formid === "1010" &&
    formData.citostatus === "Accepted" &&
    formData.implementedbystatus === "Pending"
  ) {
    return <DoneComponent status={status} setStatus={setStatus} />;
  }

  // for Access Control
  if (
    AccessControlUser === 1 &&
    user_roleid === 3 &&
    formData.formid === "1002" &&
    formData.networkheadstatus === "Accepted" &&
    formData.networkimplementedbystatus === "Pending"
  ) {
    return <DoneComponent status={status} setStatus={setStatus} />;
  }
};

export default AdminApproval;
