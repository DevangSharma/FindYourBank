import axios from "axios";
import { LOCAL_STORAGE } from "./Constants";
import {
  getLocalStorage,
  hasExpired,
  removeLocalStorage,
  setLocalStorage,
} from "./helpers";

export function getAllBanks(cityName) {
  if (hasExpired(LOCAL_STORAGE.ALL_BANKS + cityName)) {
    removeLocalStorage(LOCAL_STORAGE.ALL_BANKS + cityName);
    return axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${cityName}`)
      .then((result) => {
        setLocalStorage(
          LOCAL_STORAGE.ALL_BANKS + cityName,
          JSON.stringify(result.data)
        );
        return result.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  } else {
    return getLocalStorage(LOCAL_STORAGE.ALL_BANKS + cityName);
  }
}
