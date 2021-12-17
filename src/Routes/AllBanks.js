import axios from "axios";
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
function AllBanks() {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let navigate = useNavigate();
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
      title: "Bank ID",
      field: "bank_id",
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
        console.log(result);
        setBankList(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const rowClickHander = (e, rowData) => {
    navigate(`/bank-details/${rowData.bank_id}`);
  };

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
        title={"All Banks"}
        data={bankList}
        columns={column}
        onRowClick={rowClickHander}
        options={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50, 100],
        }}
      />
    </div>
  );
}

export default AllBanks;
