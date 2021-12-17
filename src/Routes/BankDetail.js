import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useParams } from "react-router-dom";
import { City, updateCity } from "../City";
import { getAllBanks } from "../api";

function BankDetails() {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cityName, setCityName] = useState(`${City}`);
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
    fetchBanks();
  }, [cityName]);

  const fetchBanks = async () => {
    try {
      const response = await getAllBanks(cityName);

      setBankList(response.filter((element) => element.bank_id == id));
      setLoading(false);
    } catch (err) {}
  };

  const divStyle = {
    margin: "36px",
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
