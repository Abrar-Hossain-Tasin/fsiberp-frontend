import Textarea from "../Textarea";

const RollBack = ({
  rollbackprocedure,
  setSelectedRollbackOption,
  rollbackproceduredes,
  setrollBackDescription,
}) => {
  const handleRollBackOption = (e) => {
    setSelectedRollbackOption(e.target.value);
  };

  const handleRollBackDescription = (e) => {
    setrollBackDescription(e.target.value);
  };
  return (
    <>
      <div className="my-4">
        <table className="w-full">
          <tr>
            <th className="border border-black">
              Rollback Procedure/ Process in place?
            </th>
            <th className="border border-black">
              <label htmlFor="roll_desc">Description</label>
            </th>
          </tr>

          <tr className="">
            <td className=" border border-black">
              <div className="flex justify-center">
                <input
                  type="radio"
                  id="roll_yes"
                  name="rollback"
                  value="yes"
                  className=""
                  onChange={handleRollBackOption}
                />
                <label htmlFor="roll_yes" className="ml-1">
                  Yes
                </label>{" "}
                <input
                  type="radio"
                  id="roll_no"
                  name="rollback"
                  value="no"
                  className="ml-2"
                  onChange={handleRollBackOption}
                />
                <label htmlFor="roll_no" className="ml-1">
                  No
                </label>{" "}
                <input
                  type="radio"
                  id="roll_not"
                  name="rollback"
                  value="not_applicable"
                  className="ml-2"
                  onChange={handleRollBackOption}
                />
                <label htmlFor="roll_not" className="ml-1">
                  Not Applicable
                </label>
              </div>
            </td>
            <td className="border border-black">
              <div className="flex justify-center">
                <Textarea
                  rows="1"
                  cols="40"
                  type="text"
                  id="roll_desc"
                  placeholder="Description..."
                  my="my-2"
                  onTextAreaValue={handleRollBackDescription}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default RollBack;
