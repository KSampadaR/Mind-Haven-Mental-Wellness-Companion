import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !phone || !email || !password) {
      setMessage("Please fill all fields!");
      setSeverity("error");
      setOpen(true);
      return;
    }
    if (phone.length !== 10) {
      setMessage("Enter a valid 10-digit phone number!");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message);
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Server error!");
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
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "#0077b6" }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Box sx={{ mt: 2, textAlign: "center", color: "#fff" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <a href="/login" style={{ color: "#90e0ef" }}>
              Login
            </a>
          </Typography>
        </Box>
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

export default Signup;
