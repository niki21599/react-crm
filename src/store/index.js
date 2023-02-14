import { configureStore } from "@reduxjs/toolkit";
import addCustomerDialogReducer from "./slices/addCustomerDialogSlice";
import addSaleDialogReducer from "./slices/addSaleDialogSlice";
import customersTableReducer from "./slices/customersTableSlice";
import headerMenuReducer from "./slices/headerMenuSlice";
import salesTableReducer from "./slices/salesTableSlice";

let store = configureStore({
  reducer: {
    addCustomerDialog: addCustomerDialogReducer,
    addSaleDialog: addSaleDialogReducer,
    customersTable: customersTableReducer,
    salesTable: salesTableReducer,
    headerMenu: headerMenuReducer,
  },
});

export { store };
