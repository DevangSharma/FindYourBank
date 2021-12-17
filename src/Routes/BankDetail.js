import axios from "axios";
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useParams } from "react-router-dom";

function BankDetails() {
  const [bankList, setBankList] = useState([]);
  const [filteredList, setFiltered] = useState(bankList);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

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
      title: "Address",
      field: "address",
    },
  ];

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((result) => {
        var temp = result.data;

        setBankList(temp.filter((dt) => dt.bank_id == id));

        setLoading(false);
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
        isLoading={isLoading}
        title={`Banks with ID : ${id}`}
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

export default BankDetails;
