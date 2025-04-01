import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx"; // ✅ Reset Password Page Import केला
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar /> {/* Navbar कायम ठेवला */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />{" "}
        {/* ✅ Reset Password Route */}
      </Routes>
    </>
  );
}

export default App;
