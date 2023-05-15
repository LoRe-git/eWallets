import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

export default function NewWalletDialog(props) {
  const { isDialogOpened, handleCloseDialog, handleWalletAction } = props;
  const [dialog, setDialog] = React.useState({
    amount: 0,
    name: "",
    errorMessage: undefined,
  });

  const handleCreateAction = () => {
    if (!dialog.name) {
      setDialog({
        ...dialog,
        amount: 0,
        name: "",
        errorMessage: "Name is required!",
      });
    } else {
      handleWalletAction(dialog.name, dialog.amount);
      setDialog({ ...dialog, amount: 0, name: "", errorMessage: undefined });
    }
  };

  const onAmountChangeHadler = (event) => {
    setDialog({ ...dialog, amount: event.target.value });
  };

  const onNameChangeHadler = (event) => {
    if (event.target.value === "") {
      setDialog({
        ...dialog,
        name: event.target.value,
      });
    } else {
      setDialog({ ...dialog, name: event.target.value });
    }
  };

  const handleCloseAction = () => {
    setDialog({
      ...dialog,
      amount: 0,
      name: "",
      errorMessage: undefined,
    });
    handleCloseDialog();
  };
  return (
    <div>
      <Dialog open={isDialogOpened} onClose={handleCloseAction}>
        <DialogTitle>Create Wallet</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={dialog.name}
            onChange={onNameChangeHadler}
            required={true}
            error={dialog.errorMessage}
            helperText={dialog.errorMessage}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={dialog.amount === 0 ? "" : dialog.amount}
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
            onChange={onAmountChangeHadler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAction}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateAction}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
