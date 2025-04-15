import { useEffect, useState } from "react";
import AdminApproveText from "../../../component/AdminApproveText.jsx";
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import TitlewithTextarea from "../../../component/CRF/TitlewithTextarea.jsx";
import Dynamictable5 from "../../../component/DynamicTable5.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import Requestor from "../../../component/Requestor.jsx";
import Textarea from "../../../component/Textarea.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const Rarf = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  // unit_head_search
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/access/emplist/${userid}`
        );
        const data = await response.json();
        setEmpList(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    const filtered = empList.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };

  const handleOptionClick = (username, userid) => {
    setSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    // setUnitheaduserid(userid);
    // setUnitheadusername(username);
  };
  // unit_head_search_finish
  return (
    <div className="bg-white pb-5 rounded-xl shadow-[0_5px_10px_0px_gray]">
      <div>
        <AllFormsHeader
          divname="ICT Division"
          formname="REMOTE ACCESS REQUEST FORM"
          dno="1007"
          vno="3.0"
          edate="08.10.2023"
          fpageno="1"
          lpageno="3"
          rdiv="ICTD"
          rformname="RARF"
          headformname="REMOTE ACCESS REQUEST FORM"
        />

        <section className="mx-32 w-[716px]">
          <Dynamictable userid={userid} />

          <Requestor />

          <div className="grid grid-cols-2 gap-52">
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>{" "}
              <br />
              <Textarea rows="1" width="w-64" placeholder="Email" id="email" />
            </div>

            <div>
              <label htmlFor="organization">
                <strong>Organization</strong>
              </label>{" "}
              <br />
              <Textarea
                rows="1"
                width="w-64"
                placeholder="Organization"
                id="organization"
              />
            </div>
          </div>

          <div>
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              For Vendor Access Purpose
            </h4>
          </div>

          <div>
            <table className="w-full">
              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="Personnel">
                    Assigned FSIB Personnel Name
                  </label>
                </th>

                <th className="border border-black py-2">
                  <label htmlFor="emp_id">Employee ID</label>
                </th>

                <th className="border border-black py-2">
                  <label htmlFor="designation">Designation</label>
                </th>
              </tr>

              <tr>
                <td className="border border-black py-2 text-center">
                  <Textarea
                    rows="1"
                    width="w-48"
                    placeholder="Assigned FSIB..."
                    id="Personnel"
                  />
                </td>

                <td className="border border-black py-2 text-center">
                  <Textarea
                    rows="1"
                    width="w-48"
                    placeholder="Employee_ID"
                    id="emp_id"
                  />
                </td>

                <td className="border border-black py-2 text-center">
                  <Textarea
                    rows="1"
                    width="w-48"
                    placeholder="Designation"
                    id="designation"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div className="mt-5">
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              Remote Access Details
            </h4>
          </div>

          <div className="my-5">
            <table className="w-full">
              <tr>
                <th className="border border-black py-2">Action</th>
                <th className="border border-black py-2">Access Type</th>
              </tr>

              <tr>
                <td className="border border-black py-2 text-center">
                  <input
                    type="radio"
                    id="create"
                    name="action_type"
                    value="Creation"
                  />
                  <label htmlFor="create" className="ml-1">
                    Creation
                  </label>{" "}
                  <input
                    type="radio"
                    id="modify"
                    name="action_type"
                    value="Modification"
                    className="ml-2"
                  />
                  <label htmlFor="modify" className="ml-1">
                    Modification
                  </label>{" "}
                  <input
                    type="radio"
                    id="delete"
                    name="action_type"
                    value="Deletion"
                    className="ml-2"
                  />
                  <label htmlFor="delete" className="ml-1">
                    Deletion
                  </label>
                </td>

                <td className="border border-black py-2 text-center">
                  <input
                    type="checkbox"
                    id="onsite"
                    name="access_type"
                    value="Onsite Access"
                    className="ml-2"
                  />
                  <label htmlFor="onsite" className="ml-1">
                    Onsite Access
                  </label>

                  <input
                    type="checkbox"
                    id="offsite"
                    name="access_type"
                    value="Offsite Access"
                    className="ml-2"
                  />
                  <label htmlFor="offsite" className="ml-1">
                    Offsite Access
                  </label>
                </td>
              </tr>
            </table>
          </div>

          <div>
            <TitlewithTextarea
              title="Purpose of Access:"
              placeholder="Purpose of Access"
              htmlFor="of_access"
              id="of_access"
              name="of_access"
              width="w-full"
              titlebottom="mb-1"
              margin_bottom="mb-3"
            />

            <TitlewithTextarea
              title="Workstation IP Address under FSIB LAN for secure Remote Access:"
              placeholder="Workstation IP ..."
              htmlFor="ip_address"
              id="ip_address"
              name="ip_address"
              width="w-full"
              titlebottom="mb-1"
              margin_bottom="mb-3"
            />

            <TitlewithTextarea
              title="For Offsite Access, please mention the originating county:"
              placeholder="For Offsite Access ..."
              htmlFor="offsite_access"
              id="offsite_access"
              name="offsite_access"
              width="w-full"
              titlebottom="mb-1"
              margin_bottom="mb-3"
            />

            <TitlewithTextarea
              title="Please specify the list of systems that need access to along with requirement details (i.e. Server IP
address & hostname details):"
              placeholder="Please specify the list ..."
              htmlFor="specify_the_list"
              id="specify_the_list"
              name="specify_the_list"
              width="w-full"
              titlebottom="mb-2"
              margin_bottom="mb-3"
            />
          </div>

          <div className="mb-5">
            <table className="w-full">
              <tr className="">
                <th className="border border-black py-2 px-1">
                  Does this request relate to an existing remote access account?
                </th>

                <th className="border border-black py-2">
                  If yes, what is the related remote access Account User ID?
                </th>

                <th className="border border-black py-2 px-1">
                  Remote Access deactivation period/Time:
                </th>
              </tr>

              <tr>
                <td className="border border-black py-2 text-center">
                  <input type="radio" id="request_yes" />
                  <label
                    htmlFor="request_yes"
                    id="request_yes"
                    name="request_yes"
                    value="Yes"
                    className="ml-1"
                  >
                    Yes
                  </label>

                  <input type="radio" id="request_no" className="ml-2" />
                  <label
                    htmlFor="request_no"
                    id="request_no"
                    name="request_no"
                    value="No"
                    className="ml-1"
                  >
                    No
                  </label>
                </td>

                <td className="border border-black py-2 text-center">
                  <Textarea
                    rows="1"
                    width="w-48"
                    placeholder="If yes, what is the ..."
                    id="Personnel"
                  />
                </td>

                <td className="border border-black py-2 text-center">
                  <input
                    type="time"
                    step="2"
                    className="text-[#514f4f] border-2 border-[#d2d2e4] p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div className="mt-4  mb-4">
            <table className="w-full">
              <tr>
                <th className="border border-black">
                  <label htmlFor="requesting_unit">
                    Approved by (Head of Branch/Unit/Division/Department)
                  </label>
                </th>
                <th className="border border-black">
                  <label htmlFor="downtime_duration_desc">Status</label>
                </th>
              </tr>

              <tr className="">
                <td className="border border-black">
                  <div className="flex justify-center ">
                    <div className="relative ">
                      <input
                        type="text"
                        id="search-input"
                        name="search"
                        className="text-[#514f4f] border-2 border-[#d2d2e4] w-80 p-1  my-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                        placeholder="Search Here!"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      {showOptions && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredOptions.map((item) => (
                            <li
                              key={item.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleOptionClick(item.username, item.userid)
                              }
                            >
                              {item.username} - {item.userid}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </td>
                <td className="border border-black text-center">
                  <strong className="">Pending!</strong>
                </td>
              </tr>
            </table>
          </div>

          <div>
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              Remote Access Terms & Conditions
            </h4>
          </div>

          <div className="mb-5 ml-5">
            <ul className="list-disc text-justify">
              <li className="mb-1">
                FSIB employee or Vendor’s desktop/laptop has to be password
                protected and should be updated with latest antivirus. In
                addition to that, OS level firewall of that particular device
                should be in active mode during remote session
              </li>

              <li className="mb-1">
                FSIB employee or Vendor have to use no other than Windows or Mac
                operating system on the computer to get access of Remote
                connection to FSIB.
              </li>

              <li className="mb-1">
                Assigned remote user should have their own username and password
                to access the remote service rather than a generic name.
                Username should contain Name/Employee ID.
              </li>

              <li className="mb-1">
                Username & password of remote Access Service should not be
                shared with anyone & password need to be complex.
              </li>

              <li className="mb-1">
                FSIB Employee or Vendor’s computer have to connect via secure
                remote access with a FSIB workstation at first. Then from that
                designated workstation under FSIB LAN, vendor/Employee should
                connect to the Application/DB Server.
              </li>

              <li className="mb-1">
                FSIB Employee or Vendor must not connect with the system
                directly by using remote connectivity.
              </li>

              <li className="mb-1">
                Remote user will be automatically disconnected from FSIB network
                if the session remains inactive for a definite time of period
                (recommended 05 minute). The user must log in again to reconnect
                to the FSIB network after session timeout period.
              </li>
              <li className="mb-1">
                FSIB Employee or vendor must need to connect to the FSIB network
                via Global Protect Secure VPN connection using IPsec framework
                only. Using SSL framework is highly discouraged.
              </li>
              <li className="mb-1">
                Access and Session log from Global Protect need to be reviewed
                regularly & submitted to InfoSec
              </li>
              <li className="mb-1">
                Employee or Vendor must have the least privileged access needed
                to access the system/ FSIB Servers using remote connectivity.
              </li>
              <li className="mb-1">
                If any changes have to be made while working using remote
                connectivity, then it should be made sure that the change has
                been done according to preapproved change management procedure.
              </li>
              <li className="mb-1">
                Concern stakeholders should preserve & review the remote access
                user activity log for audit purpose.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              Declaration
            </h4>
          </div>

          <div className="mb-5">
            <p className="text-justify">
              I am fully aware of and have read the Remote Access Policy &
              related procedures on information security, confidentiality and
              data protection and agree to uphold them. <br /> <br /> FSIB
              reserves the right to revoke this privilege if users do not abide
              by the policies and procedures outlined above. Violations to this
              policy will be handled through the Bank’s disciplinary procedures.
              <br /> <br /> By signing this from, I declare that the information
              provided in this request form is accurate to the best of my
              knowledge, and I accept responsibility of any security problems or
              threats related to this remote access.
            </p>
          </div>

          <AdminApproveText />

          <Dynamictable5
            userid={userid}
            fname="Verified by
          System & Hardware Unit"
            sname="Verified by
          Network Administration and Management Unit"
            tname="Recommended by
          Head of ISRM Unit/CISO"
            fourthname="Approval by
          HOICTD/CITO"
            iby="Access Provided by
         Information Security and Risk Management Unit "
            ibynameperson="Working"
          />

          <div className="flex justify-center items-center mt-5">
            <p
              className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
              // onClick={handleSubmit}
            >
              Submit
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rarf;
