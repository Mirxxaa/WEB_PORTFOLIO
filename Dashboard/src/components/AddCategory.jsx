import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleAddCategory = () => {
    axios
      .post("/categories", { name })
      .then((response) => {
        alert("Category added");
        setName("");
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default AddCategory;
