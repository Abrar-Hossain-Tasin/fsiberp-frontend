import React from "react";
import LabelInput from "../../../component/LabelInput/LabelInput"; // Assuming this is a reusable component
import LabelTextarea from "../../../component/LabelTextarea/LabelTextarea";

const TransportForm = ({
  setDesFrom,
  setDesTo,
  setDateFrom,
  setDateTo,
  setVehicle,
  handleAmountChange,
  setPurpose,
  amountInWords,
  setReceiver,
  travelType,
  handleTravelTypeChange,
  handleFileChange,
}) => {
  return (
    <div className="mt-3">
      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 mr-2">
          <LabelInput
            htmlFor="desfrom"
            labeltext="Origin"
            type="text"
            id="desfrom"
            placeholder="Enter Origin"
            onChange={(e) => setDesFrom(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-1/2">
          <LabelInput
            htmlFor="desto"
            labeltext="Destination"
            type="text"
            id="desto"
            placeholder="Enter Destination"
            onChange={(e) => setDesTo(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 mr-2">
          <LabelInput
            htmlFor="date"
            labeltext="From Date"
            type="date"
            id="date"
            placeholder="Enter date"
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-1/2 mr-2">
          <LabelInput
            htmlFor="date"
            labeltext="To Date"
            type="date"
            id="date"
            placeholder="Enter date"
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-1/2">
          <LabelInput
            htmlFor="Vehicle"
            labeltext="Vehicle"
            type="text"
            id="Vehicle"
            placeholder="Enter Vehicle"
            onChange={(e) => setVehicle(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 mr-2">
          <LabelInput
            htmlFor="amount"
            labeltext="Amount"
            type="text"
            id="amount"
            placeholder="Enter amount"
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className="flex flex-col w-1/2 mr-2">
          <LabelTextarea
            htmlFor="purpose"
            labeltext="Purpose"
            rows="1"
            id="purpose"
            placeholder="Enter purpose"
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col w-[275px]">
          <label htmlFor="" className="font-semibold text-gray-700 mb-1">
            File (Multiple)
          </label>
          <input
            type="file"
            className="border border-black rounded-md shadow-sm p-[5px] focus:outline-none focus:ring-1 focus:ring-green-600"
            onChange={handleFileChange}
            autoComplete="off"
            multiple
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex flex-col w-1/2 mr-2">
          <LabelInput
            htmlFor="amount"
            labeltext="Amount in Words"
            type="text"
            id="amount"
            placeholder="Enter amount in words..."
            value={amountInWords}
            readOnly
          />
        </div>
        <div className="flex flex-col w-1/2">
          <LabelInput
            htmlFor="receiver"
            labeltext="Receiver Name"
            type="text"
            id="receiver"
            placeholder="Enter Receiver Name"
            onChange={(e) => setReceiver(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="my-4">
        <table className="w-full">
          <tr>
            <th className="border border-black py-2">Travel Type</th>
            <th className="border border-black py-2">
              <input
                type="checkbox"
                id="up"
                name="Up"
                value="travel_type"
                className="mr-1"
                checked={travelType.includes("Up")}
                onChange={handleTravelTypeChange}
              />
              <label htmlFor="up" className="text-gray-700">
                {" "}
                Up{" "}
              </label>
            </th>
            <th className="border border-black py-2">
              <input
                type="checkbox"
                id="down"
                name="Down"
                value="travel_type"
                className="mr-1"
                checked={travelType.includes("Down")}
                onChange={handleTravelTypeChange}
              />
              <label htmlFor="down" className="text-gray-700">
                {" "}
                Down{" "}
              </label>
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default TransportForm;
