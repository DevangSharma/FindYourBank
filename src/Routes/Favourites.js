import React from "react";
import { LOCAL_STORAGE } from "../Constants";
import { getLocalStorage } from "../helpers";

function Favourites() {
  const data = getLocalStorage(LOCAL_STORAGE.FAVOURITES) || [];

  console.log(data);
  return (
    <div>
      {data.map((dt) => (
        <h4>{dt.bank_name}</h4>
      ))}
    </div>
  );
}

export default Favourites;
