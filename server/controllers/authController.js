import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// ✅ User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Forgot Password
// ✅ Forgot Password (Updated)
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found!" });
  
      // Generate Reset Token
      const resetToken = crypto.randomBytes(32).toString("hex");
  
      // ✅ Hash the token before storing (More Secure)
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
      user.resetToken = hashedToken;
      user.resetTokenExpires = Date.now() + 3600000; // Valid for 1 hour
      await user.save();
  
      // Send Reset Email
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        text: `Click this link to reset your password: ${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: "Password reset link sent! Check your email." });
    } catch (error) {
      res.status(500).json({ message: "Server error!" });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { resetToken, newPassword } = req.body;
  
      console.log("🔹 Received Reset Token:", resetToken);
  
      if (!resetToken) {
        return res.status(400).json({ message: "Token is required!" });
      }
  
      const user = await User.findOne({
        resetToken, // Token Match करतोय का पाहा
        resetTokenExpires: { $gt: Date.now() }, // Expired नाही ना?
      });
  
      if (!user) {
        console.log("❌ User not found or token expired!");
        return res.status(400).json({ message: "Invalid or expired reset token!" });
      }
  
      console.log("✅ User found! Resetting password...");
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Reset token fields clear
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();
  
      res.json({ message: "Password reset successful! You can now login." });
    } catch (error) {
      console.error("❌ Error resetting password:", error);
      res.status(500).json({ message: "Server error!" });
    }
  };
  