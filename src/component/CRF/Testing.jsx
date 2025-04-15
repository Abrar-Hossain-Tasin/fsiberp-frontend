import Textarea from "../Textarea";

const Testing = ({
  testing,
  setSelectedTesting,
  testdescription,
  setTestingDescription,
}) => {
  const handleTestChange = (event) => {
    setSelectedTesting(event.target.value);
  };

  const handleTestingDescription = (e) => {
    setTestingDescription(e.target.value);
  };
  return (
    <>
      <div className="my-5">
        <table className="w-full">
          <tr>
            <th className="border border-black">Testing</th>
            <th className="border border-black">
              <label htmlFor="t_d">Testing Description (if any)</label>
            </th>
          </tr>

          <tr className="">
            <td className=" border border-black">
              <div className="flex justify-center">
                <input
                  type="radio"
                  id="yes"
                  name="Testing"
                  value="Yes"
                  className=""
                  onChange={handleTestChange}
                />
                <label htmlFor="yes" className="ml-1">
                  Yes
                </label>{" "}
                <input
                  type="radio"
                  id="no"
                  name="Testing"
                  value="No"
                  className="ml-2"
                  onChange={handleTestChange}
                />
                <label htmlFor="no" className="ml-1">
                  No
                </label>{" "}
                <input
                  type="radio"
                  id="not"
                  name="Testing"
                  value="Not"
                  className="ml-2"
                  onChange={handleTestChange}
                />
                <label htmlFor="not" className="ml-1">
                  Not
                </label>
              </div>
            </td>
            <td className="border border-black">
              <div className="flex justify-center">
                <Textarea
                  rows="1"
                  cols="40"
                  id="t_d"
                  my="my-2"
                  placeholder="Testing Description..."
                  onTextAreaValue={handleTestingDescription}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Testing;
