import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import { jwtDecode } from "jwt-decode";
import { Base_api } from "../utils/api/Base_api";

const ChangePassword = () => {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password === currentPassword) {
    //   setError("New password cannot be the same as the current password.");
    //   return;
    // }

    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters long.");
    //   return;
    // }

    // const passwordValidationRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // if (!passwordValidationRegex.test(password)) {
    //   setError(
    //     "Password must be at least 6 chars with upper, lower, number, and special."
    //   );
    //   return;
    // }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userUpdate = {
      userid,
      password,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(`${Base_api}/api/change-default-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      // Redirect to the index page after successful password change
      navigate("/home");
    } catch (error) {
      setError(
        "An error occurred while changing the password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordVisibilityConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div class="bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
      <form
        onSubmit={handleSubmit}
        className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-[1px_2px_10px_-3px_rgba(0,0,0,0.74)]"
      >
        <h2 className="text-center font-bold text-2xl text-[#007935]">
          Please, Change your default password!
        </h2>

        <div className="relative">
          <input
            name="password"
            placeholder="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError(""); // Clear error
            }}
            className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] pr-10"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <VisibilityIcon
                onClick={togglePasswordVisibility}
                className="mt-3"
                style={{ color: "#007935", width: "20px", height: "20px" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={togglePasswordVisibility}
                className="mt-3"
                style={{ color: "#007935", width: "20px", height: "20px" }}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(""); // Clear error
            }}
            className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935] pr-10"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
            {showConfirmPassword ? (
              <VisibilityIcon
                onClick={togglePasswordVisibilityConfirmPassword}
                className="mt-3"
                style={{ color: "#007935", width: "20px", height: "20px" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={togglePasswordVisibilityConfirmPassword}
                className="mt-3"
                style={{ color: "#007935", width: "20px", height: "20px" }}
              />
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 font-bold mt-2 text-center">{error}</div>
        )}
        <div className="mt-3 flex justify-center">
          <Button
            type="submit"
            text="Change Password"
            disabled={isSubmitting}
            className="p-[5px] w-full border-2 rounded-sm border-[#007935] font-bold text-[#514f4f] hover:bg-[#007935] hover:text-[#fff]"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
