import axios from "axios";
import React, { useState, useEffect } from "react";

function Banks() {
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((result) => {
        console.log(result);
        setBankList(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        {bankList.map((bank) => (
          <li key={bank.ifsc}>{bank.bank_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Banks;
