// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Create and style this CSS file

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Scholarships Kenya. All rights reserved.</p>
        <p>
          Contact us: <a href="mailto:info@scholarshipskenya.com">info@scholarshipskenya.com</a>
        </p>
        <p>Phone: +2547 46 776 814</p>
      </div>
    </footer>
  );
}

export default Footer;
