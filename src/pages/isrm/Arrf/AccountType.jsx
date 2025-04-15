const AccountType = ({
  actype,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  fromTime,
  setFromTime,
  toTime,
  handleactypeChange,
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
                checked={actype}
                onChange={handleactypeChange}
              />
              <label htmlFor="account_type" className="ml-1  p-1">
                Permanent
              </label>
            </td>
            <th rowSpan="2" className="py-1 px-1 text-sm border border-black">
              If Temporary Selected
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
                    className="border"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    disabled={actype !== "temporary"}
                  />
                </label>

                <label
                  htmlFor="toDate"
                  className="block font-medium text-gray-700"
                >
                  To :{" "}
                  <input
                    id="toDate"
                    className="border"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    disabled={actype !== "temporary"}
                  />
                </label>
              </div>
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
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="fromTime"
                    className="font-medium text-gray-700"
                  >
                    From :
                  </label>
                  <input
                    id="fromTime"
                    type="time"
                    value={fromTime}
                    disabled={actype !== "temporary"}
                    className="border"
                  />
                </div>
                <div>
                  <label htmlFor="toTime" className="font-medium text-gray-700">
                    To :
                  </label>
                  <input
                    id="toTime"
                    type="time"
                    value={toTime}
                    disabled={actype !== "temporary"}
                    className="border"
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

export default AccountType;
