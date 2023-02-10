import React, { useEffect } from "react";
import "./Sales.css";
import AddCustomerButton from "../AddCustomerButton/AddCustomerButton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddSaleDialog from "../AddSaleDialog/AddSaleDialog";
import CircularProgress from "@mui/material/CircularProgress";
import { getSales, getCustomers, getSalesman } from "../../api/apiCalls";

export default function Sales(props) {
  const [addSale, setAddSale] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [salesData, setSalesData] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const [allCusomters, setAllCustomers] = React.useState([]);
  const [allSalesman, setAllSalesman] = React.useState([]);

  useEffect(() => {
    getCustomers()
      .then((customers) => setAllCustomers(customers))
      .then(() => getSalesman())
      .then((salesman) => setAllSalesman(salesman))
      .then(() => {
        setLoading(true);
        getSales().then((sales) => {
          setLoading(false);
          setSalesData(sales);
        });
      });
  }, []);

  const transformCustomer = (id) => {
    let customer = allCusomters.filter((customer) => id === customer.pk);
    if (customer.length >= 1) {
      return (
        customer[0].fields.first_name[0] + ". " + customer[0].fields.last_name
      );
    } else {
      return id;
    }
  };

  const transformSalesman = (id) => {
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
      let sellerName = transformSalesman(sale.fields.salesPerson);
      let customerName = transformCustomer(sale.fields.customer);
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
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              checkboxSelection
              disableSelectionOnClick
              sortingOrder="desc"
              sortModel={sortModel}
              onSortModelChange={(model) => {
                setSortModel(model);
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
        </Box>
      </div>
      <div>
        <AddCustomerButton handleAddCustomer={setAddSale}></AddCustomerButton>
        <AddSaleDialog
          open={addSale}
          setOpen={setAddSale}
          addSale={addSaleData}
        ></AddSaleDialog>
      </div>
    </div>
  );
}
