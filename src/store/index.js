import { configureStore } from "@reduxjs/toolkit";
import addCustomerDialogReducer from "./slices/addCustomerDialogSlice";
import addSaleDialogReducer from "./slices/addSaleDialogSlice";
import customersTableReducer from "./slices/customersTableSlice";
import headerMenuReducer from "./slices/headerMenuSlice";
import salesTableReducer from "./slices/salesTableSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { crmApi } from "./api/crmApi";

let store = configureStore({
  reducer: {
    addCustomerDialog: addCustomerDialogReducer,
    addSaleDialog: addSaleDialogReducer,
    customersTable: customersTableReducer,
    salesTable: salesTableReducer,
    headerMenu: headerMenuReducer,
    [crmApi.reducerPath]: crmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crmApi.middleware),
});
setupListeners(store.dispatch);

export { store };
