import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnitHeadSearch from "../../../component/CRF/UnitHeadSearch.jsx";
import UnitHeadStatus from "../../../component/CRF/UnitHeadStatus.jsx";

import AllFormsHeader from "../../../component/AllFormsHeader.jsx";

import { jwtDecode } from "jwt-decode";
import Attachment from "../../../component/CRF/Attachment.jsx";
import CurrentDate from "../../../component/CRF/CurrentDate.jsx";
import DownTime from "../../../component/CRF/DownTime.jsx";
import FromTimeToTime from "../../../component/CRF/FromTimeToTime.jsx";
import Impact from "../../../component/CRF/Impact.jsx";
import KeyReason from "../../../component/CRF/KeyReason.jsx";
import RollBack from "../../../component/CRF/RollBack.jsx";
import SubmitButton from "../../../component/CRF/SubmitButton.jsx";
import Testing from "../../../component/CRF/Testing.jsx";
import TitlewithTextarea from "../../../component/CRF/TitlewithTextarea.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import Dynamictable4 from "../../../component/Dynamictable4.jsx";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";

const ChangeRequestForm = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [chngimplemation, setChngimplemation] = useState("");
  const [impltimestart, setImpltimestart] = useState("");
  const [impltimeend, setImpltimeend] = useState("");
  const [chngdescription, setChngDescription] = useState("");
  const [reasonofchng, setReasonofChng] = useState("");
  const [possiblebenefit, setPossibleBenefit] = useState("");
  const [possiblerisk, setPossibleRisk] = useState("");
  const [effectedsys, setEffectedChange] = useState("");

  const [testing, setSelectedTesting] = useState("");
  const [testdescription, setTestingDescription] = useState("");

  const [impactlevel, setSelectedImpact] = useState("");
  const [impactleveldes, setImpactDescription] = useState("");

  const [rollbackprocedure, setSelectedRollbackOption] = useState("");
  const [rollbackproceduredes, setrollBackDescription] = useState("");

  const [downtimereq, setSelectedDowntimeOption] = useState("");
  const [downtimeDescription, setDowntimeDescription] = useState("");

  const [attachtestdoc, setAttachtestdoc] = useState(null);
  const [impactanalysisdoc, setImpactDocumnet] = useState(null);
  const [downtimedoc, setDowntimeDocument] = useState(null);
  const [workcomdoc, setWorkDocument] = useState(null);

  const [requnit, setRequnit] = useState("");

  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");

  const handleAccessInfo = (e) => {
    setChngDescription(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("chngimplemation", chngimplemation);
    formData.append("impltimestart", impltimestart);
    formData.append("impltimeend", impltimeend);
    formData.append("chngdescription", chngdescription);
    formData.append("reasonofchng", reasonofchng);
    formData.append("possiblebenefit", possiblebenefit);
    formData.append("possiblerisk", possiblerisk);
    formData.append("effectedsys", effectedsys);
    formData.append("testing", testing);
    formData.append("testdescription", testdescription);
    formData.append("impactlevel", impactlevel);
    formData.append("impactleveldes", impactlevel);
    formData.append("rollbackprocedure", rollbackprocedure);
    formData.append("rollbackproceduredes", rollbackproceduredes);
    formData.append("downtimereq", downtimereq);
    formData.append("requnit", requnit);
    formData.append("attachtestdoc", attachtestdoc);
    formData.append("impactanalysisdoc", impactanalysisdoc);
    formData.append("downtimedoc", downtimedoc);
    formData.append("workcomdoc", workcomdoc);
    formData.append("unitheaduserid", unitheaduserid);
    formData.append("unitheadusername", unitheadusername);

    for (const value of formData.values()) {
      value;
    }

    try {
      const response = await fetch(`${Base_api}/api/change/save/${userid}`, {
        method: "POST",
        body: formData,
      });
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
        }); // Show success toast
        // Optionally clear form fields or handle success
        setTimeout(() => {
          navigate("/isrm");
        }, 3000);
      } else {
        toast.error("Failed to submit form."); // Show error toast
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form."); // Show error toast
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-white px-5 rounded-xl shadow-[0_5px_10px_0px_gray] w-[756px] h-[285vh] my-5">
        <div>
          <AllFormsHeader
            divname="ICT Division"
            formname="Change Request Form"
            dno="1003"
            vno="3.0"
            edate="08.10.2023"
            fpageno="1"
            lpageno="1"
            rdiv="ICT Division"
            rformname="CRF"
          />

          <Dynamictable userid={userid} />

          <RequestorTwo text="To be completed by respective Requestor" />

          <table className="w-full mt-4">
            <tr>
              <th></th>
            </tr>
            <tr>
              <td className="border border-black px-3 pb-3">
                <CurrentDate
                  text="Date:"
                  type="date"
                  id="date"
                  chngimplemation={chngimplemation}
                  setChngimplemation={setChngimplemation}
                />
              </td>
              <td className="border border-black px-3 pb-3">
                <FromTimeToTime
                  type="time"
                  id="from_time"
                  step="2"
                  endtype="time"
                  endid="end_time"
                  endstep="2"
                  impltimestart={impltimestart}
                  setImpltimestart={setImpltimestart}
                  impltimeend={impltimestart}
                  setImpltimeend={setImpltimeend}
                />
              </td>
            </tr>
          </table>

          <div className="my-5">
            <TitlewithTextarea
              title="Existing Access Information (if any) :"
              placeholder="Please provide,Existing Access Information"
              htmlFor="eai"
              id="eai"
              name="eai"
              width="w-full"
              margin_top="mt-2"
              handleChange={handleAccessInfo}
            />
          </div>

          <KeyReason
            reasonofchng={reasonofchng}
            setReasonofChng={setReasonofChng}
            possibleBenefit={possiblebenefit}
            setPossibleBenefit={setPossibleBenefit}
            possibleRisk={possiblerisk}
            setPossibleRisk={setPossibleRisk}
            effectedChange={effectedsys}
            setEffectedChange={setEffectedChange}
          />

          <Testing
            selectedTesting={testing}
            setSelectedTesting={setSelectedTesting}
            testingDescription={testdescription}
            setTestingDescription={setTestingDescription}
          />

          <Impact
            selectedImpact={impactlevel}
            setSelectedImpact={setSelectedImpact}
            impactDescription={impactleveldes}
            setImpactDescription={setImpactDescription}
          />

          <RollBack
            selectedRollbackOption={rollbackprocedure}
            setSelectedRollbackOption={setSelectedRollbackOption}
            rollBackDescription={rollbackproceduredes}
            setrollBackDescription={setrollBackDescription}
          />

          <DownTime
            selectedDowntimeOption={downtimereq}
            setSelectedDowntimeOption={setSelectedDowntimeOption}
            downtimeDescription={downtimeDescription}
            setDowntimeDescription={setDowntimeDescription}
          />

          <Attachment
            attachtestdoc={attachtestdoc}
            setAttachtestdoc={setAttachtestdoc}
            impactanalysisdoc={impactanalysisdoc}
            setImpactDocumnet={setImpactDocumnet}
            downtimedoc={downtimedoc}
            setDowntimeDocument={setDowntimeDocument}
            workcomdoc={workcomdoc}
            setWorkDocument={setWorkDocument}
          />

          <div className="my-5">
            <TitlewithTextarea
              type="text"
              title="Requesting Unit/ Department/Division : "
              placeholder="Requesting Unit/ Department/Division"
              htmlFor="ru"
              id="ru"
              name="requnit"
              width="w-full"
              margin_top="mt-2"
              onChange={(e) => setRequnit(e.target.value)}
            />
          </div>

          <UnitHeadSearch
            unitheaduserid={unitheaduserid}
            setUnitheaduserid={setUnitheaduserid}
            unitheadusername={unitheadusername}
            setUnitheadusername={setUnitheadusername}
            unitheadstatus={<UnitHeadStatus />}
          />

          <h4 className="text-center font-bold bg-gray-300 py-1 rounded-md mt-5 mb-3">
            To be completed by Admin
          </h4>

          <Dynamictable4
            userid={userid}
            fname="Recommended by Head of ISRM Unit/CISO"
            sname="Approval by HOICTD/CTO/CIO/CITO"
            tname="Recommended by (In-Charge DC/DR)"
            iby="Implemented by"
            tnameperson="Working"
            ibynameperson="Working"
            tnamestatus="Working"
            ibypersonstatus="Working"
          />

          <div className="my-5">
            <SubmitButton onClick={handleSubmit} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangeRequestForm;
