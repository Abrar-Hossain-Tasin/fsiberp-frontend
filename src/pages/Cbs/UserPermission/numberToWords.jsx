// NumberToWords.js

const numberToWords = (num) => {
  const words = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num === 0) return "Zero";

  let result = "";

  if (num >= 10000000) {
    result += numberToWords(Math.floor(num / 10000000)) + " Crore ";
    num %= 10000000;
  }
  if (num >= 100000) {
    result += numberToWords(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }
  if (num >= 1000) {
    result += numberToWords(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (num >= 100) {
    result += numberToWords(Math.floor(num / 100)) + " Hundred ";
    num %= 100;
  }
  if (num > 20) {
    result += words[Math.floor(num / 10) + 18] + " ";
    num %= 10;
  }
  if (num > 0) {
    result += words[num] + " ";
  }

  return result.trim();
};

export default numberToWords;
