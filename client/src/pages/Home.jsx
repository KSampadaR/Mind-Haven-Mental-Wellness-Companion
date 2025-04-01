import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0d1b2a" }}>
          Welcome to Mind Haven
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
          Your ultimate mental wellness companion.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
