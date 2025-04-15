import { useEffect, useState } from "react";
import { Base_api } from "../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const UnitHeadStatus = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [unitheadstatus, setUnitheadstatus] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/change/viewform/${userid}`
        );
        const data = await response.json();
        data;
        setUnitheadstatus(data.unitheadstatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  return (
    <>
      <div>{unitheadstatus}</div>
    </>
  );
};

export default UnitHeadStatus;
