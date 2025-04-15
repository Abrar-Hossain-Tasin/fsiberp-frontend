import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FromToDatePicker = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  disabled,
}) => {
  const handleFromDateChange = (date) => {
    onFromDateChange(date);
  };

  const handleToDateChange = (date) => {
    onToDateChange(date);
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <label htmlFor="fromDate" className="block font-medium text-gray-700">
          From:
        </label>
        {fromDate ? (
          <label htmlFor="fromDate" className="p-1 border text-gray-700">
            {format(fromDate, "dd-MM-yyyy")}
          </label>
        ) : (
          <label htmlFor="fromDate" className="p-1 border text-gray-500">
            No date selected
          </label>
        )}
        <DatePicker
          id="fromDate"
          selected={fromDate}
          onChange={handleFromDateChange}
          dateFormat="dd-MM-yyyy"
          className="hidden border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={disabled}
        />
      </div>

      <div className="flex items-center gap-1">
        <label htmlFor="toDate" className="block font-medium text-gray-700">
          To:
        </label>
        {toDate ? (
          <label htmlFor="toDate" className="p-1 border text-gray-700">
            {format(toDate, "dd-MM-yyyy")}
          </label>
        ) : (
          <label htmlFor="toDate" className="p-1 border text-gray-500">
            No date selected
          </label>
        )}
        <DatePicker
          id="toDate"
          selected={toDate}
          onChange={handleToDateChange}
          dateFormat="dd-MM-yyyy"
          className="hidden border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FromToDatePicker;
