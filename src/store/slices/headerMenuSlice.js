import { createSlice } from "@reduxjs/toolkit";

let headerMenuSlice = createSlice({
  name: "headerMenu",
  initialState: { openDrawer: false, openResponsiveDrawer: false },
  reducers: {
    setOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    setOpenResponsiveDrawer: (state, action) => {
      state.openResponsiveDrawer = action.payload;
    },
  },
});

export let { setOpenDrawer, setOpenResponsiveDrawer } = headerMenuSlice.actions;
export default headerMenuSlice.reducer;
