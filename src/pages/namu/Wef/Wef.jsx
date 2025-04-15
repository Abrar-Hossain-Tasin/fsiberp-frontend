import { useEffect, useState } from "react";
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import Dynamictablefour from "../../../component/OthersCopyComponent/DynamicTablefour.jsx";
import Requestor from "../../../component/Requestor.jsx";
import Textarea from "../../../component/Textarea.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const Wef = () => {
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
        formname="Wifi Enrollment Request Form"
        dno="1008"
        vno="3.0"
        edate="08.10.2023"
        fpageno="1"
        lpageno="1"
        rdiv="ICTD"
        rformname="WERF"
        headformname="Wifi Enrollment Request Form"
      />

      <section className="mx-32 w-[716px]">
        <Dynamictable userid={userid} />

        <Requestor />

        <div>
          <table className="w-full">
            <tr>
              <th className="border border-black py-2" colSpan="5">
                Device Information
              </th>
            </tr>
            <tr>
              {/* <th className="border border-black py-2">
                <label htmlFor="Sl_No">SL No</label>
              </th> */}

              <th className="border border-black py-2">
                <label htmlFor="device">Device</label>
              </th>
              <th className="border border-black py-2">
                <label htmlFor="owner">Owner</label>
              </th>
              <th className="border border-black py-2">
                <label htmlFor="purpose">Purpose</label>
              </th>
            </tr>

            <tr>
              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="All Device"
                  width="w-48"
                  margin_left="mx-4"
                  id="device"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Owner"
                  width="w-48"
                  margin_left="mx-4"
                  id="owner"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Purpose"
                  width="w-48"
                  margin_left="mx-4"
                  id="purpose"
                />
              </td>
            </tr>

            <tr>
              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="All Device"
                  width="w-48"
                  margin_left="mx-4"
                  id="device"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Owner"
                  width="w-48"
                  margin_left="mx-4"
                  id="owner"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Purpose"
                  width="w-48"
                  margin_left="mx-4"
                  id="purpose"
                />
              </td>
            </tr>

            <tr>
              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="All Device"
                  width="w-48"
                  margin_left="mx-4"
                  id="device"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Owner"
                  width="w-48"
                  margin_left="mx-4"
                  id="owner"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Purpose"
                  width="w-48"
                  margin_left="mx-4"
                  id="purpose"
                />
              </td>
            </tr>

            <tr>
              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="All Device"
                  width="w-48"
                  margin_left="mx-4"
                  id="device"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Owner"
                  width="w-48"
                  margin_left="mx-4"
                  id="owner"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Purpose"
                  width="w-48"
                  margin_left="mx-4"
                  id="purpose"
                />
              </td>
            </tr>

            <tr>
              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="All Device"
                  width="w-48"
                  margin_left="mx-4"
                  id="device"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Owner"
                  width="w-48"
                  margin_left="mx-4"
                  id="owner"
                />
              </td>

              <td className="border border-black text-center py-2">
                <Textarea
                  rows="1"
                  placeholder="Purpose"
                  width="w-48"
                  margin_left="mx-4"
                  id="purpose"
                />
              </td>
            </tr>
          </table>

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
              To be completed by ICT
            </h4>

            <div>
              <table className="w-full">
                <tr>
                  <th className="border border-black py-2">Device</th>
                  <th className="border border-black py-2">
                    MAC Address (Filled By ICT)
                  </th>
                </tr>

                <tr>
                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="User Device"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>

                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="MAC Address"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="User Device"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>

                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="MAC Address"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="User Device"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>

                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="MAC Address"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="User Device"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>

                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="MAC Address"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="User Device"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>

                  <td className="border border-black text-center py-2">
                    <Textarea
                      rows="1"
                      placeholder="MAC Address"
                      width="w-48"
                      margin_left="mx-4"
                      id="purpose"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <Dynamictablefour
            userid={userid}
            fname="Verified by Network Unit"
            tname="Verified by System & Hardware Unit"
            sname="Recommended by Head of ISRM Unit/CISO"
            iby="Approval by HOICTD/CTO/CIO/CITO"
          />

          <div className="flex justify-center items-center my-4">
            <p
              className="mb-4 mt-2 text-center bg-green-500 w-1/2 p-1 rounded-md text-white font-bold cursor-pointer "
              // onClick={handleSubmit}
            >
              Submit
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wef;
