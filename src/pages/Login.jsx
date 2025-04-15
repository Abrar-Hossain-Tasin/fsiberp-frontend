import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/sticky-header-logo.png";
import Button from "../component/Button";
import { Base_api } from "../utils/api/Base_api";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const first = () => {
    const token = localStorage.getItem("token");
    ({ first: token });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { userid, password };
    try {
      const response = await axios.post(`${Base_api}/api/signin`, userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const { log_status, user_roleid } = decoded;

      // Role-based navigation
      if (log_status === "Y") {
        if (user_roleid === 1) {
          navigate("/role-id-change");
        } else navigate("/home");
        // navigate("/dashboard");
      } else {
        navigate("/changepassword");
      }

      // if (response.status === 200) {
      //   const {
      //     user_roleid,
      //     unit,
      //     log_status,
      //     cito,
      //     password: currentPassword,
      //     cbsuser,
      //     bms,
      //     department,
      //     domainuser,
      //     emailuser,
      //     divhead,
      //     onms,
      //     official,
      //   } = response.data;
      //   (response.data);

      //   if (currentPassword === password) {
      //     setError("Password cannot be the same as the current password.");
      //     return;
      //   }

      //   // Role-based navigation
      //   if (log_status === "Y") {
      //     if (user_roleid === 1) {
      //       navigate("/role-id-change");
      //     } else navigate("/home");
      //     // navigate("/dashboard");
      //   } else {
      //     navigate("/changepassword");
      //   }
      // }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.status === 404
            ? "User ID invalid."
            : error.response.status === 401
            ? "Invalid Password!"
            : "An error occurred. Please try again later.";
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#096848] to-[hsl(237,49%,30%)]">
        <div className="bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
          <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-[0_5px_10px_0px_gray]">
            <img src={Logo} alt="Logo" className="w-full" />
            <div className="text-center mt-3 font-bold text-xl text-[#007935]">
              {/* <h1 className="text-2xl">FSIB</h1>{" "} */}
              <span className="text-xl">
                {/* NextGen Resource Planning Solution */}
                সংকলন
              </span>
            </div>
            <h6 className="mt-3 text-center text-[#514f4f] font-bold text-sm">
              Please enter your credentials.
            </h6>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Last 5 Digits of Emp ID"
                className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
              />
              <br />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {error && (
                <h4 className="text-red-500 font-bold mt-2 text-center">
                  {error}
                </h4>
              )}
              <div className="mt-3 flex justify-center">
                <Button
                  text="Log In"
                  className="p-[5px] w-full border-2 rounded-sm border-[#007935] font-bold text-[#514f4f] hover:bg-[#007935] hover:text-[#fff]"
                />
              </div>
              <Link
                className="text-sm float-right font-[500] text-cyan-900 underline hover:text-cyan-600"
                to="/forgot-password"
              >
                Forget Password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
