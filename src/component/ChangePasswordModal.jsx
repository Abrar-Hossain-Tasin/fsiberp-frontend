import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bmsApiEighty } from "../utils/api/Base_api";

import { jwtDecode } from "jwt-decode";

const ChangePasswordModal = ({ isOpen, onClose, modalTitle }) => {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldshowPassword, setOldShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const userUpdate = {
      userid,
      oldPassword,
      password,
    };

    try {
      const res = await fetch(`${bmsApiEighty}/api/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });

      const text = await res.text(); // Get the response as text

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Response is not valid JSON: " + text);
      }

      if (!res.ok) {
        throw new Error(data.msg || "Failed to change password");
      }

      // Clear the input fields, close the modal, and show success message
      setNewPassword("");
      setConfirmPassword("");
      setOldPassword("");
      onClose(); // Close the modal
      toast.success(data.msg, { autoClose: 2000 });
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message || "Error changing password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const togglePasswordVisibilityConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const toggleOldPasswordVisibility = () => {
    setOldShowPassword((prevState) => !prevState);
  };

  return (
    <section>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Change Password
                  </h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="relative mb-4">
                        <input
                          name="oldPassword"
                          placeholder="Old Password"
                          type={oldshowPassword ? "text" : "password"}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] pr-10"
                        />
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
                          {oldshowPassword ? (
                            <VisibilityIcon
                              onClick={toggleOldPasswordVisibility}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={toggleOldPasswordVisibility}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <input
                          name="password"
                          placeholder="New Password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] pr-10"
                        />
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
                          {showPassword ? (
                            <VisibilityIcon
                              onClick={togglePasswordVisibility}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={togglePasswordVisibility}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] pr-10"
                        />
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
                          {showConfirmPassword ? (
                            <VisibilityIcon
                              onClick={togglePasswordVisibilityConfirmPassword}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={togglePasswordVisibilityConfirmPassword}
                              className="mt-3"
                              style={{
                                color: "#007935",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {error && (
                        <div className="text-red-500 font-bold mt-2 text-center">
                          {error}
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#007935] hover:bg-[#005425] text-white font-bold py-2 px-4 rounded"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ChangePasswordModal;
