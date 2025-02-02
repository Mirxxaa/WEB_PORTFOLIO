import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Projects = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories and projects from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesSnapshot, projectsSnapshot] = await Promise.all([
          getDocs(collection(firestore, "categories")),
          getDocs(collection(firestore, "projects")),
        ]);

        setCategories(
          categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setProjects(
          projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  // Handle "All" button click
  const handleAllProjectsClick = () => {
    setSelectedCategory(null); // Show all projects when "All" is clicked
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen">
      <div className="w-[80vw] m-auto">
        {/* Category Navigation Bar */}
        <div className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-700 scrollbar-hide">
          {/* All Projects Button */}
          <button
            onClick={handleAllProjectsClick}
            className={`px-6 py-2 text-lg font-semibold transition rounded-full ${
              selectedCategory === null
                ? "bg-white text-black shadow-md"
                : "text-white hover:bg-gray-800"
            }`}
          >
            All
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-2 text-lg font-semibold transition rounded-full ${
                selectedCategory === category.id
                  ? "bg-white text-black shadow-md"
                  : "text-white hover:bg-gray-800"
              } 
      sm:px-4 sm:py-1 sm:text-base`} // Mobile adjustments (smaller padding and font size)
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projects
            .filter(
              (project) =>
                selectedCategory === null ||
                project.categoryId === selectedCategory
            )
            .map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
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
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {project.name}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
