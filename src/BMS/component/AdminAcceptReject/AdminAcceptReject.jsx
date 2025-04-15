import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { decryptId } from "../../../pages/AdminDashboard/encryption/Encrypted";

import { Base_api } from "../../../utils/api/Base_api";

import { ToastContainer } from "react-toastify";

import { jwtDecode } from "jwt-decode";

const AdminAcceptReject = ({ status, setStatus, comment, setComment }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [formData, setFormData] = useState([]);

  let { userId, formId, id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, bms } = decoded;

  // Fetch Form data
  useEffect(() => {
    const getData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        console.log(decryptedUserId, decryptedFormId, decryptedId);
        const response = await fetch(
          `${Base_api}/api/bms_dashboard/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        // setFilteredOptions(formData2);
        console.log({ formData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [userid]);

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
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

  const handleConfirm = () => {
    setShowModal(false);
    handleAcceptReject(actionType); // Call the function to handle the action
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

  const handleAcceptReject = async (newStatus) => {
    try {
      const formData = {
        status: newStatus,
        comment,
      };
      console.log(formData);

      const response = await fetch(
        `${Base_api}/api/bms/approval/${userid}/${decryptId(
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
          navigate("/bms-admin-dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error("Error submitting approval!", { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred!", { autoClose: 2000 });
    }
  };

  if (bms === "Admin" && formData.unitheadstatus === "Pending")
    return (
      <div className="accept-reject-button">
        <form>
          <input
            type="text"
            placeholder="Comment Here"
            onChange={(e) => setComment(e.target.value)}
            className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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

  if (
    formData.secondmanstatus === "Accepted" ||
    formData.secondmanstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.fadsecondmanstatus === "Pending" &&
      userid === formData.unitheaduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.unitheadstatus === "Accepted" ||
    formData.unitheadstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.fadheadstatus === "Pending" &&
      userid === formData.fadsecondmanuserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.fadsecondmanstatus === "Accepted" ||
    formData.fadsecondmanstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.fadheadstatus === "Pending" &&
      userid === formData.fadheaduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.fadheadstatus === "Accepted" ||
    formData.fadheadstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.implementedbystatus === "Pending" &&
      userid === formData.fadheaduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.fadheadstatus === "Accepted" ||
    formData.fadheadstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.implementedbystatus === "Pending" &&
      userid === formData.implementedbyuserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
            <br /> <br />
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

  // dmd/amd

  if (
    formData.secondmanstatus === "Accepted" ||
    formData.secondmanstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      (formData.dmdstatus === "Pending" || formData.amdstatus === "Pending") &&
      userid === formData.unitheaduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.unitheadstatus === "Accepted" ||
    formData.unitheadstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.dmdstatus === "Pending" &&
      formData.amdstatus === "Pending" &&
      userid === formData.dmduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (formData.dmdstatus === "Accepted" || formData.dmdstatus === "Rejected") {
    if (
      bms === "Admin" &&
      userid === formData.dmduserid &&
      formData.amdsubdate === null &&
      formData.implementedbystatus === "Pending"
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.unitheadstatus === "Accepted" ||
    formData.unitheadstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.dmdstatus === "Pending" &&
      formData.amdstatus === "Pending" &&
      userid === formData.amduserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (formData.amdstatus === "Accepted" || formData.amdstatus === "Rejected") {
    if (
      bms === "Admin" &&
      userid === formData.amduserid &&
      formData.dmdsubdate === null &&
      formData.implementedbystatus === "Pending"
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
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
    }
  }

  if (
    formData.dmdstatus === "Accepted" ||
    formData.dmdstatus === "Rejected" ||
    formData.amdstatus === "Accepted" ||
    formData.dmdstatus === "Rejected"
  ) {
    if (
      bms === "Admin" &&
      formData.implementedbystatus === "Pending" &&
      userid === formData.implementedbyuserid
    ) {
      return (
        <div className="accept-reject-button">
          <form>
            <input
              type="text"
              placeholder="Comment Here"
              onChange={(e) => setComment(e.target.value)}
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
            <br /> <br />
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
};

export default AdminAcceptReject;
