import React from "react";
import "./Customers.css";
import AddCustomerButton from "../AddCustomerButton/AddCustomerButton";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import SaveChangesButton from "../SaveChangesButton/SaveChangesButton";
import { useEffect } from "react";
import { getCustomers } from "../../api/apiCalls";

export default function Customers(props) {
  const [addCustomer, setAddCustomer] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [customerData, setCustomerData] = React.useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  useEffect(() => {
    getCustomers().then((customers) => {
      setCustomerData(customers);
    });
  }, []);

  let addCustomerData = (customer) => {
    customer = customer[0];
    let newCustomers = [...customerData, customer];
    setCustomerData(newCustomers);
  };

  let convertToDataGridStructure = (customers) => {
    let changedData = [];
    for (const customer of customers) {
      changedData.push({
        id: customer.pk,
        firstname: customer.fields.first_name,
        lastname: customer.fields.last_name,
        birthdate: customer.fields.birthdate,
        street: customer.fields.street,
        city: customer.fields.zip + " " + customer.fields.city,
        email: customer.fields.email,
        region: customer.fields.region,
      });
    }
    return changedData;
  };

  let columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "firstname",
      headerName: "First name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Last name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "birthdate",
      headerName: "Birth Date",
      type: "date",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "street",
      headerName: "Street",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "region",
      headerName: "Country",
      type: "text",
      minWidth: 100,
      flex: 1,
    },
  ];

  return (
    <div className="heightChange">
      <h1 className="center left-responsive">Our Customers</h1>
      <div>
        <Box
          sx={{
            minHeight: "266.5px",
            height: "calc(100vh - 160px)",
            width: "calc(100% - 32px)",
            mr: 2,
            ml: 2,
          }}
        >
          <DataGrid
            rows={convertToDataGridStructure(customerData)}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection
            disableSelectionOnClick
            sortModel={sortModel}
            onSortModelChange={(model) => {
              setSortModel(model);
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
      <div>
        <AddCustomerButton
          handleAddCustomer={setAddCustomer}
        ></AddCustomerButton>
        <AddCustomerDialog
          open={addCustomer}
          setOpen={setAddCustomer}
          addCustomerData={addCustomerData}
        ></AddCustomerDialog>
      </div>
    </div>
  );
}
