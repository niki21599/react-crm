import { createSlice } from "@reduxjs/toolkit";

let addSaleDialogSlice = createSlice({
  initialState: { open: false },
  name: "addSaleDialog",
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default addSaleDialogSlice.reducer;
export let { setOpen } = addSaleDialogSlice.actions;
