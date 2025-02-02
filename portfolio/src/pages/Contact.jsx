import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { Input } from "@heroui/input";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import AOS functionality
import Footer from "../components/Footer";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      once: true, // Only trigger once when the element comes into view
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to be sent to Google Sheets via Google Apps Script
    const url =
      "https://script.google.com/macros/s/AKfycbxdiODMwngWk3m_QOjz1ht89u0SklafoVhl6nfPKesqUDmWuAjcfCuhY4KMg97JswXo/exec"; // Replace with the URL from Apps Script
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("country", formData.country);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Form submitted! Thank you for reaching out.");
      } else {
        alert("There was an issue with the form submission.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }

    setFormData({ name: "", email: "", phone: "", country: "" });
  };
  return (
    <div className="bg-black min-h-screen w-full">
      <div className="p-6 grid grid-cols-1 md:grid-col-2 lg:grid-cols-2 w-[80vw] m-auto gap-20">
        {/* Contact Form Section */}
        <div
          data-aos="fade-right"
          className="bg-zinc-950 shadow-lg rounded-xl p-6 mb-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Connect With Me
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                isRequired
              />
            </div>

            <div className="mb-4">
              <Input
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                id="email"
                name="email"
                isRequired
              />
            </div>
            <div className="mb-4">
              <Input
                label="Country"
                value={formData.country}
                onChange={handleInputChange}
                type="text"
                id="country"
                name="country"
                isRequired
              />
            </div>
            <div className="mb-4">
              <Input
                label="Phone With Country Code"
                value={formData.phone}
                onChange={handleInputChange}
                type="number"
                id="phone"
                name="phone"
                isRequired
              />
            </div>
            <button className="text-white font-semibold bg-gray-600 hover:bg-white hover:text-black transition-all duration-300 flex justify-center items-center px-4 py-2 rounded-xl">
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div data-aos="fade-left" className="">
          <h2 className="text-2xl font-bold mb-4 text-white">My Details</h2>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <FaEnvelope className="mr-2 text-white" />
              <a
                href="mailto:ibrahimafroz77@gmail.com"
                className="hover:underline text-white"
              >
                ibrahimafroz77@gmail.com
              </a>
            </li>
            <li className="flex items-center text-white">
              <FaPhoneAlt className="mr-2 text-white" />
              <span>
                <a href="tel:+966597336794" className="hover:underline">
                  +966 597336794
                </a>{" "}
                |{" "}
                <a href="tel:+917097105021" className="hover:underline">
                  +91 7097105021
                </a>
              </span>
            </li>
            <li className="flex items-center text-white">
              <FaLinkedin className="mr-2 text-white" />
              <a
                href="https://www.linkedin.com/in/mirzaibrahim77/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div data-aos="fade-up" className="m-0 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
