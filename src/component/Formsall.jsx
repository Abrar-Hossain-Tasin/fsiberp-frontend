import { jwtDecode } from "jwt-decode";
import DynamicNavigationComponent from "./DynamicNavigationComponent";

const Formsall = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, user_roleid, department, unit } = decoded;

  const unitsWithAccess = [2, 7, 8, 10, 11, 13];
  return (
    <>
      <div className="h-full">
        <div className="cursor-pointer px-2 pt-3 text-[#272222] font-bold">
          {/* <DynamicNavigationComponent
            path="/isrm"
            title="Information Security & Risk Management Unit"
            className="mb-2"
            activePathPrefix="/isrm"
          /> */}

          <DynamicNavigationComponent
            path="/namu"
            title="Network Administration & Management Unit"
            className="mb-2"
            activePathPrefix="/namu"
          />

          {/* <DynamicNavigationComponent
            path="/shu"
            title="System & Hardware Unit"
            className="mb-2"
            activePathPrefix="/shu"
          /> */}

          <DynamicNavigationComponent
            path="/sau"
            title="System Administration Unit"
            className="mb-2"
            activePathPrefix="/sau"
          />

          <DynamicNavigationComponent
            path="/cbs"
            title="Core Banking Solution"
            className="mb-2"
            activePathPrefix="/cbs"
          />
          {user_roleid === 2 ||
          (user_roleid === 3 && unitsWithAccess.includes(unit)) ? (
            <DynamicNavigationComponent
              path="/reports"
              title="Reports"
              className="mb-2"
              activePathPrefix="/reports"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Formsall;

// bg-[#0b8457]
