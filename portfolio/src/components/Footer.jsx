// Footer.jsx
import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row sm:flex-col items-center justify-center p-8 text-gray-500">
      <div>
        <p>All Rights Reserved to</p>
      </div>
      <div className="w-40 bg-black p-2 m-2">
        <Link to="/">
          <Logo /> {/* Assuming Logo is another component */}
        </Link>
      </div>
    </div>
  );
};

export default Footer;
