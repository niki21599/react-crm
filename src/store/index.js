import { configureStore } from "@reduxjs/toolkit";
import addCustomerDialogReducer from "./slices/addCustomerDialogSlice";
import addSaleDialogReducer from "./slices/addSaleDialogSlice";

let store = configureStore({
  reducer: {
    addCustomerDialog: addCustomerDialogReducer,
    addSaleDialog: addSaleDialogReducer,
  },
});

export { store };
