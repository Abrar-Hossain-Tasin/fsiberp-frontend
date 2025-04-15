import React from "react";
import LabelInput from "../../LabelInput/LabelInput";
import LabelTextarea from "../../LabelTextarea/LabelTextarea";

import { useEffect } from "react";

const numberToWords = (num) => {
  const words = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (num === 0) return "zero";
  if (num < 20) return words[num];
  if (num < 100)
    return (
      words[20 + Math.floor((num - 20) / 10)] +
      (num % 10 ? " " + words[num % 10] : "")
    );
  if (num < 1000)
    return (
      words[Math.floor(num / 100)] +
      " hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );

  return "";
};

const Refreshment = ({
  setPurpose,
  handleAmountChange,
  setDateTo,
  amountInWords,
  setReceiver,
  setAmountInWords, // Add this prop
  purpose,
  amount,
  dateTo,
  receiver,
}) => {
  useEffect(() => {
    "setAmountInWords:", setAmountInWords; // Check if it's a function
    if (typeof setAmountInWords === "function") {
      setAmountInWords(numberToWords(Number(amount)));
    }
  }, [amount, setAmountInWords]);
  return (
    <>
      <div className="mt-3">
        <div className="flex flex-col mb-4">
          <LabelTextarea
            htmlFor="details"
            labeltext="Purpose"
            name="Purpose"
            id="Purpose"
            rows="4"
            value={purpose}
            placeholder="Enter Purpose here..."
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <div className="flex mb-4">
          <div className="flex flex-col w-1/2 mr-2">
            <LabelInput
              htmlFor="amount"
              labeltext="Amount"
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="flex flex-col w-1/2 mr-2">
            <LabelInput
              htmlFor="Date"
              labeltext="Date"
              type="date"
              id="Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
            />
          </div>

          <div className="flex flex-col w-1/2 mr-2">
            <LabelInput
              htmlFor="receiver"
              labeltext=" Receiver Name"
              type="text"
              id="receiver"
              onChange={(e) => setReceiver(e.target.value)}
              value={receiver}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Refreshment;
