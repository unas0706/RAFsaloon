import Booking from "../Models/booking.model.js";
import Slot from "../Models/Slot.model.js";
import FranchiseOwner from "../Models/Owner.model.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { service, franchise, phone, date, time } = req.body;

    // const slot = await Slot.findById(slotId);
    // if (!slot) {
    //   return res.status(404).json({ message: "Slot not found" });
    // }

    // const booking = new Booking({
    //   userId,
    //   service,
    //   slot: slotId,
    //   status,
    // });

    // await booking.save();

    // // Update the slot to mark it as booked
    // slot.isBooked = true;
    // await slot.save();

    let booking = await Booking.create({
      service,
      franchise,
      phone,
      date,
      time,
    });
    console.log(booking);

    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const owner = await FranchiseOwner.findById(req.owner._id);

    const bookings = await Booking.find();
    const BookingsPaticluar = bookings.filter((ele) => {
      return ele.franchise._id.toString() == owner.franchise.toString();
    });

    res.status(200).json({ bookings: BookingsPaticluar });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bookings by user ID
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("slot");
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
