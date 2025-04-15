import React from "react";

import DynamicNavigation from "../DynamicNavigation/DynamicNavigation";

const SidebarItems = () => {
  return (
    <>
      <div className="h-full">
        <div className="cursor-pointer px-2 pt-3 text-[#272222] font-bold">
          <DynamicNavigation
            path="/bms-user-dashboard"
            title="User Dashboard"
            className="mb-2"
            activePathPrefix="/bms-user-dashboard"
          />

          <DynamicNavigation
            path="/debitvoucher"
            title="Debit Voucher"
            className="mb-2"
            activePathPrefix="/debitvoucher"
          />
        </div>
      </div>
    </>
  );
};

export default SidebarItems;
