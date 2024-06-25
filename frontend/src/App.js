import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodForm from "./components/FoodForm";
import FoodList from "./components/FoodList";
import StaffForm from "./components/StaffForm";
import StaffList from "./components/StaffList";

function App() {
  const [foods, setFoods] = useState([]);
  const [staff, setStaff] = useState([]);
  const [orderTime, setOrderTime] = useState("");
  const [orderDay, setOrderDay] = useState("");
  const [availableStaff, setAvailableStaff] = useState([]);

  useEffect(() => {
    fetchFoods();
    fetchStaff();
  }, []);

  const fetchFoods = () => {
    axios
      .get("http://localhost:5000/api/foods")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStaff = () => {
    axios
      .get("http://localhost:5000/api/staff")
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/foods/placeOrder", {
        customerName: "Sample Customer",
        address: "Sample Address",
        foodItems: foods,
        orderTime,
        orderDay,
      })
      .then((res) => {
        console.log(res.data);
        setAvailableStaff(res.data.assignedStaff);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Food Delivery System</h1>

      <h2>Add Food</h2>
      <FoodForm fetchFoods={fetchFoods} />

      <h2>Food List</h2>
      <FoodList foods={foods} fetchFoods={fetchFoods} />

      <h2>Manage Staff</h2>
      <StaffForm fetchStaff={fetchStaff} />
      <StaffList staff={staff} fetchStaff={fetchStaff} />

      {/* <h2>Place Order</h2>
      <form onSubmit={handleOrderSubmit}>
        <label>
          Order Time:
          <input
            type="time"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Order Day:
          <input
            type="text"
            value={orderDay}
            onChange={(e) => setOrderDay(e.target.value)}
            placeholder="Day of the week"
            required
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form> */}

      {/* <h2>Available Staff</h2>
      <ul>
        {availableStaff.map((staffMember) => (
          <li key={staffMember._id}>
            {staffMember.name} - {staffMember.email}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
