import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/sticky-header-logo.png";
import Button from "../component/Button";
import { Base_api } from "../utils/api/Base_api";

const ForgotPassword = () => {
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { userid, email };
    try {
      const response = await axios.put(
        `${Base_api}/api/forget-password`,
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // (response.data.message);
      if (response.data.message === "Default Password sent") {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // console.error("Error submitting form:", await response.json());
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.status === 404
            ? "User ID invalid."
            : error.response.status === 401
            ? "Invalid Password!"
            : "PF Id and Email are required.";
        setError(errorMessage);
      } else {
        setError("PF Id and Email are required.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-gradient-to-r from-[#096848] to-[hsl(237,49%,30%)]">
        <div className="bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
          <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 shadow-[0_5px_10px_0px_gray]">
            <img src={Logo} alt="Logo" className="w-full" />
            <div className="text-center mt-3 font-bold text-xl text-[#007935]">
              <h1 className="text-2xl">FSIB</h1>{" "}
              <span className="text-xl">
                NextGen Resource Planning Solution
              </span>
            </div>
            <h6 className="mt-3 text-center text-[#514f4f] font-bold text-sm">
              Please enter your PF ID and Official Email.
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
                  type="email"
                  placeholder="Email"
                  className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 mt-3 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <h4 className="text-red-500 font-bold mt-2 text-center">
                  {error}
                </h4>
              )}
              <div className="mt-3 flex justify-center">
                <Button
                  text="Send Email"
                  className="p-[5px] w-full border-2 rounded-sm border-[#007935] font-bold text-[#514f4f] hover:bg-[#007935] hover:text-[#fff]"
                />
              </div>
              <Link
                className="text-sm float-right font-[500] text-cyan-900 underline hover:text-cyan-600"
                to="/"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
