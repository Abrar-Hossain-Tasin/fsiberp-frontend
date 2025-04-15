const AccountTypeEdit = ({
  actype,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  handleactypeChange,
  type,
}) => {
  return (
    <div className="my-4">
      <table className="min-w-full border font-[500]">
        <tbody>
          <tr>
            <th rowSpan="2" className="py-1 px-1 text-sm border border-black">
              Account Type
            </th>
            <td className="py-1 px-1 text-sm border border-black">
              <input
                type="radio"
                id="permanent"
                name="account_type"
                value="permanent"
                className="ml-2"
                checked={actype === "permanent"}
                onChange={handleactypeChange}
              />
              <label htmlFor="permanent" className="ml-1 p-1">
                Permanent
              </label>
            </td>
            <th rowSpan="2" className="py-1 px-1 text-sm border border-black">
              If temporary Selected
            </th>
            <td className="py-1 px-1 text-sm border border-black">Date</td>
            <td className="py-1 px-1 text-sm border border-black">
              <div className="flex justify-between">
                <label
                  htmlFor="fromDate"
                  className="block font-medium text-gray-700"
                >
                  From :{" "}
                  <input
                    id="fromDate"
                    className="pl-2 text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100 w-40"
                    type="date"
                    value={actype === "temporary" ? fromDate : ""}
                    onChange={(e) => setFromDate(e.target.value)}
                    disabled={actype !== "temporary" || type === "view"}
                    required
                  />
                </label>

                <label
                  htmlFor="toDate"
                  className="block font-medium text-gray-700"
                >
                  To :{" "}
                  <input
                    id="toDate"
                    className="pl-2 text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100 w-40"
                    type="date"
                    value={actype === "temporary" ? toDate : ""}
                    onChange={(e) => setToDate(e.target.value)}
                    disabled={actype !== "temporary" || type === "view"}
                    required
                  />
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-1 px-1 text-sm border border-black">
              <input
                type="radio"
                id="temporary"
                name="account_type"
                value="temporary"
                className="ml-2"
                checked={actype === "temporary"}
                onChange={handleactypeChange}
              />
              <label htmlFor="temporary" className="ml-1 p-1">
                Temporary
              </label>
            </td>
            <td className="py-1 px-1 text-sm border border-black">Time</td>
            <td className="py-1 px-1 text-sm border border-black">
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="fromTime"
                    className="font-medium text-gray-700"
                  >
                    From :{" "}
                  </label>
                  <input
                    id="fromTime"
                    type="time"
                    step={2}
                    value={actype === "temporary" ? fromTime : ""}
                    onChange={(e) => setFromTime(e.target.value)}
                    disabled={actype !== "temporary" || type === "view"}
                    className="pl-2 text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100 w-40"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="toTime" className="font-medium text-gray-700">
                    To :{" "}
                  </label>
                  <input
                    id="toTime"
                    type="time"
                    step={2}
                    value={actype === "temporary" ? toTime : ""}
                    onChange={(e) => setToTime(e.target.value)}
                    disabled={actype !== "temporary" || type === "view"}
                    className="pl-2 text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100 w-40"
                    required
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountTypeEdit;
