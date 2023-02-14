import { createSlice } from "@reduxjs/toolkit";

let addSaleDialogSlice = createSlice({
  initialState: {
    open: false,
    customer: "",
    seller: "",
    productCat: "",
    amount: 0,
    loading: false,
    errors: {},
  },
  name: "addSaleDialog",
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setSeller: (state, action) => {
      state.seller = action.payload;
    },
    setProductCat: (state, action) => {
      state.productCat = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export default addSaleDialogSlice.reducer;
export let {
  setOpen,
  setAmount,
  setCustomer,
  setProductCat,
  setSeller,
  setErrors,
  setLoading,
} = addSaleDialogSlice.actions;
