import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FromToTimePickerCopy = ({
  fromTime,
  toTime,
  onFromTimeChange,
  onToTimeChange,
}) => {
  const handleFromTimeChange = (time) => {
    onFromTimeChange(time);
    time;
  };

  const handleToTimeChange = (time) => {
    onToTimeChange(time);
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <label
          htmlFor="fromTime"
          className="block font-medium text-gray-700 mx-2"
        >
          From:
        </label>
        {fromTime ? (
          <label htmlFor="fromTime" className="p-1 border text-gray-700">
            {format(fromTime, "HH:mm:ss")}
          </label>
        ) : (
          <label htmlFor="fromTime" className="p-1 border text-gray-500">
            No time selected
          </label>
        )}
        <DatePicker
          id="fromTime"
          selected={fromTime}
          onChange={handleFromTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="HH:mm"
          className="hidden border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center gap-1">
        <label htmlFor="toTime" className="block font-medium text-gray-700">
          To:
        </label>
        {toTime ? (
          <label htmlFor="toTime" className="p-1 border text-gray-700">
            {format(toTime, "HH:mm:ss")}
          </label>
        ) : (
          <label htmlFor="toTime" className="p-1 border text-gray-500">
            No time selected
          </label>
        )}
        <DatePicker
          id="toTime"
          selected={toTime}
          onChange={handleToTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="HH:mm"
          className="hidden border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default FromToTimePickerCopy;
