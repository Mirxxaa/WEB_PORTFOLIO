import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase configuration
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ToolsAndSkills = () => {
  const [toolName, setToolName] = useState("");
  const [toolImage, setToolImage] = useState("");
  const [tools, setTools] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);
  const [proficiencyLevel, setProficiencyLevel] = useState(1);

  // Fetch tools from Firebase
  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tools"));
      const toolsData = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setTools(toolsData);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  // Fetch skills from Firebase Firestore
  const fetchSkills = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "skills"));
      const skillsData = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Submit new tool to Firebase
  const handleToolSubmit = async (e) => {
    e.preventDefault();
    const toolData = {
      toolName: toolName,
      toolImage: toolImage,
    };
    try {
      const docRef = await addDoc(collection(db, "tools"), toolData);
      console.log("Tool added:", docRef.id);
      fetchTools();
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  // Submit new skill to Firebase
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const skillData = {
      skillName: skillName,
      proficiencyLevel: parseFloat(proficiencyLevel), // Store as a number
    };
    try {
      const docRef = await addDoc(collection(db, "skills"), skillData);
      console.log("Skill added:", docRef.id);
      fetchSkills();
      setSkillName("");
      setProficiencyLevel(1); // Reset after submission
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // Delete tool with confirmation
  const handleDeleteTool = async (id) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      try {
        await deleteDoc(doc(db, "tools", id));
        console.log("Tool deleted:", id);
        fetchTools();
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
    }
  };

  // Delete skill with confirmation
  const handleDeleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteDoc(doc(db, "skills", id));
        console.log("Skill deleted:", id);
        fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  useEffect(() => {
    fetchTools();
    fetchSkills();
  }, []);

  // Function to display stars based on proficiency level
  const renderStars = (rating) => {
    const validRating =
      !isNaN(rating) && rating >= 0 && rating <= 5 ? rating : 0;
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 !== 0;

    return (
      <>
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}

        {/* Render half star if necessary */}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}

        {/* Render empty stars */}
        {[...Array(5 - Math.ceil(validRating))].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400" />
        ))}
      </>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Tools & Skills</h1>

      {/* Tools Section */}
      <div className="bg-gray-100 p-4 flex flex-col">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <form
          onSubmit={handleToolSubmit}
          className="w-full  flex-1 flex-col flex"
        >
          <div className="flex w-full">
            <input
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              placeholder="Enter Tool Name"
              required
              className="border-2 p-2 m-2 w-1/2"
            />
            <input
              type="text"
              value={toolImage}
              onChange={(e) => setToolImage(e.target.value)}
              placeholder="Enter Image URL"
              required
              className="border-2 p-2 m-2 w-1/2"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-950 transition-all duration-300 cursor-pointer  text-white p-2 m-2"
          >
            Add Tool
          </button>
        </form>
        <ul className="flex flex-wrap gap-6">
          {tools.map((tool) => (
            <li key={tool._id} className="mt-2">
              <img
                src={tool.toolImage}
                alt={tool.toolName}
                className="w-32 h-32 object-cover"
              />
              <h3 className="font-semibold my-1">{tool.toolName}</h3>
              <button
                onClick={() => handleDeleteTool(tool._id)}
                className="bg-red-500 w-full border text-white p-1 m-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <form onSubmit={handleSkillSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Enter Skill Name"
            required
            className="border-2 p-2"
          />
          <label className="text-lg font-medium">
            Proficiency Level (1 - 5)
          </label>
          <input
            type="number"
            step="0.5"
            min="1"
            max="5"
            value={proficiencyLevel}
            onChange={(e) => setProficiencyLevel(e.target.value)}
            required
            className="border-2 p-2 w-20"
          />
          <button type="submit" className="bg-green-500 text-white p-2">
            Add Skill
          </button>
        </form>
        <ul className="mt-4">
          {skills.map((skill) => {
            const rating = skill.proficiencyLevel || 0; // Default to 0 if undefined
            return (
              <li key={skill._id} className="mt-2">
                <h3>{skill.skillName}</h3>
                <div>{renderStars(rating)}</div>
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="bg-red-500 text-white p-1 m-2"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ToolsAndSkills;
