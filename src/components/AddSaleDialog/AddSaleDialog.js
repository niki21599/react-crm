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
import {
  setOpen,
  setAmount,
  setCustomer,
  setErrors,
  setLoading,
  setProductCat,
  setSeller,
} from "../../store/slices/addSaleDialogSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddSaleDialog({ addSale }) {
  let today = new Date();

  let { open } = useSelector((state) => state.addSaleDialog);
  let { customer, seller, productCat, amount, loading, errors } = useSelector(
    (state) => state.addSaleDialog
  );

  // const [customer, setCustomer] = React.useState("");
  // const [seller, setSeller] = React.useState("");
  // const [productCat, setProductCat] = React.useState("");
  // const [amount, setAmount] = React.useState(0);
  const [customers, setCustomers] = React.useState([]);
  const [productCategories, setProductCategories] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [errors, setErrors] = React.useState({});

  let dispatch = useDispatch();

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

    dispatch(setErrors({ ...temp }));
    return Object.values(temp).every((x) => x == "");
  };

  const handleSave = () => {
    // Save the Data
    if (validate()) {
      dispatch(setLoading(true));
      let sale = { customer, seller, productCat, amount };
      saveSale(sale).then((saleData) => {
        addSale(saleData);
        dispatch(setLoading(false));
        handleClose();
      });
    }
  };

  const resetState = () => {
    dispatch(setCustomer(""));
    dispatch(setSeller(""));
    dispatch(setProductCat(""));
    dispatch(setAmount(""));
    dispatch(setErrors({}));
  };

  const handleClose = () => {
    resetState();
    dispatch(setOpen(false));
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
            onChange={(e) => dispatch(setCustomer(e.target.value))}
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
            onChange={(e) => dispatch(setSeller(e.target.value))}
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
            onChange={(e) => dispatch(setProductCat(e.target.value))}
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
            onChange={(e) => dispatch(setAmount(e.target.value))}
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
