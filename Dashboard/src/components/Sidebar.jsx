import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-2xl font-bold">Dashboard</div>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/skills"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Skills
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
