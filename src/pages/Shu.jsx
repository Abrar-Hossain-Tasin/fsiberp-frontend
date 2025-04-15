import Allformsname from "../component/AllFormsName.jsx/Allformsname";

const Shu = () => {
  return (
    <>
      <section>
        <div className="">
          <div className="mt-5">
            <div className=" w-[1000px] flex justify-between gap-2 flex-wrap">
              <Allformsname title="Domain ID Creation Form" path="/shu/dicf" />

              {/* <Allformsname title="2. Repairing Request Form" path="/shu/rrf" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shu;
