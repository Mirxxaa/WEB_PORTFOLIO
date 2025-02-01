import React, { useState } from "react";
import axios from "axios";

const SvgDisplay = () => {
  const [svgCode, setSvgCode] = useState("");
  const [name, setName] = useState("");

  const fetchSvg = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/svg/${name}`);
      setSvgCode(response.data.svgCode);
    } catch (error) {
      console.error("Error fetching SVG:", error);
      alert("SVG not found");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block">Enter SVG Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter SVG name (e.g., Logo)"
        />
      </div>
      <button
        onClick={fetchSvg}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Fetch SVG
      </button>

      {/* Display SVG Code */}
      {svgCode && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">SVG Preview:</h3>
          <div dangerouslySetInnerHTML={{ __html: svgCode }} />
        </div>
      )}
    </div>
  );
};

export default SvgDisplay;
