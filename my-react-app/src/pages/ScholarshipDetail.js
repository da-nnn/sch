// src/pages/ScholarshipDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ScholarshipDetail.css'; // Ensure to create and style this CSS file accordingly

const ScholarshipDetail = () => {
  const {id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!id) {
        setError('No ID provided.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/scholarships/${id}`);
        setScholarship(response.data);
      } catch (error) {
        console.error('Error fetching scholarship details:', error);
        if (error.response && error.response.status === 400) {
          setError('Invalid scholarship ID.');
        } else if (error.response && error.response.status === 404) {
          setError('Scholarship not found.');
        } else {
          setError('Failed to load scholarship details.');
        }
      }
    };

    fetchScholarship();
  }, [id]);

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  const daysUntilDeadline = (deadline) => {
    if (!deadline) return 'N/A';
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining >= 0 ? daysRemaining : 'Deadline passed';
  };

  return (
    <div className="scholarship-detail">
      <header>
        <div className="menu">
          <div className="logo-title">
            <img src="/assets/image.png" alt="Logo" className="logo" />
            <h1>Scholarship Details</h1>
          </div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="left-sidebar">
          <section className="sidebar-section">
            <h3>Related Scholarships</h3>
            <table>
              <thead>
                <tr>
                  <th>Scholarship Name</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {/* Populate with related scholarships */}
              </tbody>
            </table>
          </section>

          <section className="sidebar-section">
            <h3>Scholarship Categories</h3>
            <select>
              <option value="">Select Category</option>
              {/* Populate with categories */}
            </select>
          </section>

          <section className="sidebar-section social-media">
            <p>Follow us on:</p>
            <ul>
              <li><a href="https://www.facebook.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.twitter.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.instagram.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/scholarshipskenya" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </section>
        </div>

        <div className="main-content-area">
          {scholarship ? (
            <>
              <h2>{scholarship.scholarship_name || 'N/A'}</h2>
              <p><strong>Deadline:</strong> {formatDate(scholarship.deadline)}</p>
              <p><strong>Category:</strong> {scholarship.type || 'N/A'}</p>
              <p><strong>Description:</strong> {scholarship.more_details || 'N/A'}</p>

              <div className="details">
                <h3>Key Information</h3>
                <div className="info-section">
                  <h4>Eligibility</h4>
                  <p>{scholarship.eligibility || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Scholarship Value and Duration</h4>
                  <p>{scholarship.scholarship_value || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Eligible Expenses</h4>
                  <p>{scholarship.eligible_expenses || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Application Process</h4>
                  <p>{scholarship.application_process || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Supporting Documents</h4>
                  <p>{scholarship.supporting_documents || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Scholarship Conditions</h4>
                  <p>{scholarship.scholarship_conditions || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Additional Information</h4>
                  <p>{scholarship.additional_information || 'N/A'}</p>
                </div>
              </div>

              <div className="location-info">
                <h3>Location Information</h3>
                <div className="info-section">
                  <h4>Host Country</h4>
                  <p>{scholarship.host_country || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Eligible Country</h4>
                  <p>{scholarship.eligible_country || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Host County</h4>
                  <p>{scholarship.host_county || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Eligible County</h4>
                  <p>{scholarship.eligible_county || 'N/A'}</p>
                </div>

                <div className="info-section">
                  <h4>Scholarship For</h4>
                  <p>{scholarship.scholarship_for || 'N/A'}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="right-sidebar">
          <section className="sidebar-section">
            <h3>Days Until Deadline</h3>
            {scholarship && (
              <p className="countdown">
                {daysUntilDeadline(scholarship.deadline)} days remaining
              </p>
            )}
            {scholarship && scholarship.apply_go_to && (
              <div className="apply-button">
                <a
                  href={scholarship.apply_go_to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Apply/Go To
                </a>
              </div>
            )}
          </section>

          <section className="sidebar-section">
            <h3>Top Rated Scholarships</h3>
            <ul>
              <li><a href="#">Scholarship A</a></li>
              <li><a href="#">Scholarship B</a></li>
              <li><a href="#">Scholarship C</a></li>
            </ul>
          </section>

          <section className="sidebar-section">
            <h3>Popular Searches</h3>
            <ul>
              <li><a href="#">Engineering Scholarships</a></li>
              <li><a href="#">Business Scholarships</a></li>
              <li><a href="#">Study Abroad Scholarships</a></li>
            </ul>
          </section>
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2024 Scholarships Kenya. All rights reserved.</p>
          <p>Contact us: <a href="mailto:info@scholarshipskenya.com">info@scholarshipskenya.com</a></p>
          <p>Phone: +2547 46 776 814</p>
        </div>
      </footer>
    </div>
  );
};

export default ScholarshipDetail;
