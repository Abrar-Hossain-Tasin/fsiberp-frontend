import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const UserPermissionOrRoleEdit = () => {
  const [currentForm, setCurrentForm] = useState({});
  const [previousForm, setPreviousForm] = useState({});
  const [formData, setFormData] = useState({
    cashDebitEnabled: false,
    cashDebit: "",
  });
  const { userId, formId, id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId;

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const previous =
          data.find((item) => item.id === Math.min(...data.map((f) => f.id))) ||
          {};
        const current =
          data.find((item) => item.id === Math.max(...data.map((f) => f.id))) ||
          {};

        setPreviousForm(previous);
        setCurrentForm(current);

        // Set initial formData based on currentForm
        setFormData({
          cashDebitEnabled: !!current.transactionLimit?.[0],
          cashDebit: current.transactionLimit?.[0] || "",
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);
  const tableRowClassName = "border border-slate-400 px-4 py-2";
  const inputClassName = "border rounded p-1 bg-slate-100";

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      cashDebitEnabled: isChecked,
      cashDebit: isChecked ? prevData.cashDebit : "", // Clear input if unchecked
    }));
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      cashDebit: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const decryptedUserId = decryptId(userId);
    const decryptedFormId = decryptId(formId);
    const decryptedId = decryptId(id);

    try {
      const response = await fetch(
        `${Base_api}/api/cbs-user-permission/update/${decryptedId}`,
        {
          method: "PUT", // Assuming you're updating the data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      response;
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      // Handle success (e.g., show a message or redirect)
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <td className={tableRowClassName}>
          <input
            type="checkbox"
            id={`cashDebit`}
            checked={formData.cashDebitEnabled}
            onChange={handleCheckboxChange}
            disabled={!currentForm.transactionLimit?.[0]} // Disable if no value
          />
          <label htmlFor={`cashDebit`} className="ml-1">
            Cash Debit
          </label>
        </td>

        <td className={`${tableRowClassName} pb-1`}>
          <input
            required
            type="text"
            className={`${inputClassName} w-full`}
            placeholder={`Cash Debit`}
            value={formData.cashDebit} // Use updated state
            disabled={!formData.cashDebitEnabled} // Disable based on checkbox
            onChange={handleInputChange}
          />
          <p className="text-xs text-red-800 text-right">
            Previous Limit: {previousForm.transactionLimit?.[0] || 0}
          </p>
        </td>
      </div>
      <button type="submit">Submit</button>
      {error && <p className="text-red-600">{error.message}</p>}
    </form>
  );
};

export default UserPermissionOrRoleEdit;
