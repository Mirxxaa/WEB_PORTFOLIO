import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <AddCategory />
      <ul>
        {categories.map((category) => (
          <li key={category._id} onClick={() => onSelectCategory(category._id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
