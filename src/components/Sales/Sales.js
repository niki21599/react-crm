import React, { useEffect } from "react";
import "./Sales.css";
import AddButton from "../AddButton/AddButton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddSaleDialog from "../AddSaleDialog/AddSaleDialog";
import CircularProgress from "@mui/material/CircularProgress";
import { getSales, getCustomers, getSalesman } from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/slices/addSaleDialogSlice";
import {
  setLoading,
  setPageSize,
  setSortModel,
} from "../../store/slices/salesTableSlice";
import {
  useGetCustomersQuery,
  useGetSalesmanQuery,
  useGetSalesQuery,
} from "../../store/api/crmApi";
import { getColumnsSaleTable } from "../../utils/configTables";

export default function Sales() {
  let { loading, sortModel, pageSize } = useSelector(
    (state) => state.salesTable
  );
  let { data: salesData, isFetching } = useGetSalesQuery();
  let dispatch = useDispatch();

  let { data: allCustomers } = useGetCustomersQuery();
  let { data: allSalesman } = useGetSalesmanQuery();

  let openAddSale = () => {
    dispatch(setOpen(true));
  };

  const getCustomerFullname = (id) => {
    if (allCustomers) {
      let customer = allCustomers.filter((customer) => id === customer.pk);
      if (customer.length >= 1) {
        return (
          customer[0].fields.first_name[0] + ". " + customer[0].fields.last_name
        );
      } else {
        return id;
      }
    }
  };

  const getSalesmanFullname = (id) => {
    if (allSalesman) {
      let salesman = allSalesman.filter((seller) => id === seller.pk);
      if (salesman.length >= 1) {
        return (
          salesman[0].fields.first_name[0] + ". " + salesman[0].fields.last_name
        );
      } else {
        return id;
      }
    }
  };

  let convertToDataGridStructure = (sales) => {
    let changedData = [];
    if (salesData) {
      for (const sale of sales) {
        let sellerName = getSalesmanFullname(sale.fields.salesPerson);
        let customerName = getCustomerFullname(sale.fields.customer);
        changedData.push({
          id: sale.pk,
          date: sale.fields.created_at,
          sellerName: sellerName,
          customerName: customerName,
          productCat: sale.fields.productCategory,
          saleAmount: sale.fields.sales,
        });
      }
    }

    return changedData;
  };

  let columns = getColumnsSaleTable();

  return (
    <div className="heightChange">
      <h1 className="center left-responsive">Our Sales</h1>
      <div>
        <Box
          sx={{
            minHeight: "266.5px",
            height: "calc(100vh - 160px)",
            width: "calc(100% - 32px)",
            mr: 2,
            ml: 2,
            display: "flex !important",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={convertToDataGridStructure(salesData)}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 20, 50]}
              onPageSizeChange={(newPageSize) =>
                dispatch(setPageSize(newPageSize))
              }
              checkboxSelection
              disableSelectionOnClick
              sortModel={sortModel}
              onSortModelChange={(model) => {
                dispatch(setSortModel(model));
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
        </Box>
      </div>
      <div>
        <AddButton onClick={openAddSale}></AddButton>
        <AddSaleDialog></AddSaleDialog>
      </div>
    </div>
  );
}
