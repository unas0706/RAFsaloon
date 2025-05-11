import Member from "../Models/Member.model.js";

// Add new member
export const addMember = async (req, res) => {
  try {
    let { name } = req.body;

    const mem1 = await Member.findOne({ name });
    if (mem1) {
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
      return;
    }
    const member = await Member.create(req.body);

    res.status(201).json({ message: "Member added successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json({ members });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update member
export const updateMember = async (req, res) => {
  try {
    const { visits, membership, subscription, subscriptionEnd } = req.body;

    const member = await Member.findByIdAndUpdate(
      req.params.memberId,
      { visits, membership, subscription, subscriptionEnd },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member updated successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
