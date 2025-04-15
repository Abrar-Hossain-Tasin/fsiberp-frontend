import FromToDatePicker from "./FromToDatePicker";
import FromToTimePicker from "./FromToTimePicker";

const DynamicTable3 = ({
  actype,
  setActype,
  tempdatefrom,
  setTempdatefrom,

  fromDate,
  setFromDate,
  toDate,
  setToDate,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  handleactypeChange,
  handleFromDateChange,
  handleToDateChange,
  handleFromTimeChange,
  handleToTimeChange,
}) => {
  return (
    <div className="mt-4">
      <table className="min-w-full  border">
        <tbody>
          <tr>
            <th rowSpan="2" className="py-1 px-1 text-sm border border-black">
              Account Type
            </th>
            <td className="py-1 px-1 text-sm border border-black">
              <input
                type="radio"
                id="account_type"
                name="account_type"
                value="permanent"
                className="ml-2"
                checked={actype === "permanent"}
                onChange={handleactypeChange}
              />
              <label htmlFor="account_type" className="ml-1  p-1">
                Permanent
              </label>
            </td>
            <th rowSpan="2" className="py-1 px-1 text-sm border border-black">
              If Temporary Select
            </th>
            <td className="py-1 px-1 text-sm border border-black">Date</td>
            <td className="py-1 px-1 text-sm border border-black">
              <FromToDatePicker
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                disabled={actype !== "temporary"}
              />
            </td>
          </tr>
          <tr>
            <td className="py-1 px-1 text-sm border border-black">
              <input
                type="radio"
                id="account_type_two"
                name="account_type"
                value="temporary"
                className="ml-2"
                checked={actype === "temporary"}
                onChange={handleactypeChange}
              />
              <label htmlFor="account_type_two" className="ml-1  p-1 ">
                Temporary
              </label>
            </td>
            <td className="py-1 px-1 text-sm border border-black">Time</td>
            <td className="py-1 px-1 text-sm border border-black">
              <FromToTimePicker
                fromTime={fromTime}
                toTime={toTime}
                onFromTimeChange={handleFromTimeChange}
                onToTimeChange={handleToTimeChange}
                disabled={actype !== "temporary"}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable3;
