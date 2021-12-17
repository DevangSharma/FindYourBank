import axios from "axios";
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

function Banks() {
  const [bankList, setBankList] = useState([]);

  const column = [
    {
      title: "Bank Name",
      field: "bank_name",
    },

    {
      title: "IFSC Code",
      field: "ifsc",
    },

    {
      title: "Branch",
      field: "branch",
    },

    {
      title: "Bank Name",
      field: "bank_id",
    },

    {
      title: "Bank Name",
      field: "address",
    },
  ];

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((result) => {
        console.log(result);
        setBankList(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const divStyle = {
    marginLeft: "36px",
    marginRight: "36px",
    marginTop: "36px",
    marginBottom: "36px",
  };
  return (
    <div style={divStyle}>
      <MaterialTable
        title={"All Banks"}
        data={bankList}
        columns={column}
        options={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50, 100],
        }}
      />
    </div>
  );
}

export default Banks;
