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
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill all fields!");
      setSeverity("error");
      setOpen(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful!");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => navigate("/"), 2000); // Redirect to home
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
          Login
        </Typography>
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
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* ✅ Forgot Password Link */}
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="body2">
            <Link
              to="/forgot-password"
              style={{ color: "#90e0ef", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center", color: "#fff" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "#90e0ef", textDecoration: "none" }}
            >
              Sign up
            </Link>
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

export default Login;
