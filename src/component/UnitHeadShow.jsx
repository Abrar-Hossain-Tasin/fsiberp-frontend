const UnitHeadShow = ({ unitheadusername, unitheaduserid, unitheadstatus }) => {
  const combinedValue = `${unitheadusername} - ${unitheaduserid}`;

  return (
    <>
      <div className="mt-4  mb-4">
        <table className="w-full">
          <tr>
            <th className="border border-black">
              <label htmlFor="requesting_unit">
                Approved by (Head of Branch/Unit/Division/Department)
              </label>
            </th>
            <th className="border border-black">
              <label htmlFor="downtime_duration_desc">Status</label>
            </th>
          </tr>

          <tr className="">
            <td className="border border-black">
              <div className="flex justify-center ">
                <div className="relative ">
                  <input
                    autoComplete="off"
                    type="text"
                    id="search-input"
                    name="search"
                    className="text-[#514f4f] border-2 border-[#d2d2e4] w-80 p-1  my-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                    value={combinedValue}
                  />
                </div>
              </div>
            </td>
            <td className="border border-black text-center">
              <strong className="">{unitheadstatus}</strong>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default UnitHeadShow;
