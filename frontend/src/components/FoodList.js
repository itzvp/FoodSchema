import React, { useState } from "react";
import axios from "axios";

function FoodList({ foods, fetchFoods }) {
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedQuality, setUpdatedQuality] = useState("");

  const handleEdit = (food) => {
    setEditMode(food._id);
    setUpdatedName(food.name);
    setUpdatedPrice(food.price);
    setUpdatedQuality(food.quality);
  };

  const handleUpdate = (id) => {
    const updatedFood = {
      name: updatedName,
      price: updatedPrice,
      quality: updatedQuality,
    };

    axios
      .post(`http://localhost:5000/api/foods/update/${id}`, updatedFood)
      .then((res) => {
        console.log(res.data);
        fetchFoods();
        setEditMode(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/foods/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchFoods();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ul>
      {foods.map((food) => (
        <li key={food._id}>
          {editMode === food._id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(food._id);
              }}
            >
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                required
              />
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                required
              />
              <input
                type="number"
                value={updatedQuality}
                onChange={(e) => setUpdatedQuality(e.target.value)}
                required
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              {food.name} - ${food.price} - {food.quality}
              <button onClick={() => handleDelete(food._id)}>Delete</button>
              <button onClick={() => handleEdit(food)}>Update</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
