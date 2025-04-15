import AddChecker from "./AddChecker";

const OfficeNoteSideBar = ({
  setAddCheckerUserId,
  setAddCheckerUserName,
  setAddCheckerUserStatus,
  official,
}) => {
  return (
    <div className="h-full p-2 bg-[url('../src/assets/mega.png')] bg-gray-300 text-white">
      <div className="flex flex-col gap-2 bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
        <div>
          <div>
            <AddChecker
              setAddCheckerUserId={setAddCheckerUserId}
              setAddCheckerUserName={setAddCheckerUserName}
              setAddCheckerUserStatus={setAddCheckerUserStatus}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
        <h2 className="text-lg font-bold">Head of Branch/Division/Zonal:</h2>
        <p className="text-md">
          Name: {official.divhead} ({official.divheadid})
        </p>
        <h3 className="text-sm">Status: {official.divheadstatus}</h3>
      </div>
      {/* <div className="bg-gradient-to-b from-[#2e429c] to-[#09750e] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2"> */}
      <div className="bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
        <h2 className="text-lg font-bold">Deputy Managing Director:</h2>
        <p className="text-md">
          Name: {official.dmd} ({official.dmdid})
        </p>
        <h3 className="text-sm">Status: {official.dmdstatus}</h3>
      </div>
      <div className="bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
        <h2 className="text-lg font-bold">Additional Managing Director:</h2>
        <p className="text-md">
          Name: {official.amd} ({official.amdid})
        </p>
        <h3 className="text-sm">Status: {official.amdstatus}</h3>
      </div>
      <div className="bg-[#094276] p-3 text-white border-slate-300 font-[500] rounded-lg shadow-lg mb-2">
        <h2 className="text-lg font-bold">Managing Director:</h2>
        <p className="text-md">
          Name: {official.md} ({official.mdid})
        </p>
        <h3 className="text-sm">Status: {official.mdstatus}</h3>
      </div>
    </div>
  );
};

export default OfficeNoteSideBar;
