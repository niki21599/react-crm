import React from "react";
import "./AddCustomerButton.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setOpen as setOpenAddCustomer } from "../../store/slices/addCustomerDialogSlice";

export default function AddCustomerButton({ onClick }) {
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", top: 76, right: 16 }}
        onClick={onClick}
        size="medium"
      >
        <AddIcon />
      </Fab>{" "}
    </div>
  );
}
