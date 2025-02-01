import React, { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/firebase"; // Import Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

const Skills = () => {
  const [skills, setSkills] = useState([]); // State to store fetched skills
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from Firebase Firestore
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills")); // Fetch all skills from Firestore
        const skillsData = querySnapshot.docs.map((doc) => doc.data()); // Map the documents to an array of data
        setSkills(skillsData); // Update the state with fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to fetch skills. Please try again later."); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchSkills(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // Mobile screens (max-width: 640px)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Display loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center">
        <div className="border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen">
      <div className="w-[80vw] m-auto">
        <div className="text-4xl text-white font-bold text-center mb-4">
          <h1>My Skills</h1>
        </div>
        {/* Grid for larger screens */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
          {skills.map((skill, index) => (
            <SpotlightCard key={index} className="flex flex-col items-center">
              <img
                src={skill.skillImage}
                alt={skill.skillName}
                className="w-20 h-20 object-contain mb-4"
              />
              <p className="text-center text-white text-lg font-medium">
                {skill.skillName}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Carousel for mobile screens */}
        <div className="block md:hidden p-6">
          <Slider {...settings}>
            {skills.map((skill, index) => (
              <SpotlightCard
                key={index}
                className="flex flex-col items-center mx-4"
              >
                <img
                  src={skill.skillImage}
                  alt={skill.skillName}
                  className="w-16 h-16 object-contain mb-4"
                />
                <p className="text-center text-white text-lg font-medium">
                  {skill.skillName}
                </p>
              </SpotlightCard>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Skills;
