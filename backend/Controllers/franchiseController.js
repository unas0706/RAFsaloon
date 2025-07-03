import Franchise from "../Models/Franchise.model.js";
import FranchiseOwner from "../Models/Owner.model.js";

// Get franchise details
export const getFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.franchiseId).populate(
      "owner"
    );
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    res.status(200).json({ franchise });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update franchise details
export const updateFranchise = async (req, res) => {
  try {
    const { name, location, owner, contact, address } = req.body;

    const franchise = await Franchise.findByIdAndUpdate(
      req.params.franchiseId,
      { name, location, owner, contact, address },
      { new: true }
    );
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    res
      .status(200)
      .json({ message: "Franchise updated successfully", franchise });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const addFranchiseWithOwner = async (req, res) => {
  try {
    const {
      franchise: {
        name,
        location,
        owner: ownerName,
        contact,
        address,
        established,
        stats,
      },
      owner: { email, password },
    } = req.body;

    // Basic validation
    if (!name || !location || !ownerName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if owner email already exists
    const existingOwner = await FranchiseOwner.findOne({ email });
    if (existingOwner) {
      return res
        .status(409)
        .json({ message: "Owner with this email already exists." });
    }

    // Create and save Franchise
    const newFranchise = new Franchise({
      name,
      location,
      owner: ownerName,
      contact,
      address,
      established,
      stats,
    });

    const savedFranchise = await newFranchise.save();

    // Create and save Owner with reference to the Franchise
    const newOwner = new FranchiseOwner({
      name: ownerName,
      email,
      password,
      franchise: savedFranchise._id,
    });

    const savedOwner = await newOwner.save();

    res.status(201).json({
      message: "Franchise and Owner created successfully",
      franchise: savedFranchise,
      owner: {
        id: savedOwner._id,
        name: savedOwner.name,
        email: savedOwner.email,
        franchise: savedFranchise._id,
      },
    });
  } catch (error) {
    console.error("Add Franchise + Owner Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();

    res.status(200).json({
      success: true,
      count: franchises.length,
      data: franchises,
    });
  } catch (error) {
    console.error("Get All Franchises Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching franchises",
      error: error.message,
    });
  }
};

export const FranchiseNames = async (req, res) => {
  try {
    const franchises = await Franchise.find().select("_id name");

    res.status(200).json({
      success: true,
      franchises,
    });
  } catch (error) {
    console.error("FranchiseNames Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
