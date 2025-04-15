import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const AccessToDatabaseTable = ({ accesstodatabase, setAccesstodatabase }) => {
  const [rows, setRows] = useState([{ inputs: Array(5).fill("") }]);

  // Handle input change for a specific row
  const handleInputChange = (rowIndex, index, event) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[rowIndex].inputs[index] = value; // Update the specific input
    setRows(newRows);
  };

  // Handle adding a new row
  const handleAddRow = () => {
    setRows([...rows, { inputs: Array(5).fill("") }]);
  };

  // Handle removing a row
  const handleRemoveRow = (rowIndex) => {
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
  };

  // Effect to update accesstodatabase whenever rows change
  useEffect(() => {
    const updatedAccesstodatabase = rows.flatMap((row) =>
      row.inputs.map((input) => (input.trim() === "" ? null : input))
    );
    setAccesstodatabase(updatedAccesstodatabase);
  }, [rows, setAccesstodatabase]); // Dependency array includes rows and setAccesstodatabase

  return (
    <div>
      <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
        Access to Database System
      </h4>
      <table className="w-full border border-black text-sm">
        <thead>
          <tr>
            <th className="border border-black p-1">Database Name</th>
            <th className="border border-black p-1">
              DB User Name of Requestor
            </th>
            <th className="border border-black p-1">DB User/Scheme Name</th>
            <th className="border border-black p-1">Table/Object Name</th>
            <th className="border border-black p-1">Privileges</th>
            <th className="border border-black p-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.inputs.map((input, index) => (
                <td key={index} className="border border-black p-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) =>
                      handleInputChange(rowIndex, index, event)
                    }
                    placeholder="Type Here..."
                    className="text-[#3b3838] border-[1px] border-black text-sm p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-[1rem] placeholder-opacity-100 text-center"
                  />
                </td>
              ))}
              <td className="border border-black text-center">
                {rowIndex > 0 && ( // Show minus icon only if not the first row
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(rowIndex)}
                    className="bg-red-500 h-6 w-6 text-white rounded"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
                {rowIndex === 0 && ( // Show plus icon only in the first row
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="bg-blue-500 h-6 w-6 text-white rounded"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessToDatabaseTable;
