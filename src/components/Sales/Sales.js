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

export default function Sales(props) {
  //const [addSale, setAddSale] = React.useState(false);
  // const [pageSize, setPageSize] = React.useState(5);
  const [salesData, setSalesData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [sortModel, setSortModel] = React.useState([
  //   {
  //     field: "id",
  //     sort: "desc",
  //   },
  // ]);

  let { loading, sortModel, pageSize } = useSelector(
    (state) => state.salesTable
  );

  let dispatch = useDispatch();

  const [allCusomters, setAllCustomers] = React.useState([]);
  const [allSalesman, setAllSalesman] = React.useState([]);

  useEffect(() => {
    getCustomers()
      .then((customers) => setAllCustomers(customers))
      .then(() => getSalesman())
      .then((salesman) => setAllSalesman(salesman))
      .then(() => {
        dispatch(setLoading(true));
        getSales().then((sales) => {
          dispatch(setLoading(false));
          setSalesData(sales);
        });
      });
  }, []);

  let openAddSale = () => {
    dispatch(setOpen(true));
  };

  const getCustomerFullname = (id) => {
    let customer = allCusomters.filter((customer) => id === customer.pk);
    if (customer.length >= 1) {
      return (
        customer[0].fields.first_name[0] + ". " + customer[0].fields.last_name
      );
    } else {
      return id;
    }
  };

  const getSalesmanFullname = (id) => {
    let salesman = allSalesman.filter((seller) => id === seller.pk);
    if (salesman.length >= 1) {
      return (
        salesman[0].fields.first_name[0] + ". " + salesman[0].fields.last_name
      );
    } else {
      return id;
    }
  };

  let addSaleData = async (sale) => {
    sale = sale[0];

    let newSales = [...salesData, sale];
    setSalesData(newSales);
  };

  let convertToDataGridStructure = (sales) => {
    let changedData = [];
    console.log("Sales", sales);
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
    return changedData;
  };

  let columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 100,

      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "sellerName",
      headerName: "Sold by",
      flex: 1,
      minWidth: 100,
      type: "singleSelect",
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1,
      minWidth: 100,
      type: "singleSelect",
    },
    {
      field: "productCat",
      headerName: "Product Category",
      type: "text",
      flex: 1,
      minWidth: 100,
      type: "singleSelect",
    },
    {
      field: "saleAmount",
      headerName: "Sale Amount",
      flex: 1,
      minWidth: 80,
      type: "number",
    },
  ];

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
              sortingOrder="desc"
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
        <AddSaleDialog addSale={addSaleData}></AddSaleDialog>
      </div>
    </div>
  );
}
