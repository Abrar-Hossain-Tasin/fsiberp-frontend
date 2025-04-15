import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import UnitHeadSearch from "../../../component/CRF/UnitHeadSearch.jsx";
import DbAdminApproval from "../../../component/DBARRF/DbAdminApproval.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import AccountTypeEdit from "../Arrf/AccountTypeEdit.jsx";
import AccessToDatabaseTable from "./AccessToDatabaseTable.jsx";
import ActionPurpose from "./ActionPurpose.jsx";

const DatabaseAccessRightSubmitForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [actype, setActype] = useState(" ");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [action, setAction] = useState([]);
  const [accesstodatabase, setAccesstodatabase] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [implbyunitheaduserid, setImplbyunitheaduserid] = useState(null);
  const [implbyunitheadusername, setImplbyunitheadusername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [implbyunitheadsearchTerm, setImplbyunitheadSearchTerm] = useState("");
  const [unit, setUnit] = useState("");

  const [isUnitValid, setIsUnitValid] = useState(true);

  const [other, setOther] = useState("");

  const [implementedbyusername, setImplementedbyusername] = useState("");

  const handleactypeChange = (event) => {
    setActype(event.target.value);

    if (event.target.value === "permanent") {
      setFromDate(null);
      setToDate(null);
      setFromTime(null);
      setToTime(null);
    }
  };

  useEffect(() => {
    accesstodatabase;
    implbyunitheaduserid, implbyunitheadusername;
  }, [implbyunitheaduserid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedFromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null;
    const formattedToDate = toDate ? format(toDate, "yyyy-MM-dd") : null;

    if (!unit) {
      toast.error("Implementer's Unit Head Field is required!", {
        autoClose: 2000,
      }); // Show toaster notification with auto-close
      return; // Stop submission if the required field is not filled
    }

    try {
      const formData = {
        action,
        actype,
        tempdatefrom: formattedFromDate,
        tempdateto: formattedToDate,
        temptimefrom: fromTime,
        temptimeto: toTime,
        accesstodatabase,
        unitheaduserid,
        unitheadusername,
        implbyunitheaduserid,
        implbyunitheadusername,
        other, // Ensure this is not null
        implementedbyusername,
      };

      formData;
      const response = await fetch(
        `http://localhost:8081/api/database/save/${userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Form Submitted successfully!", {
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
        }, 3000);
      } else {
        console.error("Error submitting form:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-auto">
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] p-5 my-5 w-[900px]">
        <div className="my-5">
          <AllFormsHeader
            divname="ICT Division"
            formname="Database Access Right Request Form"
            dno="1015"
            vno="3.0"
            edate="08.10.2023"
            fpageno="1"
            lpageno="1"
            rdiv="ICT Division"
            rformname="DARRF"
          />
          <div className="my-5">
            <Dynamictable userid={userid} />
          </div>
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            To be completed by respective Requestor
          </h4>
          <div className="mt-5">
            <AccountTypeEdit
              actype={actype}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              fromTime={fromTime}
              setFromTime={setFromTime}
              toTime={toTime}
              setToTime={setToTime}
              handleactypeChange={handleactypeChange}
            />
          </div>

          <div className="mt-5">
            <div className="flex flex-col">
              {/* <ActionPurposeComponent
              action={action}
              setAction={setAction}
              other={other}
              setOther={setOther}
            /> */}
              <ActionPurpose action={action} setAction={setAction} />

              {/* <textarea
              rows={2}
              type="text"
              onChange={(e) => setOther(e.target.value)}
              className="border border-black p-2 h-[42px] mt-4"
              placeholder="Enter Others Value"
            /> */}
            </div>
          </div>

          <div className="mt-5">
            <AccessToDatabaseTable
              accesstodatabase={accesstodatabase}
              setAccesstodatabase={setAccesstodatabase}
            />

            <div>
              <UnitHeadSearch
                unitheaduserid={unitheaduserid}
                setUnitheaduserid={setUnitheaduserid}
                unitheadusername={unitheadusername}
                setUnitheadusername={setUnitheadusername}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              To be completed by Admin
            </h4>

            <DbAdminApproval
              implbyunitheaduserid={implbyunitheaduserid}
              setImplbyunitheaduserid={setImplbyunitheaduserid}
              implbyunitheadusername={implbyunitheadusername}
              setImplbyunitheadusername={setImplbyunitheadusername}
              implbyunitheadsearchTerm={implbyunitheadsearchTerm}
              setImplbyunitheadSearchTerm={setImplbyunitheadSearchTerm}
              unit={unit}
              setUnit={setUnit}
              implementedbyusername={implementedbyusername}
              setImplementedbyusername={setImplementedbyusername}
            />
            <div className="w-full flex justify-center">
              <input
                type="submit"
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DatabaseAccessRightSubmitForm;
