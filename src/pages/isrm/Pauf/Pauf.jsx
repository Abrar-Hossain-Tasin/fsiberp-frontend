import { jwtDecode } from "jwt-decode";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import LabelwithInput from "../../../component/LabelWithInput/LabelwithInput.jsx";
import InputTwo from "../../../component/OthersCopyComponent/InputTwo";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo.jsx";
import PaufAdmin from "../../../component/Pauf/AdminPauf";
import RadioButton from "../../../component/RadioButton/RadioButton";
import { Base_api } from "../../../utils/api/Base_api.jsx";

import { useEffect, useState } from "react";

const Pauf = () => {
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
  // unit_head_search

  return (
    <>
      <AllFormsHeader
        divname="ICT Division"
        formname="PAM User Access Form"
        dno="1011"
        vno="3.0"
        edate="08.10.2023"
        fpageno="1"
        lpageno="1"
        rdiv="ICT Division"
        rformname="PUAF"
        headformname="PAM User Access Form"
      />

      <section className="w-[716px] mx-32">
        <Dynamictable userid={userid} />

        <div>
          <RequestorTwo text="To be completed by respective Branch/Unit/Department/ Division" />

          <div>
            <LabelwithInput
              labelhtmlfor="edun"
              labelname="Employee Domain User Name : "
              placeholder="Employee Domain User Name"
              inputtype="text"
              inputid="edun"
              inputname="edun"
              width="w-64"
              margin_left="ml-2"
            />
          </div>

          <div className="my-4">
            <table className="w-full">
              <tr>
                <th className="border border-black py-2">Action</th>

                <th className="border border-black py-2">
                  <RadioButton
                    id="granting"
                    name="action"
                    value="Granting"
                    htmlFor="granting"
                    labeltext="Granting"
                    className="ml-1"
                  />
                </th>

                <th className="border border-black py-2">
                  <RadioButton
                    id="delete"
                    name="action"
                    value="Delete"
                    htmlFor="delete"
                    labeltext="Delete"
                    className="ml-1"
                  />
                </th>

                <th className="border border-black py-2">
                  <RadioButton
                    id="modify"
                    name="action"
                    value="Modify"
                    htmlFor="modify"
                    labeltext="Modify"
                    className="ml-1"
                  />
                </th>
              </tr>
            </table>
          </div>

          <div>
            <table className="w-full">
              <tr>
                <th className="border border-black py-2" colSpan="2">
                  User Access Role
                </th>
              </tr>

              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="role">Role</label>
                </th>
                <th className="border border-black py-2">
                  <label htmlFor="purpose">Purpose</label>
                </th>
              </tr>

              <tr>
                <td className="border border-black py-2 text-center">
                  <InputTwo
                    type="text"
                    id="role"
                    placeholder="Role"
                    name="role"
                  />
                </td>

                <td className="border border-black py-2 text-center">
                  <InputTwo type="text" id="purpose" placeholder="Purpose" />
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
          {/* unit_head_search_finish */}

          <RequestorTwo text="To be completed by ICT Division" />

          <PaufAdmin
            userid={userid}
            fname="Recommended by Head of ISRM Unit/CISO"
            sname="Approval by HOICTD/CTO/CIO/CITO"
            iby="Implemented by"
          />

          <div className="flex justify-center items-center mt-4">
            <p
              className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
              //   onClick={handleSubmit}
            >
              Submit
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pauf;
