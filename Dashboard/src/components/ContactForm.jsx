import React, { useState, useEffect } from "react";

const ContactForm = ({ contact, onSave }) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phoneNumbers, setPhoneNumbers] = useState(
    contact ? contact.phoneNumbers : []
  );
  const [location, setLocation] = useState(contact ? contact.location : "");
  const [linkedin, setLinkedin] = useState(contact ? contact.linkedin : "");

  const handlePhoneChange = (index, field, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index][field] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, { countryCode: "", number: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      name,
      email,
      phoneNumbers,
      location,
      linkedin,
    };

    onSave(updatedContact); // Pass the updated contact data to parent component for saving
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2"
        required
      />
      <div>
        <strong>Phone Numbers:</strong>
        {phoneNumbers.map((phone, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              value={phone.countryCode}
              onChange={(e) =>
                handlePhoneChange(index, "countryCode", e.target.value)
              }
              placeholder="Country Code"
              className="border p-2"
              required
            />
            <input
              type="text"
              value={phone.number}
              onChange={(e) =>
                handlePhoneChange(index, "number", e.target.value)
              }
              placeholder="Phone Number"
              className="border p-2"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPhone}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Phone Number
        </button>
      </div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="border p-2"
        required
      />
      <input
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="LinkedIn"
        className="border p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Information
      </button>
    </form>
  );
};

export default ContactForm;
