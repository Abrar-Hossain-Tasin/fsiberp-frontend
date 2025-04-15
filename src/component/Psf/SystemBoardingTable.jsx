import Textarea from "../Textarea";

const SystemBoardingTable = () => {
  return (
    <>
      <div>
        <table className="w-full">
          <tr>
            <th className="border border-black py-2">Sl No</th>
            <th className="border border-black py-2">IP Address</th>
            <th className="border border-black py-2">Host Name</th>
            <th className="border border-black py-2">OS</th>
            <th className="border border-black py-2">
              Service / Application Name
            </th>
          </tr>

          <tr className="text-center">
            <td className="border border-black py-2">1</td>
            <td className="border border-black py-2">
              <Textarea placeholder="IP Address" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Host Name" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="OS" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Service..." rows="1" width="w-32" />
            </td>
          </tr>

          <tr className="text-center">
            <td className="border border-black py-2">2</td>
            <td className="border border-black py-2">
              <Textarea placeholder="IP Address" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Host Name" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="OS" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Service..." rows="1" width="w-32" />
            </td>
          </tr>

          <tr className="text-center">
            <td className="border border-black py-2">3</td>
            <td className="border border-black py-2">
              <Textarea placeholder="IP Address" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Host Name" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="OS" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Service..." rows="1" width="w-32" />
            </td>
          </tr>

          <tr className="text-center">
            <td className="border border-black py-2">4</td>
            <td className="border border-black py-2">
              <Textarea placeholder="IP Address" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Host Name" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="OS" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Service..." rows="1" width="w-32" />
            </td>
          </tr>

          <tr className="text-center">
            <td className="border border-black py-2">5</td>
            <td className="border border-black py-2">
              <Textarea placeholder="IP Address" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Host Name" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="OS" rows="1" width="w-32" />
            </td>

            <td className="border border-black py-2">
              <Textarea placeholder="Service..." rows="1" width="w-32" />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default SystemBoardingTable;
