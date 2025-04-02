import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ Add Reset Token & Expiry Fields
  resetToken: { type: String, default: null },
  resetTokenExpires: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);
export default User;
