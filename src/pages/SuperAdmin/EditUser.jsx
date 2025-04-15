// EditUser.js
import React from "react";

const functionalRoleOptions = [
  { name: "cito", id: "1" },
  { name: "isrm", id: "2" },
  { name: "dr", id: "3" },
  { name: "sa", id: "4" },
  { name: "s&h", id: "5" },
  { name: "network", id: "6" },
];

const EditUser = ({ formData, handleChange, handleUpdate, handleCancel }) => {
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    const selectedOption = functionalRoleOptions.find(
      (role) => role.name === selectedRole
    );

    // Update formData with the selected Functional Role ID
    if (selectedOption) {
      handleChange({
        target: {
          name: "functionalrole",
          value: selectedRole,
        },
      });
      handleChange({
        target: {
          name: "functionalroleid",
          value: selectedOption.id,
        },
      });
    } else {
      // Reset functionalroleid if no role is selected
      handleChange({
        target: {
          name: "functionalroleid",
          value: "",
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Edit User</h2>
      <div>
        <label className="block mb-2">Functional Role</label>
        <select
          name="functionalrole"
          value={formData.functionalrole}
          onChange={handleRoleChange}
          className="border rounded p-2 mb-4 w-full"
        >
          <option value="">Select Functional Role</option>
          {functionalRoleOptions.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Functional Role ID</label>
        <input
          type="text"
          name="functionalroleid"
          value={formData.functionalroleid}
          onChange={handleChange}
          className="border rounded p-2 mb-4 w-full"
          readOnly // Make this field read-only
        />

        <label className="block mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded p-2 mb-4 w-full"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUser;
