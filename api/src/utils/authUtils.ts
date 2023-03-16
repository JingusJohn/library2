import crypto from "crypto";

export let generateSessionId = (): string => {
  return crypto.randomBytes(16).toString();
};

export let generateSessionExpiry = (rememberMe: boolean): Date => {
  let currentDate = new Date();
  if (rememberMe) {
    currentDate.setMonth(currentDate.getMonth() + 3);
  } else {
    currentDate.setMinutes(currentDate.getMinutes() + 30)
  }
  return currentDate;
};
