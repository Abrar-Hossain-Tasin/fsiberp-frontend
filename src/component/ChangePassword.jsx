import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Base_api } from "../utils/api/Base_api";

const ChangePassword = ({ open, onClose, children }) => {
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
  const currentPassword = localStorage.getItem("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (oldPassword !== currentPassword) {
      setError("Old password is incorrect.");
      return;
    }

    if (password === currentPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userUpdate = {
      userid,
      password,
      confirmPassword,
    };

    try {
      const res = await fetch(`${Base_api}/api/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });
      res.json();

      if (!res.ok) {
        throw new Error("Failed to change password");
      }

      // Clear the input fields, close the modal, and navigate to /isrm after successful password change
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setOldPassword("");
      onClose(); // Close the modal
      // navigate("/isrm");
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Error changing password. Please try again.");
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
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-500"
        >
          X
        </button>
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Change Password
          </h3>
          <div className="mt-2">
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  name="password"
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
                  {isSubmitting ? "" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
