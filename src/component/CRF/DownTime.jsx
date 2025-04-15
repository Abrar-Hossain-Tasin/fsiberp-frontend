import Textarea from "../Textarea";

const DownTime = ({
  downtimereq,
  setSelectedDowntimeOption,
  downtimeDescription,
  setDowntimeDescription,
}) => {
  const handleDowntimeOption = (e) => {
    setSelectedDowntimeOption(e.target.value);
  };

  const handleDowntimeDescription = (e) => {
    setDowntimeDescription(e.target.value);
  };
  return (
    <>
      <div className="">
        <table className="w-full">
          <tr>
            <th className="border border-black">Downtime Require</th>
            <th className="border border-black">
              <label htmlFor="downtime_duration_desc">If Select Duration</label>
            </th>
          </tr>

          <tr className="">
            <td className=" border border-black">
              <div className="flex justify-center">
                <input
                  type="radio"
                  id="downtime_yes"
                  name="downtime"
                  value="yes"
                  className=""
                  onChange={handleDowntimeOption}
                />
                <label htmlFor="downtime_yes" className="ml-1">
                  Yes
                </label>{" "}
                <input
                  type="radio"
                  id="downtime_no"
                  name="downtime"
                  value="no"
                  className="ml-2"
                  onChange={handleDowntimeOption}
                />
                <label htmlFor="downtime_no" className="ml-1">
                  No
                </label>{" "}
                <input
                  type="radio"
                  id="downtime_duration"
                  name="downtime"
                  value="not_applicable"
                  className="ml-2"
                  onChange={handleDowntimeOption}
                />
                <label htmlFor="downtime_duration" className="ml-1">
                  Duration
                </label>
              </div>
            </td>
            <td className="border border-black">
              <div className="flex justify-center">
                <Textarea
                  rows="1"
                  cols="40"
                  type="text"
                  id="downtime_duration_desc"
                  my="my-2"
                  placeholder="Description..."
                  onTextAreaValue={handleDowntimeDescription}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default DownTime;
