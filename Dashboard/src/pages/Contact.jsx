import React, { useState, useEffect } from "react";
import { db, doc, getDoc, setDoc } from "../firebase"; // Import Firebase Firestore methods
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch contact information from Firebase
  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const docRef = doc(db, "contacts", "userContact"); // Reference the 'contacts' collection and document 'userContact'
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data()); // Set the fetched data in state
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  // Save or update contact information in Firebase
  const handleSaveContact = async (updatedContact) => {
    try {
      const docRef = doc(db, "contacts", "userContact"); // Reference to the 'contacts' document
      await setDoc(docRef, updatedContact); // Set or update the document in Firestore
      fetchContact(); // Refetch contact details after saving
      setIsEditing(false); // Close the form
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  // Handle add/edit toggle
  const handleAddOrEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Contact Information</h1>
      {contact ? (
        <div className="border p-4 rounded">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone Numbers:</strong>
            <ul className="list-disc pl-5">
              {contact.phoneNumbers.map((phone, index) => (
                <li key={index}>
                  {phone.countryCode} {phone.number}
                </li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Location:</strong> {contact.location}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={contact.linkedin} className="text-blue-500">
              {contact.linkedin}
            </a>
          </p>
          <button
            onClick={handleAddOrEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Information
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddOrEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Information
        </button>
      )}

      {/* Show the form only when isEditing is true */}
      {isEditing && (
        <ContactForm
          contact={contact}
          onSave={handleSaveContact} // Pass handleSaveContact to save updated data
        />
      )}
    </div>
  );
};

export default Contact;
