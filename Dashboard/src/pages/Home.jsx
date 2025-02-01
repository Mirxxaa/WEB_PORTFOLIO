import React, { useState, useEffect } from "react";
import axios from "axios";
import SvgForm from "../components/SvgForm";

const Home = () => {
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [svgList, setSvgList] = useState([]); // State to store list of SVGs

  // Fetch all SVGs from the backend
  useEffect(() => {
    fetchSvgList();
  }, []);

  const fetchSvgList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/svg");
      setSvgList(response.data);
    } catch (error) {
      console.error("Error fetching SVG list:", error);
    }
  };

  // Handle form submission and close the form
  const handleFormSubmit = () => {
    setShowForm(false); // Close the form
    fetchSvgList(); // Refresh the list of SVGs
  };

  return (
    <div className="p-4">
      {/* Add Logo Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Logo
      </button>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Add SVG Code</h2>
            <SvgForm onSave={handleFormSubmit} />
            <button
              onClick={() => setShowForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Display List of SVGs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Stored Logos</h2>
        {svgList.length === 0 ? (
          <p>No logos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {svgList.map((svg) => (
              <div key={svg._id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{svg.name}</h3>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: svg.svgCode }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
