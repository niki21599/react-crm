import { configureStore } from "@reduxjs/toolkit";
import addCustomerDialogReducer from "./slices/addCustomerDialogSlice";

let store = configureStore({
  reducer: {
    addCustomerDialog: addCustomerDialogReducer,
  },
});

export { store };
