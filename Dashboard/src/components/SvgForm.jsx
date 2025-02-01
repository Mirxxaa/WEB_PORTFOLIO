import React, { useState } from "react";
import axios from "axios";

const SvgForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [svgCode, setSvgCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/svg", {
        name,
        svgCode,
      });
      console.log("SVG saved:", response.data);
      alert("SVG saved successfully!");
      setName("");
      setSvgCode("");
      onSave(); // Notify parent component
    } catch (error) {
      console.error("Error saving SVG:", error);
      setError("Failed to save SVG. Please check the server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter SVG name (e.g., Logo)"
          required
        />
      </div>
      <div>
        <label className="block">SVG Code:</label>
        <textarea
          value={svgCode}
          onChange={(e) => setSvgCode(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Paste your SVG code here"
          rows="10"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save SVG
      </button>
    </form>
  );
};

export default SvgForm;
