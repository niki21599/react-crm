import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

let initialSort = [
  {
    field: "id",
    sort: "desc",
  },
];

let customersTableSlice = createSlice({
  name: "customersTableSlice",
  initialState: { sortModel: initialSort, pageSize: 5 },
  reducers: {
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export default customersTableSlice.reducer;
export let { setSortModel, setPageSize } = customersTableSlice.actions;
