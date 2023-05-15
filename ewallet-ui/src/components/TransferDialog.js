import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

export default function TransferDialog(props) {
  const {
    isDialogOpened,
    handleCloseDialog,
    handleWalletTransferAction,
    wallets,
  } = props;
  const defaultState = {
    amount: 0,
    errorAmountMessage: undefined,
    selectedFromId: "",
    selectedToId: "",
    selectedFromMsg: undefined,
    selectedToMsg: undefined,
  };
  const [dialog, setDialog] = React.useState(defaultState);

  const getWalletsMenuItem = () => {
    const walletsMenuItem = [];
    wallets &&
      wallets.map((wallet) => {
        walletsMenuItem.push(
          <MenuItem value={wallet.id} key={wallet.id}>
            {wallet.walletName}
          </MenuItem>
        );
        return null;
      });
    return walletsMenuItem;
  };

  const handleTransferAction = () => {
    let hasErrors = false;
    let selectedFromMsg = "";
    let selectedToMsg = "";
    let errorAmountMessage = "";
    let errorMessage = "";
    if (!dialog.selectedFromId) {
      hasErrors = true;
      selectedFromMsg = "Select From wallet!";
    }
    if (!dialog.selectedToId) {
      hasErrors = true;
      selectedToMsg = "Select To wallet!";
    }
    if (Number(dialog.amount) === 0) {
      hasErrors = true;
      errorAmountMessage = "Amount is required!";
    }

    if (
      dialog.selectedFromId &&
      dialog.selectedToId &&
      dialog.selectedToId === dialog.selectedFromId
    ) {
      hasErrors = true;
      selectedFromMsg = "Wallets should not be same!";
      selectedToMsg = "Wallets should not be same!";
    }
    if (
      dialog.selectedFromId &&
      dialog.selectedToId &&
      dialog.selectedToId !== dialog.selectedFromId
    ) {
      for (const wallet of wallets) {
        if (
          wallet.id === dialog.selectedFromId &&
          Number(wallet.balance) < Number(dialog.amount)
        ) {
          hasErrors = true;
          errorAmountMessage = "Amount is greater than from wallet balance!";
          break;
        }
      }
    }
    if (!hasErrors) {
      handleWalletTransferAction({
        fromWalletId: dialog.selectedFromId,
        toWalletId: dialog.selectedToId,
        amount: dialog.amount,
      });
      setDialog(defaultState);
    } else {
      setDialog({
        ...dialog,
        selectedFromMsg: selectedFromMsg,
        selectedToMsg: selectedToMsg,
        errorAmountMessage: errorAmountMessage,
        errorMessage: errorMessage,
      });
    }
  };

  const onAmountChangeHadler = (event) => {
    setDialog({ ...dialog, amount: event.target.value });
  };
  const onFromChangeHadler = (event) => {
    setDialog({ ...dialog, selectedFromId: event.target.value });
  };
  const onToChangeHadler = (event) => {
    setDialog({ ...dialog, selectedToId: event.target.value });
  };

  const handleCloseAction = () => {
    setDialog(defaultState);
    handleCloseDialog();
  };
  const marginTop = { marginTop: "10px" };
  return (
    <div>
      <Dialog open={isDialogOpened} onClose={handleCloseAction} fullWidth>
        <DialogTitle>Transfer Amount</DialogTitle>
        <DialogContent>
          <FormControl
            style={marginTop}
            error={dialog.selectedFromMsg && dialog.selectedFromMsg.length > 0}
            fullWidth
          >
            <InputLabel id="from-wallet-label">From Wallet</InputLabel>
            <Select
              labelId="from-wallet-label"
              id="from-wallet-select"
              value={dialog.selectedFromId}
              required
              onChange={onFromChangeHadler}
              label="From Wallet"
              variant="standard"
              fullWidth
              rules={{ required: true }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {getWalletsMenuItem()}
            </Select>
            <FormHelperText>{dialog.selectedFromMsg}</FormHelperText>
          </FormControl>
          <FormControl
            style={marginTop}
            error={dialog.selectedToMsg && dialog.selectedToMsg.length > 0}
            fullWidth
          >
            <InputLabel id="to-wallet-label">To Wallet</InputLabel>
            <Select
              labelId="to-wallet-label"
              id="to-wallet-select"
              value={dialog.selectedToId}
              required
              onChange={onToChangeHadler}
              label="To Wallet"
              variant="standard"
              fullWidth
              rules={{ required: true }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {getWalletsMenuItem()}
            </Select>
            <FormHelperText>{dialog.selectedToMsg}</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              required
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
              error={dialog.errorAmountMessage}
              helperText={dialog.errorAmountMessage}
            />
          </FormControl>
          <FormControl
            error={dialog.errorMessage && dialog.errorMessage.length > 0}
            fullWidth
          >
            <FormHelperText>{dialog.errorMessage}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAction}>Cancel</Button>
          <Button variant="contained" onClick={handleTransferAction}>
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
