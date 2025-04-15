import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AllFormsHeader from "../../../component/AllFormsHeader";
import UnitHeadSearch from "../../../component/CRF/UnitHeadSearch";
import DbAdminApproval from "../../../component/DBARRF/DbAdminApproval";
import Dynamictable from "../../../component/Dynamictable";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import AccountTypeEdit from "../Arrf/AccountTypeEdit";
import AccessToDatabaseTableView from "./AccessToDatabaseTableView";
import ActionPurposeView from "./ActionPurposeView";

const DatabaseAccessRightEditForm = ({ type }) => {
  const { userId, formId, id } = useParams();
  const navigate = useNavigate();
  const [actype, setActype] = useState(" ");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [action, setAction] = useState("");
  const [accesstodatabase, setAccesstodatabase] = useState([]);
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [implbyunitheaduserid, setImplbyunitheaduserid] = useState(null);
  const [implbyunitheadusername, setImplbyunitheadusername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [implbyunitheadsearchTerm, setImplbyunitheadSearchTerm] = useState("");
  const [unit, setUnit] = useState("");
  const [formData, setFormData] = useState({});

  const [other, setOther] = useState("");

  const [implementedbyusername, setImplementedbyusername] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        ("abrar");
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId, type;
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        ({ data });
        ({ formData });

        setActype(data.actype);
        setAction(data.action);
        setFromDate(data.tempdatefrom);
        setToDate(data.tempdateto);
        setFromTime(data.temptimefrom);
        setToTime(data.temptimeto);
        setOther(data.other);

        fromDate, toDate, fromTime, toTime;

        setAccesstodatabase(data.accesstodatabase);

        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);
        setImplbyunitheaduserid(data.implbyunitheaduserid);
        setImplbyunitheadusername(data.implbyunitheadusername);

        setSearchTerm(data.unitheadusername + " - " + data.unitheaduserid);
        setImplementedbyusername(data.implementedbyusername);

        setImplbyunitheadSearchTerm(data.implbyunitheadusername);
      };
      fetchData();
    } catch (error) {
      error;
    }
  }, []);

  const handleactypeChange = (event) => {
    setActype(event.target.value);

    if (actype === "permanent") {
      setFromDate(null);
      setToDate(null);
      setFromTime(null);
      setToTime(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedFromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null;
    const formattedToDate = toDate ? format(toDate, "yyyy-MM-dd") : null;
    const decryptedId = decryptId(id);
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
        other,
        implementedbyusername,
      };

      ({ formData });
      const response = await fetch(
        `${Base_api}/api/database/update/${decryptedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      response;

      if (response.ok) {
        toast.success("Form Updated successfully!", {
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
        console.error("Error submitting form:aa", await response.json());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <ToastContainer />
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
            submitdate={formData.submitdate}
            referenceValue={formData.referencevalue}
          />
          <div className="my-5">
            <Dynamictable userid={decryptId(userId)} />
          </div>
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            To be completed by respective Requestor
          </h4>
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

          {/* <ActionPurposeComponent
            action={action}
            setAction={setAction}
            other={other}
            setOther={setOther}
            type={type}
          /> */}

          <ActionPurposeView
            type={type}
            action={action}
            setAction={setAction}
          />

          <AccessToDatabaseTableView
            accesstodatabase={accesstodatabase}
            setAccesstodatabase={setAccesstodatabase}
          />

          <UnitHeadSearch
            unitheaduserid={unitheaduserid}
            setUnitheaduserid={setUnitheaduserid}
            unitheadusername={unitheadusername}
            setUnitheadusername={setUnitheadusername}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
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

          {/* Update Button */}
          <div className="flex justify-center my-5">
            <button
              type="submit"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DatabaseAccessRightEditForm;
