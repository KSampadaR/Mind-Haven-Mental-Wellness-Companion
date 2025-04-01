import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open, message, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
