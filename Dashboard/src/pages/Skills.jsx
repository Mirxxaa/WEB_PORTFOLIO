import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase configuration
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Skills = () => {
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState("");
  const [skills, setSkills] = useState([]);

  // Fetch skills from Firebase Firestore
  const fetchSkills = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "skills"));
      const skillsData = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData); // Update the state with the fetched skills
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Submit new skill to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = {
      skillName: skillName,
      skillImage: skillImage,
    };

    try {
      const docRef = await addDoc(collection(db, "skills"), skillData);
      console.log("Skill added:", docRef.id);
      fetchSkills(); // Fetch skills again to update the list
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // Delete skill from Firebase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "skills", id)); // Delete the skill from Firestore by id
      console.log("Skill deleted:", id);
      fetchSkills(); // Fetch skills again to update the list
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Skills</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="Enter Skill Name"
          required
          className="border-2 p-2 m-2"
        />
        <input
          type="text"
          value={skillImage}
          onChange={(e) => setSkillImage(e.target.value)}
          placeholder="Enter Image URL"
          required
          className="border-2 p-2 m-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">
          Add Skill
        </button>
      </form>

      {/* Displaying the skills */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Skills List</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill._id} className="mt-2">
              <h3>{skill.skillName}</h3>
              <img
                src={skill.skillImage}
                alt={skill.skillName}
                className="w-32 h-32 object-cover"
              />
              <button
                onClick={() => handleDelete(skill._id)}
                className="bg-red-500 text-white p-1 m-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
