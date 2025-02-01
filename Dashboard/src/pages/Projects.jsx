import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Projects = () => {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
  const [editingProject, setEditingProject] = useState(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  // Fetch categories and projects from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(
        collection(firestore, "categories")
      );
      const categoriesList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    };

    const fetchProjects = async () => {
      const projectsSnapshot = await getDocs(collection(firestore, "projects"));
      const projectsList = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsList);
    };

    fetchCategories();
    fetchProjects();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Toggle selection, or select a new category
    setSelectedCategory(categoryId === selectedCategory ? "" : categoryId);
  };

  const handleAddCategory = async () => {
    try {
      if (!categoryName) {
        alert("Please enter a category name.");
        return;
      }

      setIsLoading(true);

      // Create a new category
      await addDoc(collection(firestore, "categories"), {
        name: categoryName,
      });

      setIsLoading(false);
      setShowCategoryDialog(false);
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category: ", error);
      setIsLoading(false);
    }
  };

  const handleAddProject = async () => {
    try {
      if (
        !projectName ||
        !projectDescription ||
        !projectImage ||
        !selectedCategory
      ) {
        alert("Please fill in all fields and select a category.");
        return;
      }

      setIsLoading(true);

      // Create the new project with categoryId
      await addDoc(collection(firestore, "projects"), {
        name: projectName,
        description: projectDescription,
        imageUrl: projectImage,
        categoryId: selectedCategory, // Ensure categoryId is added here
      });

      setIsLoading(false);
      setShowProjectDialog(false);
      setProjectName("");
      setProjectDescription("");
      setProjectImage("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error adding project: ", error);
      setIsLoading(false);
    }
  };

  const handleEditProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setEditingProject(project);
      setProjectName(project.name);
      setProjectDescription(project.description);
      setProjectImage(project.imageUrl);
      setSelectedCategory(project.categoryId);
      setShowProjectDialog(true);
    }
  };

  const handleUpdateProject = async () => {
    try {
      if (
        !projectName ||
        !projectDescription ||
        !projectImage ||
        !selectedCategory
      ) {
        alert("Please fill in all fields and select a category.");
        return;
      }

      setIsLoading(true);

      const projectRef = doc(firestore, "projects", editingProject.id);

      await updateDoc(projectRef, {
        name: projectName,
        description: projectDescription,
        imageUrl: projectImage,
        categoryId: selectedCategory, // Ensure categoryId is added here
      });

      setIsLoading(false);
      setShowProjectDialog(false);
      setProjectName("");
      setProjectDescription("");
      setProjectImage("");
      setSelectedCategory("");
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project: ", error);
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteDoc(doc(firestore, "categories", categoryId));

      // Also, delete all projects under this category (optional)
      const projectsToDelete = projects.filter(
        (project) => project.categoryId === categoryId
      );
      for (const project of projectsToDelete) {
        await deleteDoc(doc(firestore, "projects", project.id));
      }
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(firestore, "projects", projectId));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.categoryId === selectedCategory)
    : projects;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects Page</h1>

      <div className="mb-4 space-x-4">
        <button
          onClick={() => setShowCategoryDialog(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
        <button
          onClick={() => setShowProjectDialog(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </div>

      {/* Display Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <div className="space-x-2">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <button
                  onClick={() => handleCategoryClick(cat.id)} // Set category on click
                  className={`bg-gray-200 px-4 py-2 rounded ${
                    selectedCategory === cat.id ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {cat.name}
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Dialog */}
      {showCategoryDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create a Category</h2>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category Name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="flex space-x-4">
              <button onClick={handleAddCategory} disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Category"}
              </button>
              <button
                onClick={() => setShowCategoryDialog(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Dialog */}
      {showProjectDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingProject !== null ? "Edit Project" : "Add a Project"}
            </h2>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Project Description"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="url"
              value={projectImage}
              onChange={(e) => setProjectImage(e.target.value)}
              placeholder="Project Image URL"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="flex space-x-4">
              <button
                onClick={
                  editingProject !== null
                    ? handleUpdateProject
                    : handleAddProject
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isLoading
                  ? "Saving..."
                  : editingProject
                  ? "Update Project"
                  : "Add Project"}
              </button>
              <button
                onClick={() => setShowProjectDialog(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {filteredProjects.length === 0 ? (
          <p>No projects found for this category.</p>
        ) : (
          <ul>
            {filteredProjects.map((project) => (
              <li key={project.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Projects;
