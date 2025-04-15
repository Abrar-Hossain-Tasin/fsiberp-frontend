import Textarea from "../Textarea";

const KeyReason = ({
  reasonofchng,
  setReasonofChng,

  possiblebenefit,
  setPossibleBenefit,

  possiblerisk,
  setPossibleRisk,

  effectedsys,
  setEffectedChange,
}) => {
  const handleKeyReasonValue = (e) => {
    setReasonofChng(e.target.value);
  };

  const handlePossibleBenefit = (e) => {
    setPossibleBenefit(e.target.value);
  };

  const handlePossibleRisk = (e) => {
    setPossibleRisk(e.target.value);
  };

  const handleEffected = (e) => {
    setEffectedChange(e.target.value);
  };
  return (
    <>
      <div className="mt-5">
        <table className="w-full">
          <tr>
            <th className="border border-black text-sm">
              <label htmlFor="key_reason">Key Reason of Change</label>
            </th>
            <th className="border border-black text-sm">
              <label htmlFor="p_b">Possible Benefit</label>
            </th>
            <th className="border border-black text-sm">
              <label htmlFor="p_r"> Possible Risk (if any)</label>
            </th>
            <th className="border border-black text-sm">
              <label htmlFor="e_s">
                Effected Systems/ Devices Due to Change
              </label>
            </th>
          </tr>

          <tr>
            <td className="border border-black pb-3 px-1">
              <div className="flex justify-center mt-2 mx-1">
                <Textarea
                  rows="1"
                  width="w-40"
                  placeholder="Key Reason..."
                  id="key_reason"
                  onTextAreaValue={handleKeyReasonValue}
                />
              </div>
            </td>

            <td className="border border-black pb-3 px-1">
              <div className="flex justify-center mt-2 mx-1">
                <Textarea
                  rows="1"
                  width="w-40"
                  placeholder="Possible Benefit..."
                  id="p_b"
                  onTextAreaValue={handlePossibleBenefit}
                />
              </div>
            </td>

            <td className="border border-black pb-3 px-1">
              <div className="flex justify-center mt-2 mx-1">
                <Textarea
                  rows="1"
                  width="w-40"
                  placeholder="Possible Risk..."
                  id="p_r"
                  onTextAreaValue={handlePossibleRisk}
                />
              </div>
            </td>

            <td className="border border-black pb-3 px-1">
              <div className="flex justify-center mt-2 mx-1">
                <Textarea
                  rows="1"
                  width="w-40"
                  placeholder="Effected Systems..."
                  id="e_s"
                  onTextAreaValue={handleEffected}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default KeyReason;
