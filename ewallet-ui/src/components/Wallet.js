import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { updateWallet } from "../WalletOperationsService";
import WalletActionsDialog from "./WalletActionsDialog";
import {
  ACTION_TYPE_CREDIT,
  ACTION_TYPE_DEBIT,
  SUCCESS,
  ERROR,
} from "../constants";
import AlertDialog from "./AlertDialog";

export default function Wallet(props) {
  const { wallet, refreshWallets } = props;
  const [walletState, setWalletState] = React.useState({
    walletBalance: wallet.balance,
  });

  const walletOperationHandler = (walletid, amount, actionType) => {
    updateWallet(walletid, amount, actionType)
      .then((res) => {
        if (res && res.data) {
          setWalletState({
            ...walletState,
            walletBalance: res.data.balance,
            snackBar: true,
            severity: SUCCESS,
          });
          refreshWallets();
        }
      })
      .catch((err) => {
        setWalletState({
          ...walletState,
          snackBar: true,
          severity: ERROR,
          msg: err.response.message,
        });
      });
  };

  return (
    <React.Fragment>
      <AlertDialog
        open={walletState.snackBar}
        severity={walletState.severity}
        message={walletState.message}
        alertCallback={() => {}}
      />
      <Grid item key={wallet.id} xs={12} sm={6} md={4}>
        <Card>
          <CardHeader
            title={wallet.walletName}
            titleTypographyProps={{ align: "center" }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h3" color="text.primary">
                ${walletState.walletBalance}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <WalletActionsDialog
              {...wallet}
              balance={walletState.walletBalance}
              actionType={ACTION_TYPE_CREDIT}
              actionTypeHandler={walletOperationHandler}
            />
            <WalletActionsDialog
              {...wallet}
              balance={walletState.walletBalance}
              actionType={ACTION_TYPE_DEBIT}
              actionTypeHandler={walletOperationHandler}
            />
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
