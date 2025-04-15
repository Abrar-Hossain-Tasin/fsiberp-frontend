import CryptoJS from "crypto-js";

// Secret key for encryption/decryption
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;

// Encrypt function
export function encryptId(id) {
  // Convert the ID to a string before encryption
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  // Return URL-safe encoded string
  return encodeURIComponent(encrypted);
}

// Decrypt function
export function decryptId(encryptedId) {
  // Decode URL-encoded string
  const decoded = decodeURIComponent(encryptedId);
  // Decrypt the decoded string
  const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
  // Return decrypted string
  return bytes.toString(CryptoJS.enc.Utf8);
}
