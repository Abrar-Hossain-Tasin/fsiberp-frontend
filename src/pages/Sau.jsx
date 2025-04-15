import Allformsname from "../component/AllFormsName.jsx/Allformsname";

const Sau = () => {
  return (
    <>
      <section>
        <div className="">
          <div className="mt-5">
            <div className="w-[1000px] flex justify-between gap-2 ">
              <Allformsname
                title="Email Account Creation Form"
                path="/sau/eacf"
              />

              <Allformsname title="Group Mail Creation Form" path="/sau/gmcf" />

              <Allformsname title="Domain ID Creation Form" path="/sau/dicf" />

              {/* <Allformsname
                title="3. Server Deployment Process flow Checklist"
                path="/sau/sdpfc"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sau;
