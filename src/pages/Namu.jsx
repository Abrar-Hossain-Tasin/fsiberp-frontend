import Allformsname from "../component/AllFormsName.jsx/Allformsname";

import { toast } from "react-toastify";

const Namu = () => {
  const handleFormClick = () => {
    toast.info("Under Development", { autoClose: 2000 });
  };
  return (
    <>
      <section>
        <div className="">
          <div className="mt-5">
            <div className=" w-[1000px] flex justify-between gap-2 flex-wrap">
              <Allformsname
                title="Access Control Permission Form"
                path="/namu/acpf"
              />

              <Allformsname
                title="WiFi Enrollment Form"
                // path="/namu/wef"
                onClick={handleFormClick}
                disabled={true}
              />

              <Allformsname
                title="Internet Request Form"
                // path="/namu/irf"
                onClick={handleFormClick}
                disabled={true}
              />

              {/* <Allformsname
                title="4. Network Implementation Process flow Checklist"
                path="/namu/acpf"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Namu;
