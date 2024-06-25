import React, { useState } from "react";
import axios from "axios";

function FoodForm({ fetchFoods }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quality, setQuality] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFood = {
      name,
      price,
      quality,
    };

    axios.post("http://localhost:5000/api/foods/add", newFood).then((res) => {
      console.log(res.data);
      fetchFoods();
    });

    setName("");
    setPrice("");
    setQuality("");
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
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <br />
      <input
        type="number"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        placeholder="Quality"
        required
      />
      <br />
      <button type="submit">Add Food</button>
    </form>
  );
}

export default FoodForm;
