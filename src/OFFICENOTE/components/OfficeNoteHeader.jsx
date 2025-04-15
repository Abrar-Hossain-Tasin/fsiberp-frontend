import React from "react";
import headerImage from "../../assets/pdflogo.png";

const OfficeNoteHeader = () => {
  return (
    <div className="w-full flex justify-center py-5 border border-b-gray-400">
      <img
        src={headerImage}
        className="h-[60px] w-[550px] bg-cover"
        alt="Logo"
      />
    </div>
  );
};

export default OfficeNoteHeader;
