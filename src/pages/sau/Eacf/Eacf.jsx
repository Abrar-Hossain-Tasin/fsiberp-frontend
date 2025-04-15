import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import SubmitButton from "../../../component/CRF/SubmitButton.jsx";
import UnitHeadSearch from "../../../component/CRF/UnitHeadSearch.jsx";
import UnitHeadStatus from "../../../component/CRF/UnitHeadStatus.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo.jsx";
import Textarea from "../../../component/Textarea.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Eacf = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, emailuser } = decoded;
  const [displayname, setDisplayname] = useState("");
  const [emailadd, setEmailAdd] = useState("");
  const [purpose, setPurpose] = useState("");
  const [action, setAction] = useState("");
  const [grpemail, setGrpEmail] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      displayname,
      emailadd,
      purpose,
      action,
      grpemail,
      unitheaduserid,
      unitheadusername,
    };

    // if (!emailadd.endsWith("@fsiblbd.com")) {
    //   toast.error("Email Address must end with @fsiblbd.com");
    //   return;
    // }

    // if (grpemail && !grpemail.endsWith("@fsiblbd.com")) {
    //   toast.error("Group Email Address must end with @fsiblbd.com");
    //   return;
    // }

    try {
      const response = await fetch(`${Base_api}/api/email/save/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!", {
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
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Error submitting form.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="m-auto">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <div className="w-[850px] mx-6">
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="my-4">
                <AllFormsHeader
                  divname="ICT Division"
                  formname="E-mail address Creation/Deletion/Modification Form"
                  dno="1004"
                  vno="3.0"
                  edate="08.10.2023"
                  fpageno="1"
                  lpageno="1"
                  rdiv="ICT Division"
                  rformname="EACF"
                />
              </div>

              <Dynamictable userid={userid} />

              <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
                To be completed by respective Requestor
              </h4>

              <div>
                <table className="w-full text-sm">
                  <tr>
                    <th className="border py-1 border-black" colSpan="3">
                      Desired Email Address
                    </th>
                  </tr>
                  <tr>
                    <th className="border py-1 border-black">
                      <label htmlFor="display_name">Display Name</label>
                    </th>
                    <th className="border py-1 border-black">
                      <label htmlFor="email_address">E-mail address</label>
                    </th>
                    <th className="border py-1 border-black">
                      <label htmlFor="purpose">Purpose</label>
                    </th>
                  </tr>
                  <tr>
                    <td className="border py-1 border-black">
                      <Textarea
                        rows="1"
                        width="w-48"
                        placeholder="Display Name"
                        id="displayname"
                        name="displayname"
                        margin_left="ml-5"
                        onTextAreaValue={(e) => setDisplayname(e.target.value)}
                      />
                    </td>
                    <td className="border py-1 border-black">
                      <Textarea
                        rows="1"
                        width="w-48"
                        placeholder="Email Address"
                        id="emailadd"
                        margin_left="ml-5"
                        onTextAreaValue={(e) => setEmailAdd(e.target.value)}
                      />
                    </td>
                    <td className="border py-1 border-black">
                      <Textarea
                        rows="1"
                        width="w-48"
                        placeholder="Purpose"
                        id="purpose"
                        margin_left="ml-5"
                        onTextAreaValue={(e) => setPurpose(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>

                <div className="mt-4 text-sm">
                  <label htmlFor="g_e_add" className="font-bold">
                    Group Email Address
                  </label>{" "}
                  <textarea
                    rows="1"
                    placeholder="Group Email Address"
                    id="g_e_add"
                    name="displayname"
                    onChange={(e) => setGrpEmail(e.target.value)}
                    className="mt-2 text-[#3b3838] border-[1px] border-black text-sm p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-[1rem] placeholder-opacity-100"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 mb-4">
                <table className="w-full text-sm">
                  <tr>
                    <th className="border border-black py-2">
                      <label htmlFor="requesting_unit">Action</label>
                    </th>
                    <th className="border border-black">
                      <input
                        type="radio"
                        id="create"
                        name="action"
                        value="Create"
                        onChange={(e) => setAction(e.target.value)}
                        disabled={emailuser === "1"}
                      />
                      <label htmlFor="create" className="ml-1">
                        Create
                      </label>

                      <input
                        type="radio"
                        id="modify"
                        name="action"
                        value="Modify"
                        className="ml-2"
                        onChange={(e) => setAction(e.target.value)}
                      />
                      <label htmlFor="modify" className="ml-1">
                        Modify
                      </label>

                      <input
                        type="radio"
                        id="delete"
                        name="action"
                        value="Delete"
                        className="ml-2"
                        onChange={(e) => setAction(e.target.value)}
                      />
                      <label htmlFor="delete" className="ml-1">
                        Delete
                      </label>
                    </th>
                  </tr>
                </table>
              </div>

              <div>
                <UnitHeadSearch
                  unitheaduserid={unitheaduserid}
                  setUnitheaduserid={setUnitheaduserid}
                  unitheadusername={unitheadusername}
                  setUnitheadusername={setUnitheadusername}
                  unitheadstatus={<UnitHeadStatus />}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>

              <RequestorTwo text="To be completed by respective officials for giving Access permission" />

              <div>
                <table className="w-full text-sm">
                  <tr>
                    <th
                      className="border px-4 py-2 border-black text-sm"
                      colSpan="2"
                    >
                      Confirmed E-mail Address
                    </th>
                  </tr>
                  <tr className="">
                    <td className="border  border-black px-5 w-1/2">
                      Confirmed E-mail Address :{" "}
                      <strong>Creation/Deletion/Modification</strong>
                    </td>
                    <td className="border px-4 py-2 border-black w-1/2">
                      <Textarea
                        width="w-72"
                        placeholder="Implementer will write here!"
                        rows="1"
                        margin_left="ml-10"
                        disabled
                      />
                    </td>
                  </tr>

                  <tr className="">
                    <td className="border  border-black px-5 text-sm">
                      <label htmlFor="group">
                        <strong>Group Allotted:</strong>
                      </label>
                    </td>
                    <td className="border px-4 py-2 border-black">
                      <Textarea
                        width="w-72"
                        placeholder="Implementer will write here!"
                        rows="1"
                        margin_left="ml-10"
                        id="group"
                        disabled
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
                To be completed by Admin
              </h4>

              <div className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded mt-4">
                <div className="text-sm">
                  <table className="min-w-full border text-sm">
                    <thead className="text-sm">
                      <tr>
                        <th className="py-2 px-4 border border-black">
                          Recommended by Head of ISRM Unit/CISO
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Approval by HOICTD/CTO/CIO/CITO
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Implementer's Unit Head
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Implemented by
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-center">
                      <tr>
                        <td className="py-2 px-4 border border-black">
                          Md. Mostafejur Rahman
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Md. Mushfiqur Rahman
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Mohammad Mamunur Rashid
                        </td>
                        <td className="py-2 px-4 border border-black">
                          System Administration Unit
                        </td>
                      </tr>

                      <tr>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong> Pending</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong> Pending</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong> Pending</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong> Pending</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">
                          Comment: <strong> </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Comment: <strong></strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Comment: <strong></strong>
                        </td>
                        <td className="py-2 px-4 border border-black"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <SubmitButton onClick={handleSubmit} /> */}
              <div className="flex justify-center">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eacf;
