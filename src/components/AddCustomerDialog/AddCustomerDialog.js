import React from "react";
import "./AddCustomerDialog.css";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";
import { saveCustomer } from "../../api/apiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import { getRegions } from "../../api/apiCalls";

export default function AddCustomerDialog({ open, setOpen, addCustomerData }) {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("05/21/1999");
  const [street, setStreet] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [savingData, setSavingData] = React.useState(false);
  const [regions, setRegions] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    getRegions().then((regions) => setRegions(regions)); // setRegions(regions));
  }, []);

  let validate = () => {
    let temp = {};
    temp.firstname = firstname ? "" : "This field is required";
    temp.lastname = lastname ? "" : "This field is required";
    temp.email = email ? "" : "Email is not valid. ";
    temp.street = street ? "" : "This zip is not valid";
    temp.zip = zip.length === 5 ? "" : "This zip is not valid";
    temp.city = city ? "" : "This field is required";
    temp.region = region ? "" : "This field is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const handleSave = () => {
    // Save the Data
    if (validate()) {
      setSavingData(true);
      let person = {
        firstname,
        lastname,
        email,
        birthdate,
        street,
        zip,
        city,
        region,
      };
      saveCustomer(person).then((customer) => {
        addCustomerData(customer);
        setSavingData(false);
        handleClose();
      });
    }
  };

  const resetState = () => {
    setFirstname("");
    setLastname("");
    setBirthdate("05/21/1999");
    setStreet("");
    setZip("");
    setCity("");
    setEmail("");
    setRegion("");
    setErrors({});
  };

  const handleDateChange = (newDate) => {
    setBirthdate(newDate);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {savingData ? <LinearProgress /> : ""}
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              required
              className="fullwidth"
              error={errors.firstname}
              helperText={errors.firstname}
              label="First Name"
              type="text"
              variant="outlined"
              sx={{ mr: 2, width: "268px" }}
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              required
              className="fullwidth"
              error={errors.lastname}
              helperText={errors.lastname}
              label="Last Name"
              type="text"
              variant="outlined"
              sx={{ width: "268px" }}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            required
            error={errors.email}
            helperText={errors.email}
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Birthdate"
              inputFormat="DD/MM/YYYY"
              value={birthdate}
              fullWidth
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ mt: 1, mb: 0.5 }} />
              )}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            required
            margin="dense"
            id="adress"
            error={errors.street}
            helperText={errors.street}
            label="Street + House No. "
            type="text"
            fullWidth
            variant="outlined"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            sx={{ mr: 2 }}
            id="zip"
            className="fullwidth"
            error={errors.zip}
            helperText={errors.zip}
            label="Zip Code"
            type="text"
            variant="outlined"
            sx={{ width: "268px", mr: 2 }}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            required
            error={errors.city}
            helperText={errors.city}
            label="City"
            type="text"
            className="fullwidth"
            variant="outlined"
            sx={{ width: "268px" }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            id="outlined-select-currency"
            select
            required
            error={errors.region}
            helperText={errors.region}
            label="Region"
            sx={{ mt: 2 }}
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
