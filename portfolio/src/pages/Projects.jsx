import React, { useEffect, useState } from "react";
import { firestore } from "../firebase"; // Import Firestore from firebase.js
import { collection, getDocs } from "firebase/firestore"; // Firestore modular imports

const Projects = () => {
  // State to store categories, projects, and loading state
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories and projects from Firebase
  useEffect(() => {
    // Fetch Categories
    const fetchCategories = async () => {
      try {
        const categoriesSnapshot = await getDocs(
          collection(firestore, "categories")
        );
        const categoriesList = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch Projects for each category
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(
          collection(firestore, "projects")
        );
        const projectsList = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Fetch data
    const fetchData = async () => {
      await fetchCategories();
      await fetchProjects();
      setLoading(false); // Set loading state to false once data is fetched
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once on mount

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    // If the category is already selected, unselect it; otherwise, select it
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deselect category
    } else {
      setSelectedCategory(categoryId); // Select the category
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center">
        <div className="border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
      </div>
    ); // Loading state
  }

  return (
    <div className="p-8 bg-black h-screen">
      {categories.map((category) => (
        <div key={category.id}>
          {/* Display category name as clickable */}
          <h3
            className="text-xl font-semibold text-white cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </h3>

          {/* Conditionally render projects based on selected category */}
          {selectedCategory === category.id && (
            <div>
              {/* Filter and display projects belonging to the current category */}
              {projects
                .filter((project) => project.categoryId === category.id)
                .map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden my-4"
                  >
                    {/* Image */}
                    <div className="w-full h-64 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Project Information */}
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {project.name}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
