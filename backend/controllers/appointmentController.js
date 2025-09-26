import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorName, date, time } = req.body;

    const appointment = await Appointment.create({
      doctorName,
      date,
      time,
      user: req.user.id,
    });

    res.json({ msg: "Appointment booked", appointment });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
