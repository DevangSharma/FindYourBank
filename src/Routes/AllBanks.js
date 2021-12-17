import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { City, updateCity } from "../City";
import { Select, MenuItem } from "@material-ui/core";
import { getAllBanks } from "../Utils/api";
import { getLocalStorage, setLocalStorage } from "../Utils/helpers";
import { LOCAL_STORAGE } from "../Constants";

function AllBanks() {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cityName, setCityName] = useState(`${City}`);
  const [favourites, setFavourites] = useState([]);
  const [searchColIndex, setSearchColIndex] = useState(0);

  let navigate = useNavigate();

  const column = [
    {
      title: "favourite",
      render: (rowData) => {
        if (favourites.find((tempData) => rowData.ifsc === tempData.ifsc))
          return (
            <i
              onClick={(e) => {
                e.stopPropagation();
                removeFavs(rowData);
              }}
              class="fas fa-check-circle"
            ></i>
          );

        return (
          <i
            onClick={(e) => {
              e.stopPropagation();
              addToFavs(rowData);
            }}
            class="fas fa-plus"
          ></i>
        );
      },
    },

    {
      title: "Bank Name",
      field: "bank_name",
      searchable: searchColIndex === 0,
    },

    {
      title: "IFSC Code",
      field: "ifsc",
      searchable: searchColIndex === 1,
    },

    {
      title: "Branch",
      field: "branch",
      searchable: searchColIndex === 2,
    },

    {
      title: "Bank ID",
      field: "bank_id",
      searchable: searchColIndex === 3,
    },

    {
      title: "Address",
      field: "address",
      searchable: searchColIndex === 4,
    },
  ];

  useEffect(() => {
    fetchBanks();
  }, [cityName]);

  useEffect(() => {
    getFavourites();
  }, []);

  const addToFavs = (rowData) => {
    onSelection([...favourites, rowData]);
  };

  const removeFavs = (rowData) => {
    const newRowData = favourites.filter(
      (element) => element.ifsc !== rowData.ifsc
    );
    onSelection(newRowData);
  };
  const fetchBanks = async () => {
    try {
      const response = await getAllBanks(cityName);

      setBankList(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const rowClickHander = (e, rowData) => {
    navigate(`/bank-details/${rowData.bank_id}`);
  };

  const onSelection = (value) => {
    setFavourites(value);
    setLocalStorage(LOCAL_STORAGE.FAVOURITES, JSON.stringify(value), false);
  };

  const getFavourites = () => {
    const data = getLocalStorage(LOCAL_STORAGE.FAVOURITES) || [];
    setFavourites(data);
  };

  const divStyle = {
    margin: "36px",
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
        actions={[
          {
            icon: () => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 100 }}
                value={searchColIndex}
                onChange={(e) => {
                  const tempIndex = e.target.value;
                  setSearchColIndex(tempIndex);
                }}
              >
                <MenuItem value={0}>Bank Name</MenuItem>
                <MenuItem value={1}>IFSC</MenuItem>
                <MenuItem value={2}>Branch</MenuItem>
                <MenuItem value={3}>Bank ID</MenuItem>
                <MenuItem value={4}>Address</MenuItem>
              </Select>
            ),
            tooltip: "Query",
            isFreeAction: true,
          },
          {
            icon: () => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 100 }}
                value={cityName}
                onChange={(e) => {
                  const city = e.target.value;
                  updateCity(city);
                  setLoading(true);
                  setCityName(city);
                }}
              >
                <MenuItem value="MUMBAI">MUMBAI</MenuItem>
                <MenuItem value="DELHI">DELHI</MenuItem>
                <MenuItem value="BANGALORE">BANGALORE</MenuItem>
                <MenuItem value="BIKANER">BIKANER</MenuItem>
                <MenuItem value="JAIPUR">JAIPUR</MenuItem>
              </Select>
            ),
            tooltip: "City",
            isFreeAction: true,
          },
        ]}
      />
    </div>
  );
}

export default AllBanks;
