// import { useEffect, useState } from "react";

// const ActionPurposeComponent = ({
//   action,
//   setAction,
//   type,
//   other,
//   setOther,
// }) => {
//   const [selectedActions, setSelectedActions] = useState([]);

//   // useEffect to handle side effects when action prop changes
//   useEffect(() => {
//     if (action) {
//       const actionsArray = action.split(", ").map((item) => item.trim());
//       setSelectedActions(actionsArray);
//     }
//   }, [action]);

//   // useEffect to update the action state when selectedActions changes
//   useEffect(() => {
//     setAction(selectedActions.length > 0 ? selectedActions.join(", ") : "");
//   }, [selectedActions, setAction]);

//   const handleCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     setSelectedActions((prev) =>
//       checked ? [...prev, value] : prev.filter((action) => action !== value)
//     );
//   };

//   const handleOtherActionChange = (e) => {
//     setOther(e.target.value);
//   };

//   return (
//     <table className="w-full my-4">
//       <tbody>
//         <tr>
//           <th className="border border-black py-2">Action</th>
//           <th className="border border-black py-2">
//             <div className="flex gap-3 justify-center items-center">
//               <input
//                 type="checkbox"
//                 id="Grant"
//                 value="Grant"
//                 checked={selectedActions.includes("Grant")}
//                 onChange={type !== "view" ? handleCheckboxChange : undefined}
//                 readOnly={type === "view"}
//               />
//               <label htmlFor="Grant">Grant</label>

//               <input
//                 type="checkbox"
//                 id="Delete"
//                 value="Delete"
//                 checked={selectedActions.includes("Delete")}
//                 onChange={type !== "view" ? handleCheckboxChange : undefined}
//                 readOnly={type === "view"}
//               />
//               <label htmlFor="Delete">Delete</label>

//               <input
//                 type="checkbox"
//                 id="Modify"
//                 value="Modify"
//                 checked={selectedActions.includes("Modify")}
//                 onChange={type !== "view" ? handleCheckboxChange : undefined}
//                 readOnly={type === "view"}
//               />
//               <label htmlFor="Modify">Modify</label>

//               <input
//                 type="checkbox"
//                 id="Other"
//                 value="Other"
//                 checked={selectedActions.includes("Other")}
//                 onChange={type !== "view" ? handleCheckboxChange : undefined}
//                 readOnly={type === "view"}
//               />
//               <label htmlFor="Other" className="ml-1">
//                 Other
//               </label>

//               <input
//                 type="text"
//                 placeholder="If Other Selected!"
//                 value={other}
//                 onChange={handleOtherActionChange}
//                 className="text-[#3b3838] border-2 border-[#d2d2e4]  p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-[1rem] placeholder-opacity-100 text-center"
//                 disabled={
//                   type === "view" ||
//                   (!selectedActions.includes("Other") &&
//                     selectedActions.length > 0)
//                 }
//               />
//             </div>
//           </th>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default ActionPurposeComponent;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { useEffect, useState } from "react";

const ActionPurposeComponent = ({
  action,
  setAction,
  type,
  other,
  setOther,
}) => {
  const [selectedActions, setSelectedActions] = useState([]);

  useEffect(() => {
    if (action && Array.isArray(action)) {
      setSelectedActions(action);
    }
  }, [action]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedActions((prev) => {
      const updatedActions = checked
        ? [...prev, value]
        : prev.filter((action) => action !== value);

      // Clear the 'other' input if "Other" is unchecked
      if (value === "Other" && !checked) {
        setOther(""); // Clear the input field
      }

      return updatedActions;
    });
  };

  const handleOtherActionChange = (e) => {
    setOther(e.target.value);
  };

  // Update action whenever selectedActions or other changes
  useEffect(() => {
    const updatedActions = [...selectedActions];

    // Include the 'other' value if "Other" is checked and not empty
    if (selectedActions.includes("Other") && other) {
      updatedActions.push(other);
    }

    // Set action as an array
    setAction(updatedActions.filter(Boolean)); // Remove any empty values
  }, []);

  return (
    <table className="w-full my-4">
      <tbody>
        <tr>
          <th className="border border-black py-2">Action</th>
          <th className="border border-black py-2">
            <div className="flex gap-3 justify-center items-center">
              <input
                type="checkbox"
                id="Grant"
                value="Grant"
                checked={selectedActions.includes("Grant")}
                onChange={type !== "view" ? handleCheckboxChange : undefined}
                readOnly={type === "view"}
              />
              <label htmlFor="Grant">Grant</label>

              <input
                type="checkbox"
                id="Delete"
                value="Delete"
                checked={selectedActions.includes("Delete")}
                onChange={type !== "view" ? handleCheckboxChange : undefined}
                readOnly={type === "view"}
              />
              <label htmlFor="Delete">Delete</label>

              <input
                type="checkbox"
                id="Modify"
                value="Modify"
                checked={selectedActions.includes("Modify")}
                onChange={type !== "view" ? handleCheckboxChange : undefined}
                readOnly={type === "view"}
              />
              <label htmlFor="Modify">Modify</label>

              <input
                type="checkbox"
                id="Other"
                value="Other"
                checked={selectedActions.includes("Other")}
                onChange={type !== "view" ? handleCheckboxChange : undefined}
                readOnly={type === "view"}
              />
              <label htmlFor="Other" className="ml-1">
                Other
              </label>

              <input
                type="text"
                placeholder="If Other Selected!"
                value={other}
                onChange={handleOtherActionChange}
                className="text-[#3b3838] border-2 border-[#d2d2e4] p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-[1rem] placeholder-opacity-100 text-center"
                disabled={type === "view" || !selectedActions.includes("Other")}
              />
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default ActionPurposeComponent;
