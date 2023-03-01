import React from "react";
import "./Customers.css";
import AddButton from "../AddButton/AddButton";
import AddCustomerDialog from "../AddCustomerDialog/AddCustomerDialog";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { setOpen } from "../../store/slices/addCustomerDialogSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortModel,
  setPageSize,
} from "../../store/slices/customersTableSlice";
import { useGetCustomersQuery } from "../../store/api/crmApi";
import { getColumnsCustomerTable } from "../../utils/configTables";

export default function Customers() {
  let { data: customerData, isFetching } = useGetCustomersQuery();
  let dispatch = useDispatch();

  let { pageSize, sortModel } = useSelector((state) => state.customersTable);

  let openAddCustomerDialog = () => {
    dispatch(setOpen(true));
  };

  let convertToDataGridStructure = (customers) => {
    let changedData = [];
    if (customers) {
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
    }
    return changedData;
  };

  let columns = getColumnsCustomerTable();

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
            onPageSizeChange={(newPageSize) =>
              dispatch(setPageSize(newPageSize))
            }
            disableSelectionOnClick
            sortModel={sortModel}
            onSortModelChange={(model) => {
              dispatch(setSortModel(model));
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
      <div>
        <AddButton onClick={openAddCustomerDialog}></AddButton>
        <AddCustomerDialog></AddCustomerDialog>
      </div>
    </div>
  );
}
