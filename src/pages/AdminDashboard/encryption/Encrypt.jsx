import { encryptId } from "./path/to/your/encryption";

const userId = 123;
const formId = 456;
const id = 789;

const encryptedUserId = encryptId(userId);
const encryptedFormId = encryptId(formId);
const encryptedId = encryptId(id);

// Use encrypted IDs in URL
const url = `/type/${encryptedUserId}/${encryptedFormId}/${encryptedId}`;
