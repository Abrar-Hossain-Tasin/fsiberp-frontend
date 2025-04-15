import { useEffect, useState } from "react";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import LabelwithInput from "../../../component/LabelWithInput/LabelwithInput";
import InputTwo from "../../../component/OthersCopyComponent/InputTwo";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo";
import RadioButton from "../../../component/RadioButton/RadioButton";

import DomainAdminTable from "../../../component/OthersCopyComponent/DomainAdminTable";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const Dicf = () => {
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
    <>
      <section className="mx-32 w-[716px]">
        <AllFormsHeader
          divname="ICT Division"
          formname="Domain ID Create/Freeze/Edit/Unlock/Transfer Form"
          dno="1010"
          vno="3.0"
          edate="08.10.2023"
          fpageno="1"
          lpageno="1"
          rdiv="ICTD"
          rformname="DIC"
          headformname="Domain ID  Form"
        />
        <Dynamictable userid={userid} />
        <RequestorTwo text="To be completed by respective Branch/Unit/Department/ Division/Zone" />
        <div className="my-4">
          <LabelwithInput
            labelhtmlfor="date_of_join"
            labelname="Date of Join:"
            inputtype="date"
            inputid="date_of_join"
            inputname="date_of_join"
            width="w-52"
            margin_left="ml-2"
          />

          <span className="ml-[8.7rem]">
            <LabelwithInput
              labelhtmlfor="email_id"
              labelname="Email:"
              inputtype="email"
              inputid="email_id"
              inputname="email_id"
              width="w-52"
              margin_left="ml-2"
              placeholder="Enter your Email"
            />
          </span>
        </div>
        <div className="mb-4">
          <LabelwithInput
            labelhtmlfor="join_letter"
            labelname="Joining Letter ( For New Employees and Transfer From Another Branch):"
            inputtype="file"
            inputid="join_letter"
            inputname="join_letter"
            width="w-80"
            margin_top="mt-3"
          />
        </div>

        <div>
          <table className="w-full">
            <tr>
              <td className="border border-black py-2 pl-2 text-center">
                <strong>Action</strong>
              </td>
              <td className="border border-black py-2 pl-2">
                <div className="text-center">
                  <RadioButton
                    id="create"
                    name="action"
                    value="Create"
                    htmlFor="create"
                    labeltext="Create"
                    className="ml-1"
                  />

                  <RadioButton
                    id="freeze"
                    name="action"
                    value="Freeze"
                    htmlFor="freeze"
                    labeltext="Freeze"
                    className="ml-1"
                    ml="ml-4"
                  />

                  <RadioButton
                    id="edit"
                    name="action"
                    value="Edit"
                    htmlFor="edit"
                    labeltext="Edit"
                    className="ml-1"
                    ml="ml-4"
                  />

                  <RadioButton
                    id="reset"
                    name="action"
                    value="Reset"
                    htmlFor="reset"
                    labeltext="Reset"
                    className="ml-1"
                    ml="ml-4"
                  />

                  <RadioButton
                    id="unlock"
                    name="action"
                    value="Unlock"
                    htmlFor="unlock"
                    labeltext="Unlock"
                    className="ml-1"
                    ml="ml-4"
                  />

                  <RadioButton
                    id="transfer"
                    name="action"
                    value="Transfer"
                    htmlFor="transfer"
                    labeltext="Transfer"
                    className="ml-1"
                    ml="ml-4"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="my-4">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2" colSpan="4">
                Transfer Details
              </th>
            </tr>

            <tr>
              <th className="border border-black py-2">
                <label htmlFor="pre_place">Previous Place</label>
              </th>
              <th className="border border-black py-2">
                <label htmlFor="pres_place">Present Place</label>
              </th>
              <th className="border border-black py-2">
                <label htmlFor="date_of">Date of Transfer/Join</label>
              </th>
            </tr>

            <tr>
              <td className="border border-black py-2 text-center">
                <InputTwo
                  type="text"
                  id="pre_place"
                  name="pre_place"
                  placeholder="Previous Place"
                />
              </td>

              <td className="border border-black py-2 text-center">
                <InputTwo
                  type="text"
                  id="pres_place"
                  name="pres_place"
                  placeholder="Present Place"
                />
              </td>

              <td className="border border-black py-2 text-center">
                <div className="border-b border-black mb-2">
                  <RadioButton
                    id="transfer_date"
                    name="date_of_t_or_j"
                    value="Transfer"
                    htmlFor="transfer_date"
                    labeltext="Transfer"
                    className="ml-1"
                  />

                  <RadioButton
                    id="join"
                    name="date_of_t_or_j"
                    value="Join"
                    htmlFor="join"
                    labeltext="Join"
                    className="ml-1"
                    ml="ml-4"
                  />
                </div>

                <InputTwo
                  type="date"
                  id="date_of"
                  name="date_of"
                  placeholder="Date Of ..."
                />
              </td>
            </tr>
          </table>
        </div>
        {/* unit_head_search */}
        <div className="mt-4  mb-4">
          <table className="w-full">
            <tr>
              <th className="border border-black">
                <label htmlFor="search-input">
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
        {/* terms and condition */}
        <div className="my-4">
          <h2 className="text-center text-xl underline">
            <strong>Terms and Condition</strong>
          </h2>

          <h2 className="underline">
            <strong>Password : </strong>
          </h2>

          <ol className="list-decimal ml-4 mt-2">
            <li>
              The minimum password length at least 6 characters, combination of
              uppercase, lowercase, numbers & may include special characters.
            </li>

            <li>The maximum validity period of password will be 45 days</li>

            <li>
              In case of wrong password for 3 times your Account will be locked.
            </li>
            <li>Same passwords to be used again after at least 4 times.</li>
          </ol>
        </div>
        {/* terms and condition */}
        {/* admin_panel_ict */}
        <div>
          <RequestorTwo text="To be completed by ICT" />
          <DomainAdminTable
            userid={userid}
            fname="Checked By AD In charge"
            sname="Approval by HOICTD/CTO/CIO/CITO"
            tname="Recommended by Head of ISRM Unit/CISO"
            iby="Implemented by"
            tnameperson="Working"
            ibynameperson="Working"
            tnamestatus="Working"
            ibypersonstatus="Working"
          />
        </div>
        {/* admin_panel_ict */}
        <div className="flex justify-center items-center mt-4 ">
          <p
            className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
            // onClick={handleSubmit}
          >
            Submit
          </p>
        </div>
      </section>
    </>
  );
};

export default Dicf;
