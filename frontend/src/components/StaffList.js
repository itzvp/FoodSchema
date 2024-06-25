import React from "react";

const StaffList = ({ staff, handleDelete, handleUpdate }) => {
  return (
    <div>
      <h2>Staff List</h2>
      <ul>
        {staff.map((s) => (
          <li key={s._id}>
            {s.name} - {s.email} - {s.phone} <br />
            Available: {s.availableDays.join(", ")} from{" "}
            {s.availableHours.start} to {s.availableHours.end}
            {/* <button onClick={() => handleUpdate(s._id)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
