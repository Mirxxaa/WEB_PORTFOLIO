// Footer.jsx
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="w-full flex flex-col md:flex-row sm:flex-col items-center justify-center p-8 text-gray-500">
      <div>
        <p>All Rights Reserved to</p>
      </div>
      <div className="w-40 bg-black p-2 m-2">
        <Logo /> {/* Assuming Logo is another component */}
      </div>
    </div>
  );
};

export default Footer;
