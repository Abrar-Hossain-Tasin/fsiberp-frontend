// UserSearch.js
import React from "react";

const UserSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by User ID or Role"
        className=" rounded p-2 text-[#514f4f] border-2 border-[#007935] placeholder-[#514f4f]"
      />
    </>
  );
};

export default UserSearch;
