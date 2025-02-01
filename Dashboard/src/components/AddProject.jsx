import React, { useState } from "react";
import axios from "axios";

const AddProject = ({ categoryId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddProject = () => {
    const projectData = { categoryId, name, description, imageUrl };
    axios
      .post("/projects", projectData)
      .then((response) => {
        alert("Project added");
        setName("");
        setDescription("");
        setImageUrl("");
      })
      .catch((error) => console.error("Error adding project:", error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
};

export default AddProject;
