import { createSlice } from "@reduxjs/toolkit";

let addCustomerDialogSlice = createSlice({
  initialState: {
    open: false,
    firstname: "",
    lastname: "",
    birthdate: "05/21/1999",
    street: "",
    zip: "",
    city: "",
    email: "",
    region: "",

    loading: false,
    errors: {},
  },
  name: "addCustomerDialog",
  reducers: {
    setOpen: (state, action) => {
      state.openAddCustomerDialog = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setBirthdate: (state, action) => {
      state.birthdate = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default addCustomerDialogSlice.reducer;

export let {
  setBirthdate,
  setCity,
  setEmail,
  setErrors,
  setFirstname,
  setLastname,
  setLoading,
  setOpen,
  setRegion,
  setStreet,
  setZip,
} = addCustomerDialogSlice.actions;
