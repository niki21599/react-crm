import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getProductCategories,
  getSalesman,
  getCustomers,
  saveSale,
} from "../../api/apiCalls";

export default function AddSaleDialog({ open, setOpen, addSale }) {
  let today = new Date();

  const [customer, setCustomer] = React.useState("");
  const [seller, setSeller] = React.useState("");
  const [productCat, setProductCat] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [customers, setCustomers] = React.useState([]);
  const [productCategories, setProductCategories] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    getProductCategories().then((categories) =>
      setProductCategories(categories)
    );
    getCustomers().then((customers) => setCustomers(customers));
    getSalesman().then((sellers) => setSellers(sellers));
  }, []);

  const validate = () => {
    let temp = {};
    temp.customer = customer ? "" : "This Field is required";
    temp.productCat = productCat ? "" : "This field is required";
    temp.seller = seller ? "" : "This field is required";
    temp.amount = amount ? "" : "This is not a valid amount";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const handleSave = () => {
    // Save the Data
    if (validate()) {
      setLoading(true);
      let sale = { customer, seller, productCat, amount };
      saveSale(sale).then((saleData) => {
        addSale(saleData);
        setLoading(false);
        handleClose();
      });
    }
  };

  const resetState = () => {
    setCustomer("");
    setSeller("");
    setProductCat("");
    setAmount("");
    setErrors({});
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {loading ? <LinearProgress /> : ""}
        <DialogTitle>Add Sale</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-currency"
            select
            label="Customer"
            sx={{ mt: 2 }}
            error={errors.customer}
            helperText={errors.customer}
            fullWidth
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          >
            {customers.map((option) => (
              <MenuItem key={option.pk} value={option.pk}>
                {option.fields.first_name + " " + option.fields.last_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            sx={{ mt: 2 }}
            label="Seller"
            fullWidth
            error={errors.seller}
            helperText={errors.seller}
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          >
            {sellers.map((option) => (
              <MenuItem key={option.pk} value={option.pk}>
                {option.fields.first_name + " " + option.fields.last_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            sx={{ mt: 2 }}
            label="Product Category"
            fullWidth
            error={errors.productCat}
            helperText={errors.productCat}
            value={productCat}
            onChange={(e) => setProductCat(e.target.value)}
          >
            {productCategories.map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-number"
            label="Amount"
            type="number"
            sx={{ mt: 2 }}
            fullWidth
            error={errors.amount}
            helperText={errors.amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
