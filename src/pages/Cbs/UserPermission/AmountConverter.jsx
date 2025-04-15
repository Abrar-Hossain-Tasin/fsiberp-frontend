// // AmountConverter.js

// import React, { useState } from "react";
// import numberToWords from "./numberToWords";
// // import numberToWords from "./NumberToWords"; // Ensure you have this utility function

// const AmountConverter = ({ amount, setAmount }) => {
//   const [amountInWords, setAmountInWords] = useState("");

//   // Update amount in words whenever the numeric amount changes
//   React.useEffect(() => {
//     setAmountInWords(numberToWords(amount));
//   }, [amount]);

//   const handleWordsChange = (e) => {
//     const value = e.target.value;
//     setAmountInWords(value);
//   };

//   return (
//     <div className="mt-2">
//       <input
//         type="text"
//         placeholder="Please Type Amount In Words..."
//         className="px-2 border border-slate-200 w-full rounded text-[8pt]"
//         value={amountInWords}
//         onChange={handleWordsChange}
//       />
//       <p className="text-xs text-red-800">Amount in Words: {amountInWords}</p>
//     </div>
//   );
// };

// export default AmountConverter;

// AmountConverter.jsx

// AmountConverter.jsx

// AmountConverter.jsx

// import React from "react";
// import numberToWords from "./numberToWords";

// const AmountConverter = ({
//   amount,
//   setAmount,
//   amountInWords,
//   setAmountInWords,
// }) => {
//   const handleWordsChange = (e) => {
//     const value = e.target.value;
//     setAmountInWords(value);
//   };
//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//     setAmountInWords(numberToWords(value));
//   };

//   const handleCheckWordsChange = (e) => {
//     const value = e.target.value;
//     setAmountInWords(value);
//   };

//   const isCorrect = () => {
//     return numberToWords(amount).toLowerCase() === amountInWords.toLowerCase();
//   };

//   return (
//     <div>
//       <div>
//         <label>Enter Amount in Digits:</label>
//         <input type="number" value={amount} onChange={handleAmountChange} />
//       </div>
//       <div className="mt-2">
//         <input
//           type="text"
//           placeholder="Please Type Amount In Words..."
//           className="px-2 border border-slate-200 w-full rounded text-[8pt]"
//           value={amountInWords}
//           onChange={handleWordsChange}
//         />
//         <p className="text-xs text-red-800">Amount in Words: {amountInWords}</p>
//       </div>
//       <div>
//         <label>Amount in Words:</label>
//         <input type="text" value={amountInWords} readOnly />
//       </div>
//       <div>
//         <label>Enter Amount in Words to Check:</label>
//         <input
//           type="text"
//           value={amountInWords}
//           onChange={handleCheckWordsChange}
//         />
//         <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p>
//       </div>
//     </div>
//   );
// };

// export default AmountConverter;

// import React from "react";
// import numberToWords from "./numberToWords";

// const AmountConverter = ({
//   amount,
//   setAmount,
//   amountInWords,
//   setAmountInWords,
// }) => {
//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//     setAmountInWords(numberToWords(value));
//   };

//   const handleCheckWordsChange = (e) => {
//     const value = e.target.value;
//     setAmountInWords(value);
//   };

//   const isCorrect = () => {
//     return numberToWords(amount).toLowerCase() === amountInWords.toLowerCase();
//   };

//   return (
//     <div>
//       <div>
//         <label>Enter Amount in Digits:</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={handleAmountChange}
//           className="border p-2 w-full"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Amount in Words:</label>
//         <input
//           type="text"
//           value={amountInWords}
//           readOnly
//           className="border p-2 w-full bg-gray-100"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Check Amount in Words:</label>
//         <input
//           type="text"
//           value={amountInWords} // This will be managed by the parent
//           onChange={handleCheckWordsChange}
//           className="border p-2 w-full"
//         />
//         <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p>
//       </div>
//     </div>
//   );
// };

// export default AmountConverter;

// import React from "react";
// import numberToWords from "./numberToWords";

// const AmountConverter = ({
//   amount,
//   setAmount,
//   amountInWords,
//   setAmountInWords,
//   checkAmountInWords,
//   setCheckAmountInWords,
// }) => {
//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//     setAmountInWords(numberToWords(value)); // Update amount in words based on the numeric input
//   };

//   const handleCheckWordsChange = (e) => {
//     const value = e.target.value;
//     setCheckAmountInWords(value); // Update only the check amount in words
//   };

//   const isCorrect = () => {
//     return (
//       numberToWords(amount).toLowerCase() === checkAmountInWords.toLowerCase()
//     );
//   };

//   return (
//     <div>
//       <div>
//         <label>Enter Amount in Digits:</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={handleAmountChange}
//           className="border p-2 w-full"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Amount in Words:</label>
//         <input
//           type="text"
//           value={amountInWords}
//           readOnly
//           className="border p-2 w-full bg-gray-100"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Check Amount in Words:</label>
//         <input
//           type="text"
//           value={checkAmountInWords} // This will be managed independently
//           onChange={handleCheckWordsChange}
//           className="border p-2 w-full"
//         />
//         <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p>
//       </div>
//     </div>
//   );
// };

// export default AmountConverter;

// import React from "react";
// import numberToWords from "./numberToWords"; // Make sure this utility is correctly imported

// const AmountConverter = ({
//   amount,
//   setAmount,
//   amountInWords,
//   setAmountInWords,
//   checkAmountInWords,
//   setCheckAmountInWords,
// }) => {
//   // Update amount in words when the amount changes
//   React.useEffect(() => {
//     setAmountInWords(numberToWords(amount));
//   }, [amount, setAmountInWords]);

//   const handleCheckWordsChange = (e) => {
//     setCheckAmountInWords(e.target.value); // Update only the check amount in words
//   };

//   const isCorrect = () => {
//     return (
//       numberToWords(amount).toLowerCase() === checkAmountInWords.toLowerCase()
//     );
//   };

//   return (
//     <div>
//       <div className="mt-2">
//         <label>Amount in Words:</label>
//         <input
//           type="text"
//           value={amountInWords}
//           readOnly
//           className="border p-2 w-full bg-gray-100"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Check Amount in Words:</label>
//         <input
//           type="text"
//           value={checkAmountInWords} // This will be managed independently
//           onChange={handleCheckWordsChange}
//           className="border p-2 w-full"
//         />
//         <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p>
//       </div>
//     </div>
//   );
// };

// export default AmountConverter;

// import React from "react";
// import numberToWords from "./numberToWords"; // Ensure this utility is correctly imported

// const AmountConverter = ({
//   amount,
//   setAmount,
//   amountInWords,
//   setAmountInWords,
//   checkAmountInWords,
//   setCheckAmountInWords,
// }) => {
//   // Update amount in words when the amount changes
//   React.useEffect(() => {
//     setAmountInWords(numberToWords(amount));
//   }, [amount, setAmountInWords]);

//   const handleCheckWordsChange = (e) => {
//     setCheckAmountInWords(e.target.value); // Update only the check amount in words
//   };

//   const isCorrect = () => {
//     return (
//       numberToWords(amount).toLowerCase() === checkAmountInWords.toLowerCase()
//     );
//   };

//   return (
//     <div>
//       <div className="mt-2">
//         <label>Amount in Words:</label>
//         <input
//           type="text"
//           value={amountInWords}
//           readOnly
//           className="border p-2 w-full bg-gray-100"
//         />
//       </div>
//       <div className="mt-2">
//         <label>Check Amount in Words:</label>
//         <input
//           type="text"
//           value={checkAmountInWords} // This will be managed independently
//           onChange={handleCheckWordsChange} // Only updates on user input
//           className="border p-2 w-full"
//         />
//         <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p>
//       </div>
//     </div>
//   );
// };

// export default AmountConverter;

// AmountConverter.js
import React, { useEffect, useState } from "react";
import numberToWords from "./numberToWords"; // Ensure this utility is correctly imported

const AmountConverter = ({
  amount,
  setAmount,
  amountInWords,
  setAmountInWords,
  checkAmountInWords,
  setCheckAmountInWords,
  disabled,
}) => {
  const [checkWords, setCheckWords] = useState("");
  // Update amount in words when the amount changes
  useEffect(() => {
    setAmountInWords(numberToWords(amount));
  }, [amount, setAmountInWords]);

  // const handleCheckWordsChange = (e) => {
  //   setCheckAmountInWords(e.target.value); // Update only the check amount in words
  // };

  const handleCheckWordsChange = (e) => {
    const value = e.target.value;
    setCheckWords(value);
  };

  const isCorrect = () => {
    return (
      numberToWords(amount).toLowerCase() === checkWords.toLowerCase().trim()
    );
  };

  return (
    <div>
      <div>
        <label className="text-[8pt]">Amount in Words:</label>
        <label
          className="text-[8pt] select-none"
          onPaste={(e) => {
            e.preventDefault();
          }}
          onCopy={(e) => {
            e.preventDefault();
          }}
        >
          {" " + amountInWords + " Taka Only"}
        </label>
        {/* <input
          type="text"
          value={amountInWords}
          readOnly
          className="border p-2 w-full bg-gray-100"
        /> */}
      </div>
      <div>
        {/* <label className="text-[8pt]">Check Amount in Words:</label> */}
        {/* <input
          type="text"
          value={checkWords} // This will be managed independently
          onChange={handleCheckWordsChange} // Only updates on user input
          className="border p-2 w-full"
        /> */}
        {/* <input
          type="text"
          placeholder="Please Type Amount In Word..."
          className={`px-2 mt-1 border border-black w-full rounded text-[8pt] ${
            disabled ? "bg-slate-300" : ""
          } ${!isCorrect() ? "bg-red-200 text-black" : ""}`}
          value={!disabled ? checkWords : ""} // This will be managed independently
          onChange={handleCheckWordsChange} // Only updates on user input
          required
          disabled={disabled}
        />
        {checkWords ? <p>{isCorrect() ? "Correct!" : "Incorrect!"}</p> : ""} */}
      </div>
    </div>
  );
};

export default AmountConverter;
