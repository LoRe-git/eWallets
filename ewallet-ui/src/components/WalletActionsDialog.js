import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { ACTION_TYPE_CREDIT, ACTION_TYPE_DEBIT } from "../constants";

export default function WalletActionsDialog(props) {
  const { id, walletName, balance, actionType, actionTypeHandler } = props;
  const [dialog, setDialog] = React.useState({
    showDialog: false,
    amount: 0,
    errorMessage: undefined,
  });
  const actionTypeDescription =
    actionType === ACTION_TYPE_CREDIT ? "Top Up" : "Withdraw";
  const handleClickOpen = () => {
    setDialog({ ...dialog, showDialog: true });
  };

  const handleClose = () => {
    setDialog({
      ...dialog,
      amount: 0,
      showDialog: false,
      errorMessage: undefined,
    });
  };

  const handleWalletAction = () => {
    if (Number(dialog.amount) === 0) {
      setDialog({
        ...dialog,
        errorMessage: "Please enter amount!",
      });
    } else {
      if (actionType === ACTION_TYPE_DEBIT) {
        if (Number(balance) - Number(dialog.amount) >= 0) {
          actionTypeHandler(id, Number(dialog.amount), actionType);
          setDialog({
            ...dialog,
            amount: 0,
            showDialog: false,
          });
        } else {
          setDialog({
            ...dialog,
            errorMessage: "Amount cannot be less than wallet balance!",
          });
        }
      } else {
        actionTypeHandler(id, Number(dialog.amount), actionType);
        setDialog({
          ...dialog,
          amount: 0,
          showDialog: false,
        });
      }
    }
  };

  const onChangeHadler = (event) => {
    setDialog({ ...dialog, amount: event.target.value });
  };

  return (
    <div style={{ marginLeft: "6%" }}>
      <Button fullWidth variant="contained" onClick={handleClickOpen}>
        {actionTypeDescription}
      </Button>
      <Dialog open={dialog.showDialog} onClose={handleClose}>
        <DialogTitle>{walletName}</DialogTitle>
        <DialogContent>
          <DialogContentText>Wallet Balance: {balance}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label={actionTypeDescription + " amount"}
            type="number"
            fullWidth
            variant="standard"
            value={dialog.amount}
            error={dialog.errorMessage}
            helperText={dialog.errorMessage}
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
            }}
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={onChangeHadler}
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleWalletAction}>
            {actionTypeDescription}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
