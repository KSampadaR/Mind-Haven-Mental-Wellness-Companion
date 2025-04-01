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
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // URL मधून Token घेणे
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill all fields!");
      setSeverity("warning");
      setOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetToken: token, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSeverity("success");
        setTimeout(() => navigate("/login"), 2000);
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
          Reset Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "#0077b6" }}
          onClick={handleResetPassword}
        >
          Reset Password
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

export default ResetPassword;
