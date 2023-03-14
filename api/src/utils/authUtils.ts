import crypto from "crypto";

export let generateSessionId = () => {
  return crypto.randomBytes(16).toString();
}
