export let getColumnsCustomerTable = () => {
  return [
    { field: "id", headerName: "ID", width: 60 },
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
};

export let getColumnsSaleTable = () => {
  return [
    { field: "id", headerName: "ID", width: 60 },
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
};
