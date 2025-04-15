import React, { useState } from "react";

const TimePicker = ({ onChange }) => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  const handleTimeSelect = () => {
    const timeString = `${selectedHour}:${
      selectedMinute < 10 ? "0" : ""
    }${selectedMinute} ${isAM ? "AM" : "PM"}`;
    onChange(timeString); // Pass the selected time back to the parent
  };

  return (
    <div className="clock">
      <div>
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        :
        <select
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
        >
          {[...Array(60)].map((_, i) => (
            <option key={i} value={i}>
              {i < 10 ? `0${i}` : i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={() => setIsAM(true)}>AM</button>
        <button onClick={() => setIsAM(false)}>PM</button>
      </div>
      <button onClick={handleTimeSelect}>Select Time</button>
    </div>
  );
};

export default TimePicker;
