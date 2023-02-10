import React from "react";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";

export default function SaveChangesButton({ visible, setVisible }) {
  const saveChanges = () => {
    console.log("Changes Saved");
    setVisible(false);
  };

  return (
    <div>
      {visible ? (
        <Fab
          variant="extended"
          color="secondary"
          aria-label="save"
          sx={{ position: "fixed", top: 76, right: 80 }}
          onClick={saveChanges}
        >
          <SaveIcon sx={{ mr: 1 }} />
          Save
        </Fab>
      ) : (
        ""
      )}
    </div>
  );
}
