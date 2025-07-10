import FranchiseOwner from "../Models/Owner.model.js";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import fetch from "node-fetch";

// Cookie options
const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  httpOnly: true,
  sameSite: "None",
  secure: true,
  path: "/",
};

// Register Franchise Owner
export const registerOwner = async (req, res) => {
  try {
    const { name, email, password, franchise } = req.body;

    const existingOwner = await FranchiseOwner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newOwner = new FranchiseOwner({ name, email, password, franchise });
    const owner = await newOwner.save();

    const token = owner.generateToken();

    // Set token in cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
        franchise: owner.franchise,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Franchise Owner
export const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await FranchiseOwner.findOne({ email }).populate("franchise");
    if (!owner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await owner.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = owner.generateToken();

    // Set token in cookie
    // res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
        franchise: owner.franchise,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout Franchise Owner
export const logoutOwner = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const me = async (req, res) => {
  res.status(200).json({
    success: true,
    owner: req.owner,
  });
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required" });
    }

    // Assuming req.owner is populated via middleware (e.g., auth middleware)
    const owner = await FranchiseOwner.findById(req.owner._id);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const isMatch = await owner.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    owner.password = newPassword; // bcrypt hash will apply in pre-save hook
    await owner.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Assuming req.owner is populated via middleware (e.g., auth middleware)
    const owner = await FranchiseOwner.findOne({ email: "unas123@gmail.com" });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    owner.password = newPassword; // bcrypt hash will apply in pre-save hook
    await owner.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let user = await FranchiseOwner.findOne({ email: "unas123@gmail.com" });
    if (!user) {
      return new Error(`No Franchise with ${email} exists`);
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your OTP Code",
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
      }),
    });

    if (!response.ok) throw new Error("Failed to send email");

    res.json({ message: "OTP sent", otp });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
