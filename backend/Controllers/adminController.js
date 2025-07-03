import Admin from "../Models/Admin.model.js";
import Franchise from "../Models/Franchise.model.js";

// Cookie options
const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  httpOnly: true,
  sameSite: "None",
  secure: true,
  path: "/",
};

// Login Franchise Owner
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Admin.findOne({ email });
    if (!owner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await owner.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = owner.generateToken();

    // Set token in cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout Franchise Owner
export const logoutAdmin = async (req, res) => {
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

export const admin = async (req, res) => {
  res.status(200).json({
    success: true,
    owner: req.owner,
  });
};

// Change Password
export const adminChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new passwords are required" });
    }

    // Assuming req.owner is populated via middleware (e.g., auth middleware)
    const owner = await Admin.findById(req.admin._id);

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

export const EditAdmin = async (req, res) => {
  try {
    let { name, email } = req.body;
    await Admin.findByIdAndUpdate(req.admin._id, { name, email });
    res.status(200).json({
      success: true,
      message: "Admin Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getFranchises = async (req, res) => {
  try {
    let franchises = await Franchise.find();
    res.status(200).json({
      success: true,
      franchises,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
