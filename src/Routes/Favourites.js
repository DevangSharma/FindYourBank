import React from "react";
import { LOCAL_STORAGE } from "../Constants";
import { getLocalStorage } from "../helpers";
import MaterialTable from "material-table";

function Favourites() {
  const favData = getLocalStorage(LOCAL_STORAGE.FAVOURITES) || [];

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

  const divStyle = {
    margin: "36px",
  };
  return (
    <div style={divStyle}>
      <MaterialTable
        title={"My Favourites"}
        data={favData}
        columns={column}
        options={{
          search: false,

          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50, 100],
        }}
      />
    </div>
  );
}

export default Favourites;
