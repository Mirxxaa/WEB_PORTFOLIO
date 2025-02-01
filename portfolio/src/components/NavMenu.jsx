import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import Logo from "./Logo";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";

const NavMenu = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="bg-black w-full px-8 py-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center w-[80vw] m-auto">
          {/* Logo */}
          <div className="w-40 ">
            <Logo />
          </div>

          {/* Mobile Menu Toggle Icon */}
          <div
            className="text-white text-2xl md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaBarsStaggered /> : <FaBars />}
          </div>

          {/* Navigation Links */}
          <ul
            className={`text-lg md:flex md:items-center md:gap-10 gap-12 md:static absolute bg-gray-950 z-50 text-black md:bg-transparent top-0 left-0 w-full h-screen md:h-auto transition-all duration-500 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 flex-col md:flex-row md:justify-end justify-center px-8 mt-4 text-xl absolute top-20 h-[200px]`}
          >
            {/* Home Link */}
            <li
              onClick={() => handleLinkClick("home")}
              className={`${
                activeLink === "home" ? "font-bold text-white" : "text-gray-400"
              } cursor-pointer transition duration-300 my-4`}
            >
              <Link to="/">Home</Link>
            </li>

            {/* Projects Link */}
            <li
              onClick={() => handleLinkClick("projects")}
              className={`${
                activeLink === "projects"
                  ? "font-bold text-white"
                  : "text-gray-400"
              } cursor-pointer transition duration-300 my-4`}
            >
              <Link to="/projects">Projects</Link>
            </li>

            {/* Skills Link */}
            <li
              onClick={() => handleLinkClick("skills")}
              className={`${
                activeLink === "skills"
                  ? "font-bold text-white"
                  : "text-gray-400"
              } cursor-pointer transition duration-300 my-4`}
            >
              <Link to="/skills">Skills</Link>
            </li>

            {/* Contact Link */}
            <li
              onClick={() => handleLinkClick("contact")}
              className={`${
                activeLink === "contact"
                  ? "font-bold text-white"
                  : "text-gray-400"
              } cursor-pointer transition duration-300 my-4`}
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
