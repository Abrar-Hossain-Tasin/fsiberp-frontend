import { useEffect, useState } from "react";
import Allformsname from "../component/AllFormsName.jsx/Allformsname";
import { Base_api } from "../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const Cbs = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [previousFormData, setPreviousFormData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/userview/${userid}`
        );
        const data = await response.json();
        setPreviousFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userid]);

  return (
    <section>
      <div className="">
        <div className="mt-5">
          <div className=" w-[1000px] flex justify-start gap-2 flex-wrap">
            {previousFormData[0]?.implementedbystatus === "Done" ||
            previousFormData.length === 0 ? (
              <Allformsname title="CBS-User Permission/Role" path="/cbs/upor" />
            ) : (
              <div onClick={openPopup}>
                <h1
                  className={`w-80 font-bold text-lg p-2 mb-2 cursor-pointer border-2 ${"border-green-700 text-[#151414] hover:bg-custom-gradient-hover hover:text-white hover:border-white"} transition duration-300 rounded-lg shadow-lg`}
                >
                  <FontAwesomeIcon icon={faFile} /> {"CBS-User Permission/Role"}
                </h1>
              </div>
            )}

            <div>
              {/* Popup Modal */}
              {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-lg mb-4 font-[500] text-justify">
                      Your previous CBS user permission / role form is not yet
                      approved, so you cannot submit it again.
                    </h1>
                    <div className="flex justify-center">
                      <button
                        onClick={closePopup}
                        className="px-2 py-1 font-[500] bg-red-500 text-white rounded hover:bg-red-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <Allformsname title="Internet Request Form" path="/namu/irf" /> */}

            {/* <Allformsname
                title="4. Network Implementation Process flow Checklist"
                path="/namu/acpf"
              /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cbs;
