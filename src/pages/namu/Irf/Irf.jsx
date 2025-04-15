import { useEffect, useState } from "react";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import AdminTableTwo from "../../../component/Internet_Access_Admin/AdminTableTwo";
import Requestor from "../../../component/Requestor";
import Textarea from "../../../component/Textarea.jsx";
import { jwtDecode } from "jwt-decode";

const IRF = () => {
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
    <div className="flex flex-col">
      <AllFormsHeader
        divname="ICT Division"
        formname="Internet Access Request Form"
        dno="1009"
        vno="3.0"
        edate="08.10.2023"
        fpageno="1"
        lpageno="1"
        rdiv="ICTD"
        rformname="IARF"
        headformname="Internet Access Request Form"
      />

      <section className="mx-32 w-[716px]">
        <Dynamictable userid={userid} />

        <Requestor />

        <div className="mb-4">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2">PC Name</th>
              <th className="border border-black py-2">IP Address</th>
              <th className="border border-black py-2">Email Address</th>
              {/* <th className="border border-black py-2">Mobile</th> */}
            </tr>

            <tr>
              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="PC Name"
                    width="w-48"
                    id="PC_Name"
                  />
                </div>
              </td>

              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="IP Address"
                    width="w-48"
                    id="IP_Address"
                  />
                </div>
              </td>

              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="Email Address"
                    width="w-48"
                    margin_left="mx-4"
                    id="Email_Address"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div className="mb-4">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2">Access Type</th>
              <th className="border border-black py-2">If Temporary Select</th>
            </tr>

            <tr>
              <td className="border border-black py-2 ">
                <div className="flex justify-center">
                  <input
                    type="radio"
                    id="permanent"
                    name="access_type"
                    value="Permanent"
                    className="ml-5"
                  />

                  <label htmlFor="permanent" className="ml-2">
                    Permanent
                  </label>

                  <input
                    type="radio"
                    id="temporary"
                    name="access_type"
                    value="Temporary"
                    className="ml-5"
                  />

                  <label htmlFor="temporary" className="ml-2">
                    Temporary
                  </label>
                </div>
              </td>

              <td className="border border-black py-2 ">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="Tell Duration"
                    width="w-64"
                    margin_left="mx-4"
                    id="PC_Name"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div>
          <table className="w-full">
            <tr>
              <th className="border border-black py-2">Purpose</th>
              <th className="border border-black py-2">Date Applied</th>
            </tr>

            <tr>
              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="Purpose"
                    width="w-64"
                    // margin_left="mx-4"
                    id="Purpose"
                  />
                </div>
              </td>

              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <input
                    type="date"
                    className={`text-[#514f4f] border-2 border-[#d2d2e4]  p-1    rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]`}
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>

        {/* unit_head_search */}
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
        {/* unit_head_search finish*/}

        <h4 className="text-center font-bold bg-gray-300 py-1 rounded-md mt-5 mb-3">
          To be completed by System & Hardware Team of ICT
        </h4>
        <div className="mb-5">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2">
                Windows Patch & Anti-Virus Status
              </th>

              <th className="border border-black py-2">
                Information filled-up by
              </th>
            </tr>

            <tr>
              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="Windows Patch & Anti-Virus..."
                    width="w-64"
                    margin_left="mx-4"
                    id="Windows"
                  />
                </div>
              </td>

              <td className="border border-black py-2">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    placeholder="Information filled-up by"
                    width="w-64"
                    margin_left="mx-4"
                    id="Information"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>

        <h4 className="text-center font-bold bg-gray-300 py-1 rounded-md mt-5 mb-3">
          To be completed by Admin
        </h4>
        <div className="mb-5">
          <AdminTableTwo
            userid={userid}
            sname="Approval by HOICTD/CTO/CIO/CITO"
            tname="Recommended by Head of ISRM Unit/CISO"
            iby="Implemented by"
            tnameperson="Working"
            ibynameperson="Working"
            tnamestatus="Working"
            ibypersonstatus="Working"
          />
        </div>

        <div className="flex justify-center items-center ">
          <p
            className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
            // onClick={handleSubmit}
          >
            Submit
          </p>
        </div>
      </section>
    </div>
  );
};

export default IRF;
