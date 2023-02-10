import React from "react";
import "./AddCustomerButton.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddCustomerButton({ handleAddCustomer }) {
  const openDialog = () => {
    handleAddCustomer(true);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", top: 76, right: 16 }}
        onClick={openDialog}
        size="medium"
      >
        <AddIcon />
      </Fab>{" "}
    </div>
  );
}
