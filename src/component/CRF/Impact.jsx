import React from "react";
import Textarea from "../Textarea";

const Impact = ({
  impactlevel,
  setSelectedImpact,
  impactleveldes,
  setImpactDescription,
}) => {
  const handleImpactChange = (e) => {
    setSelectedImpact(e.target.value);
  };

  const handleImpactDescription = (e) => {
    setImpactDescription(e.target.value);
  };
  return (
    <>
      <div className="">
        <table className="w-full">
          <tr>
            <th className="border border-black">
              Impact Level of Change (Specify Remarks, if any):
            </th>
            <th className="border border-black">
              <label htmlFor="of_impact">Description of Impact (If Any)</label>
            </th>
          </tr>

          <tr className="">
            <td className=" border border-black">
              <div className="flex justify-center">
                <input
                  type="radio"
                  id="Low"
                  name="Impact"
                  value="Low"
                  className=""
                  onChange={handleImpactChange}
                />
                <label htmlFor="Low" className="ml-1">
                  Low
                </label>{" "}
                <input
                  type="radio"
                  id="Medium"
                  name="Impact"
                  value="Medium"
                  className="ml-2"
                  onChange={handleImpactChange}
                />
                <label htmlFor="Medium" className="ml-1">
                  Medium
                </label>{" "}
                <input
                  type="radio"
                  id="High"
                  name="Impact"
                  value="High"
                  className="ml-2"
                  onChange={handleImpactChange}
                />
                <label htmlFor="High" className="ml-1">
                  High
                </label>
              </div>
            </td>
            <td className="border border-black">
              <div className="flex justify-center">
                <Textarea
                  rows="1"
                  cols="40"
                  type="text"
                  id="of_impact"
                  my="my-2"
                  placeholder="Testing Description..."
                  onTextAreaValue={handleImpactDescription}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Impact;
