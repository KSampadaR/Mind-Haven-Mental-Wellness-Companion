import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email!");
      setSeverity("warning");
      setOpen(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSeverity("success");
      } else {
        setMessage(data.message);
        setSeverity("error");
      }
      setOpen(true);
    } catch (error) {
      setMessage("Server error! Please try again.");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#fff" }}
        >
          Forgot Password
        </Typography>
        <TextField
          fullWidth
          label="Enter your Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "#0077b6" }}
          onClick={handleForgotPassword}
        >
          Send Reset Link
        </Button>
      </Paper>

      {/* ✅ Snackbar Notification */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
