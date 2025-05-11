import Slot from "../Models/Slot.model.js";

// Get available slots for a specific date
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params; // Extract date from URL parameters
    const slots = await Slot.find({ date, isBooked: false }).populate(
      "franchise"
    );
    if (!slots || slots.length === 0) {
      return res
        .status(404)
        .json({ message: "No available slots for this date" });
    }

    res.status(200).json({ slots });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new slot (Owner)
export const createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, franchiseId } = req.body;

    // Ensure the slot does not already exist for the given date and time
    const existingSlot = await Slot.findOne({ date, startTime, endTime });
    if (existingSlot) {
      return res
        .status(400)
        .json({ message: "Slot already exists for this time" });
    }

    // Create the new slot
    const newSlot = new Slot({
      date,
      startTime,
      endTime,
      franchise: franchiseId,
    });

    await newSlot.save();
    res.status(201).json({ message: "Slot created successfully", newSlot });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Mark slot as booked after a successful booking
export const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.params; // Slot ID to be booked

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Mark the slot as booked
    if (slot.isBooked) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    slot.isBooked = true;
    await slot.save();

    res.status(200).json({ message: "Slot booked successfully", slot });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
