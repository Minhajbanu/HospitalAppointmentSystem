import { useState, useEffect } from "react";
import API from "../services/api";

function Appointment() {
  const [form, setForm] = useState({ doctorName: "", date: "", time: "" });
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", form);
      setMessage("Appointment booked!");
      fetchAppointments();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error booking appointment");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>
        <input type="text" name="doctorName" placeholder="Doctor's Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <button type="submit">Book Now</button>
        <p>{message}</p>
      </form>

      <div className="appointments-list">
        <h3>Your Appointments</h3>
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              {appt.doctorName} - {appt.date} at {appt.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Appointment;
