import { createSlice } from "@reduxjs/toolkit";

let initialSort = [
  {
    field: "id",
    sort: "desc",
  },
];

let salesTableSlice = createSlice({
  name: "salesTable",
  initialState: { sortModel: initialSort, pageSize: 10, loading: false },
  reducers: {
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default salesTableSlice.reducer;
export let { setPageSize, setSortModel, setLoading } = salesTableSlice.actions;
