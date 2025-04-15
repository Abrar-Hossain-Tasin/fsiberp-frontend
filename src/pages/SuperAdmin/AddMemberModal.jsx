import React from "react";

const functionalRoleOptions = [
  { name: "cito", id: "1" },
  { name: "isrm", id: "2" },
  { name: "dr", id: "3" },
  { name: "sa", id: "4" },
  { name: "s&h", id: "5" },
  { name: "network", id: "6" },
];

const AddMemberModal = ({
  isOpen,
  handleClose,
  handleAdd,
  formData,
  handleChange,
}) => {
  if (!isOpen) return null;

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
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50  ">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Member</h2>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label className="block mb-2">User ID</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Functional Role</label>
            <select
              name="functionalrole"
              value={formData.functionalrole}
              onChange={handleRoleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select a role</option>
              {functionalRoleOptions.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Functional Role ID</label>
            <input
              type="text"
              name="functionalroleid"
              value={formData.functionalroleid}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              readOnly // Make this field read-only
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded p-2 mb-4 w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-2 bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
