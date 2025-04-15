import { useState } from "react";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div>
      <p>
        Date: <strong>{currentDate}</strong>
      </p>
    </div>
  );
}

export default CurrentDate;
