const Attachment = ({
  attachtestdoc,
  setAttachtestdoc,
  impactanalysisdoc,
  setImpactDocumnet,
  downtimedoc,
  setDowntimeDocument,
  workcomdoc,
  setWorkDocument,
}) => {
  const handleFile = (e) => {
    e;
    setAttachtestdoc(e.target.files[0]);
    setImpactDocumnet(e.target.files[0]);
    setWorkDocument(e.target.files[0]);
    setDowntimeDocument(e.target.files[0]);
  };
  return (
    <>
      <div className="mt-5">
        <table className="w-full">
          <tr>
            <th className="border  py-2 border-black" colSpan="2">
              Attachment (if any)
            </th>
          </tr>

          <tr>
            <td className="border  border-black p-3">
              <strong>Attach test document</strong>
            </td>
            <td className="border  border-black p-3">
              <input
                type="file"
                name="attachtestdoc"
                id="attachtestdoc"
                onChange={handleFile}
              />
            </td>
          </tr>

          <tr>
            <td className="border  border-black p-3">
              <strong>Impact Analysis Document</strong>
            </td>
            <td className="border  border-black p-3">
              <input
                type="file"
                name="impactanalysisdoc"
                id="impactanalysisdoc"
                onChange={handleFile}
              />
            </td>
          </tr>

          <tr>
            <td className="border  border-black p-3">
              <strong>Downtime Documentation</strong>
            </td>
            <td className="border  border-black p-3">
              <input
                type="file"
                name="downtimedoc"
                id="downtimedoc"
                onChange={handleFile}
              />
            </td>
          </tr>

          <tr>
            <td className="border  border-black p-3">
              <strong>Work completion document</strong>
            </td>
            <td className="border  border-black p-3">
              <input
                type="file"
                name="workcomdoc"
                id="workcomdoc"
                onChange={handleFile}
              />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Attachment;
