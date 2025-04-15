import Allformsname from "../component/AllFormsName.jsx/Allformsname";

import { toast } from "react-toastify";

const Isrm = () => {
  const handleFormClick = () => {
    toast.info("Under Development", { autoClose: 2000 });
  };
  return (
    <>
      <section>
        <div className="mt-5">
          <div className=" w-[1000px] flex justify-between gap-2 flex-wrap items-stretch">
            <Allformsname
              title="Access Rights Request Form"
              // path="/isrm/arrf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="Change Request Form"
              // path="/isrm/crf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="Incident Report Form"
              // path="/isrm/irf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="Remote Access Request Form"
              // path="/isrm/rarf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="PAM user Access Form"
              // path="/isrm/puaf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="PAM System on-boarding Form"
              // path="/isrm/psf"
              onClick={handleFormClick}
            />

            <Allformsname
              title="Database Access Right Request Form"
              // path="/isrm/darrf"
              onClick={handleFormClick}
            />

            {/* <Allformsname
              title="7. Security Product Deployment Process flow Checklist"
              path="/isrm/spdpfc"
            />

            <Allformsname
              title="8. Software Application Deployment Process flow Checklist"
              path="/isrm/sadpfc"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Isrm;
