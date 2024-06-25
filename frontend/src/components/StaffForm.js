import React, { useState } from "react";
import axios from "axios";

function StaffForm({ fetchStaff }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availableDays, setAvailableDays] = useState("");
  const [availableStart, setAvailableStart] = useState("");
  const [availableEnd, setAvailableEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStaff = {
      name,
      email,
      phone,
      availableDays: availableDays.split(","),
      availableHours: {
        start: availableStart,
        end: availableEnd,
      },
    };

    axios.post("http://localhost:5000/api/staff/add", newStaff).then((res) => {
      console.log(res.data);
      fetchStaff();
    });

    setName("");
    setEmail("");
    setPhone("");
    setAvailableDays("");
    setAvailableStart("");
    setAvailableEnd("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <br />
      <input
        type="text"
        value={availableDays}
        onChange={(e) => setAvailableDays(e.target.value)}
        placeholder="Available Days (comma-separated)"
        required
      />
      <br />
      <input
        type="text"
        value={availableStart}
        onChange={(e) => setAvailableStart(e.target.value)}
        placeholder="Available Start Time"
        required
      />
      <br />
      <input
        type="text"
        value={availableEnd}
        onChange={(e) => setAvailableEnd(e.target.value)}
        placeholder="Available End Time"
        required
      />
      <br />
      <button type="submit">Add Staff</button>
    </form>
  );
}

export default StaffForm;
