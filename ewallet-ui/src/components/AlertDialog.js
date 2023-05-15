import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function AlertDialog(props) {
  const { alertCallback } = props;
  const [alert, setAlert] = React.useState(props.open);

  React.useEffect(() => {
    // when the component is mounted, the alert is displayed for 7 seconds
    setTimeout(() => {
      setAlert(false);
      alertCallback();
    }, 7000);
  }, []);

  const handleClose = () => {
    setAlert(false);
    alertCallback();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alert}
      onClose={handleClose}
      key={"top+center"}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
