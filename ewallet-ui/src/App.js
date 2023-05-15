import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Wallet from "./components/Wallet";
import NewWalletDialog from "./components/NewWalletDialog";
import {
  getAllWallets,
  createWallet,
  transferAmount,
} from "./WalletOperationsService";
import CopyRight from "./components/CopyRight";
import SignIn from "./components/SignIn";
import TransferDialog from "./components/TransferDialog";
import { SUCCESS, ERROR } from "./constants";
import AlertDialog from "./components/AlertDialog";

function App() {
  const [appState, setAppState] = React.useState({
    openCreateDialog: false,
    openTransferDialog: false,
    wallets: [],
    sessionTkn: sessionStorage.getItem("access_token"),
  });
  const defaultSnackState = {
    snackBar: false,
    severity: undefined,
    message: undefined,
  };
  const [snackState, setSnackState] = React.useState(defaultSnackState);

  const getWallets = () => {
    setAppState({
      ...appState,
      wallets: [],
    });
    if (sessionStorage.getItem("access_token")) {
      getAllWallets().then((res) => {
        if (res && res.data) {
          res.data.sort(function (a, b) {
            return a.id - b.id;
          });
          setAppState({
            ...appState,
            wallets: res.data,
            openCreateDialog: false,
            openTransferDialog: false,
          });
        }
      });
    }
  };
  React.useEffect(() => {
    getWallets();
  }, []);

  const handleWalletAction = (name, amount) => {
    createWallet({
      walletName: name,
      balance: amount,
      user: { id: 1 },
    })
      .then((res) => {
        console.log(res);
        getWallets();
        setAppState({
          ...appState,
          snackBar: true,
          severity: SUCCESS,
          message: "Wallet created.",
        });
      })
      .catch((err) => {
        setAppState({
          ...appState,
          snackBar: true,
          severity: ERROR,
          message: err?.response?.data?.message,
        });
      });
  };

  const handleCloseDialog = () => {
    setAppState({
      ...appState,
      openCreateDialog: false,
      openTransferDialog: false,
    });
  };
  const handleOpenCreateDialog = () => {
    setAppState({ ...appState, openCreateDialog: true });
  };

  const handleOpenTransferDialog = () => {
    setAppState({ ...appState, openTransferDialog: true });
  };

  const handleWalletTransferAction = (transferData) => {
    console.log(transferData);
    const waData = appState.wallets;
    setAppState({
      ...appState,
      wallets: [],
    });
    transferAmount(transferData)
      .then((res) => {
        console.log("TRANSFERRED");
        if (res.data === 200) {
          getWallets();
        }
      })
      .catch((err) => {
        console.log("TRANSFER_FAIED");
        console.log(err);
        setAppState({
          ...appState,
          wallets: waData,
        });
      });
  };
  const signInCallback = () => {
    setAppState({
      ...appState,
      sessionTkn: sessionStorage.getItem("access_token"),
    });
    getWallets();
  };

  const alertCallback = () => {
    setSnackState(defaultSnackState);
  };
  const logout = () => {
    sessionStorage.removeItem("access_token");
    setAppState({
      ...appState,
      sessionTkn: undefined,
    });
  };
  return (
    <React.Fragment>
      {snackState.snackBar && (
        <AlertDialog
          open={snackState.snackBar}
          severity={snackState.severity}
          message={snackState.message}
          alertCallback={alertCallback}
        />
      )}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Kuehne+Nagel
          </Typography>
          <nav>
            {sessionStorage.getItem("access_token") && (
              <>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={handleOpenCreateDialog}
                >
                  Create Wallet
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={handleOpenTransferDialog}
                >
                  Transfer Amount
                </Link>
              </>
            )}
            <Link
              variant="button"
              color="text.primary"
              target="_blank"
              href="http://localhost:8080/swagger-ui/index.html"
              sx={{ my: 1, mx: 1.5 }}
            >
              Swagger Doc.
            </Link>
          </nav>
          {sessionStorage.getItem("access_token") && (
            <Button
              href="#"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* End Header */}

      {/* SignIn */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {!sessionStorage.getItem("access_token") && (
          <SignIn signInCallback={signInCallback} />
        )}
      </Container>
      {/* End SignIn*/}

      {/* Wallets */}
      {sessionStorage.getItem("access_token") && (
        <Container maxWidth="md" component="main">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            e-Wallets
          </Typography>
          <Grid container spacing={5} alignItems="flex-end">
            {appState.wallets.map((wallet) => (
              <Wallet
                wallet={wallet}
                key={wallet.id}
                refreshWallets={getWallets}
              />
            ))}
          </Grid>
        </Container>
      )}
      {/* End Wallets */}

      <NewWalletDialog
        isDialogOpened={appState.openCreateDialog}
        handleCloseDialog={handleCloseDialog}
        handleWalletAction={handleWalletAction}
      />
      <TransferDialog
        isDialogOpened={appState.openTransferDialog}
        handleCloseDialog={handleCloseDialog}
        handleWalletTransferAction={handleWalletTransferAction}
        wallets={appState.wallets}
      />
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <CopyRight sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default App;
