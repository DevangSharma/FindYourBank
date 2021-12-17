import { MILLISECONDS_PER_DAY } from "../Constants";

export function setLocalStorage(key, value, expirable = true) {
  if (expirable) setLocalStorageTime(key);
  localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorageTime(key) {
  const currentTime = new Date().getTime();
  localStorage.setItem(key + "TimeStamp", currentTime);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);

  localStorage.removeItem(key + "TimeStamp");
}

export function hasExpired(key) {
  const dev = Number(localStorage.getItem(key));
  const currentTime = new Date().getTime();
  const timeDif = currentTime - dev;

  if (timeDif > MILLISECONDS_PER_DAY) return true;

  return false;
}
