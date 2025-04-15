import React, { useState } from "react";

const PriorityForm = ({ onSubmit }) => {
  const [priority, setPriority] = useState("");

  const handleChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("priority", priority);
    onSubmit(formData); // Call the parent's submit handler
  };

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border py-2 border-black">Priority</th>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="High"
                  name="Priority"
                  value="High"
                  onChange={handleChange}
                />
                <label htmlFor="High" className="pl-1">
                  High
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Medium"
                  name="Priority"
                  value="Medium"
                  onChange={handleChange}
                />
                <label htmlFor="Medium" className="pl-1">
                  Medium
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Low"
                  name="Priority"
                  value="Low"
                  onChange={handleChange}
                />
                <label htmlFor="Low" className="pl-1">
                  Low
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PriorityForm;
