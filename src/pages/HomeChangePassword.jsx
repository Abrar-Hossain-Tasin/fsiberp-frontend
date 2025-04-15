import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bmsApiEighty } from "../utils/api/Base_api";

import { jwtDecode } from "jwt-decode";

const HomeChangePassword = () => {
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
  const navigate = useNavigate();
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
      toast.success(data.msg, { autoClose: 2000 });
      navigate("/home");
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
    <div className="flex items-center justify-center bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
      <div className="p-5 w-96 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-[0_0_10px_black] transform transition-all sm:my-8 sm:align-middle">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <h2 className="text-center font-bold text-2xl text-[#007935]">
            Change Password
          </h2>
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

            <div className="mt-3 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-[5px] w-full border-2 rounded-sm border-[#007935] font-bold text-[#514f4f] hover:bg-[#007935] hover:text-[#fff]"
              >
                {isSubmitting ? "Changing Password" : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HomeChangePassword;
