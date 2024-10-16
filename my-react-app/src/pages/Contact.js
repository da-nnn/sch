// src/pages/Contact.js
import React from 'react';
import './Contact.css'; // Create and style this CSS file

function Contact() {
  return (
    <div className="contact-view">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or need assistance, feel free to reach out to us:
      </p>
      <ul>
        <li>Email: <a href="mailto:info@scholarshipskenya.com">info@scholarshipskenya.com</a></li>
        <li>Phone: +2547 46 776 814</li>
      </ul>
      {/* Add a contact form if desired */}
    </div>
  );
}

export default Contact;
