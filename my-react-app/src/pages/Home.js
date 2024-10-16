// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Create and style this CSS file

function Home() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('deadline');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchScholarships();
  }, []);

  useEffect(() => {
    filterScholarships();
  }, [scholarships, selectedCategory, searchTerm]);

  const fetchScholarships = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scholarships'); // Update the API endpoint as needed
      setScholarships(response.data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const filterScholarships = () => {
    const filtered = scholarships.filter((scholarship) => {
      const matchesCategory =
        selectedCategory === '' || scholarship.field_of_study === selectedCategory;
      const matchesSearch =
        scholarship.scholarship_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.field_of_study.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredScholarships(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const changeSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('asc');
    }
  };

  const sortIndicator = (criteria) => {
    if (sortCriteria === criteria) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  const sortedScholarships = filteredScholarships.slice().sort((a, b) => {
    if (a[sortCriteria] === null || b[sortCriteria] === null) {
      return 0;
    }

    let result = 0;
    if (sortCriteria === 'deadline') {
      result = new Date(a[sortCriteria]) - new Date(b[sortCriteria]);
    } else {
      result = a[sortCriteria].localeCompare(b[sortCriteria]);
    }

    return sortDirection === 'asc' ? result : -result;
  });

  const paginatedScholarships = sortedScholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedScholarships.length / itemsPerPage);

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="home-view">
      <header>
        {/* Header content is managed globally */}
      </header>

      <main className="main-content">
        <div className="left-sidebar">
          <section className="sidebar-section">
            <h3>Filter by Category</h3>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Medical">Medical</option>
              <option value="Law">Law</option>
              <option value="Social Sciences">Social Sciences</option>
              <option value="Health & Medicine">Health & Medicine</option>
              <option value="Business & Economics">Business & Economics</option>
              <option value="Arts & Humanities">Arts & Humanities</option>
              <option value="STEM">STEM</option>
              <option value="Any Field">Any Field</option>
            </select>
          </section>

          <section className="sidebar-section">
            <h3>Search Scholarships</h3>
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for scholarships..."
            />
          </section>
        </div>

        <div className="main-content-area">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => changeSort('scholarship_name')}>
                  Name {sortIndicator('scholarship_name')}
                </th>
                <th onClick={() => changeSort('field_of_study')}>
                  Field of Study {sortIndicator('field_of_study')}
                </th>
                <th onClick={() => changeSort('deadline')}>
                  Deadline {sortIndicator('deadline')}
                </th>
                <th onClick={() => changeSort('eligible_country')}>
                  Eligible Country {sortIndicator('eligible_country')}
                </th>
                <th onClick={() => changeSort('scholarship_for')}>
                  Scholarship For {sortIndicator('scholarship_for')}
                </th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {paginatedScholarships.map((scholarship, index) => (
                <tr key={scholarship.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{scholarship.scholarship_name}</td>
                  <td>{scholarship.field_of_study}</td>
                  <td>{formatDate(scholarship.deadline)}</td>
                  <td>{scholarship.eligible_country}</td>
                  <td>{scholarship.scholarship_for}</td>
                  <td>
                    <Link to={`/scholarship/${scholarship._id}`}>More Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={previousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>

          {!filteredScholarships.length && (
            <p className="no-scholarships">No scholarships available.</p>
          )}
        </div>

        <div className="right-sidebar">
          {/* Additional sections or widgets can be added here */}
        </div>
      </main>

      <footer>
        {/* Footer content is managed globally */}
      </footer>
    </div>
  );
}

export default Home;
