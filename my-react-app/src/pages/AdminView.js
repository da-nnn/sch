import React, { useState } from 'react';
import axios from 'axios';
import './AdminView.css';

const COUNTRIES = [
  "Worldwide", "Africa", "Asia", "Australia/Oceania", "Europe", "Latin America", "North America", "South America",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
  "Zimbabwe"
];

const COUNTIES = [
  "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni",
  "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Mount Elgon", "Nandi", "Narok", "Nairobi", "Taita Taveta"
];

const AdminView = () => {
  const [scholarshipId, setScholarshipId] = useState('');
  const [scholarshipName, setScholarshipName] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [type, setType] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [awardAmount, setAwardAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [moreDetails, setMoreDetails] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [scholarshipValue, setScholarshipValue] = useState('');
  const [eligibleExpenses, setEligibleExpenses] = useState('');
  const [applicationProcess, setApplicationProcess] = useState('');
  const [supportingDocuments, setSupportingDocuments] = useState('');
  const [scholarshipConditions, setScholarshipConditions] = useState('');
  const [keyDates, setKeyDates] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [hostCountry, setHostCountry] = useState([]);
  const [eligibleCountry, setEligibleCountry] = useState([]);
  const [hostCounty, setHostCounty] = useState([]);
  const [eligibleCounty, setEligibleCounty] = useState([]);
  const [scholarshipFor, setScholarshipFor] = useState('');
  const [applyGoTo, setApplyGoTo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchScholarshipDetails = () => {
    if (scholarshipId) {
      axios.get(`http://localhost:3000/api/scholarships/${scholarshipId}`)
        .then(response => {
          const scholarship = response.data;
          setScholarshipName(scholarship.scholarship_name || '');
          setSponsor(scholarship.sponsor || '');
          setType(scholarship.type || '');
          setFieldOfStudy(scholarship.field_of_study || '');
          setAwardAmount(scholarship.award_amount || '');
          setDeadline(scholarship.deadline ? scholarship.deadline.substring(0, 10) : '');
          setMoreDetails(scholarship.more_details || '');
          setEligibility(scholarship.eligibility || '');
          setScholarshipValue(scholarship.scholarship_value || '');
          setEligibleExpenses(scholarship.eligible_expenses || '');
          setApplicationProcess(scholarship.application_process || '');
          setSupportingDocuments(scholarship.supporting_documents || '');
          setScholarshipConditions(scholarship.scholarship_conditions || '');
          setKeyDates(scholarship.key_dates || '');
          setAdditionalInformation(scholarship.additional_information || '');
          setHostCountry(scholarship.host_country || []);
          setEligibleCountry(scholarship.eligible_country || []);
          setHostCounty(scholarship.host_county || []);
          setEligibleCounty(scholarship.eligible_county || []);
          setScholarshipFor(scholarship.scholarship_for || '');
          setApplyGoTo(scholarship.apply_go_to || '');
          setIsEditing(true);
          setSuccessMessage('');
        })
        .catch(error => {
          console.error('There was an error fetching the scholarship details!', error);
          setSuccessMessage('Failed to fetch scholarship details.');
        });
    }
  };

  const saveScholarship = (e) => {
    e.preventDefault();

    const scholarshipData = {
      scholarship_name: scholarshipName,
      sponsor: sponsor,
      type: type,
      field_of_study: fieldOfStudy,
      award_amount: awardAmount,
      deadline: deadline,
      more_details: moreDetails,
      eligibility: eligibility,
      scholarship_value: scholarshipValue,
      eligible_expenses: eligibleExpenses,
      application_process: applicationProcess,
      supporting_documents: supportingDocuments,
      scholarship_conditions: scholarshipConditions,
      key_dates: keyDates,
      additional_information: additionalInformation,
      host_country: hostCountry,
      eligible_country: eligibleCountry,
      host_county: hostCounty,
      eligible_county: eligibleCounty,
      scholarship_for: scholarshipFor,
      apply_go_to: applyGoTo
    };

    if (isEditing) {
      axios.put(`http://localhost:3000/api/scholarships/${scholarshipId}`, scholarshipData)
        .then(() => {
          setSuccessMessage('Scholarship updated successfully!');
          resetForm();
        })
        .catch(error => {
          console.error('There was an error updating the scholarship!', error);
          setSuccessMessage('Failed to update scholarship.');
        });
    } else {
      axios.post('http://localhost:3000/api/scholarships', scholarshipData)
        .then(() => {
          setSuccessMessage('Scholarship added successfully!');
          resetForm();
        })
        .catch(error => {
          console.error('There was an error adding the scholarship!', error);
          setSuccessMessage('Failed to add scholarship.');
        });
    }
  };

  const resetForm = () => {
    setScholarshipId('');
    setScholarshipName('');
    setSponsor('');
    setType('');
    setFieldOfStudy('');
    setAwardAmount('');
    setDeadline('');
    setMoreDetails('');
    setEligibility('');
    setScholarshipValue('');
    setEligibleExpenses('');
    setApplicationProcess('');
    setSupportingDocuments('');
    setScholarshipConditions('');
    setKeyDates('');
    setAdditionalInformation('');
    setHostCountry([]);
    setEligibleCountry([]);
    setHostCounty([]);
    setEligibleCounty([]);
    setScholarshipFor('');
    setApplyGoTo('');
    setIsEditing(false);
  };

  const handleMultipleSelect = (setter) => (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setter(selected);
  };

  return (
    <div className="admin-view">
      <h1>Admin Panel</h1>
      <form onSubmit={saveScholarship}>
        <div className="form-group">
          <label htmlFor="scholarship_id">Scholarship ID:</label>
          <input
            type="text"
            id="scholarship_id"
            placeholder="Enter scholarship ID (for edit)"
            value={scholarshipId}
            onChange={(e) => setScholarshipId(e.target.value)}
            onBlur={fetchScholarshipDetails}
          />
        </div>

        <div className="form-group">
          <label htmlFor="scholarship_name">Scholarship Name:</label>
          <input
            type="text"
            id="scholarship_name"
            placeholder="Enter scholarship name"
            value={scholarshipName}
            onChange={(e) => setScholarshipName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sponsor">Sponsor:</label>
          <input
            type="text"
            id="sponsor"
            placeholder="Enter sponsor"
            value={sponsor}
            onChange={(e) => setSponsor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            placeholder="Enter type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field_of_study">Field of Study:</label>
          <select
            id="field_of_study"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            required
          >
            <option disabled value="">Select a field of study</option>
            <option>Law</option>
            <option>Social Sciences</option>
            <option>Health & Medicine</option>
            <option>Business & Economics</option>
            <option>Arts & Humanities</option>
            <option>STEM</option>
            <option>Any Field</option>
            <option>Technology</option>
            <option>Engineering</option>
            <option>Agriculture</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="award_amount">Award Amount:</label>
          <input
            type="number"
            id="award_amount"
            placeholder="Enter award amount"
            value={awardAmount}
            onChange={(e) => setAwardAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="more_details">More Details:</label>
          <textarea
            id="more_details"
            placeholder="Enter more details"
            value={moreDetails}
            onChange={(e) => setMoreDetails(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="eligibility">Eligibility:</label>
          <textarea
            id="eligibility"
            placeholder="Enter eligibility criteria"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="scholarship_value">Scholarship Value:</label>
          <textarea
            id="scholarship_value"
            placeholder="Enter scholarship value and duration"
            value={scholarshipValue}
            onChange={(e) => setScholarshipValue(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="eligible_expenses">Eligible Expenses:</label>
          <textarea
            id="eligible_expenses"
            placeholder="Enter eligible expenses"
            value={eligibleExpenses}
            onChange={(e) => setEligibleExpenses(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="application_process">Application Process:</label>
          <textarea
            id="application_process"
            placeholder="Enter application process"
            value={applicationProcess}
            onChange={(e) => setApplicationProcess(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="supporting_documents">Supporting Documents:</label>
          <textarea
            id="supporting_documents"
            placeholder="Enter supporting documents"
            value={supportingDocuments}
            onChange={(e) => setSupportingDocuments(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="scholarship_conditions">Scholarship Conditions:</label>
          <textarea
            id="scholarship_conditions"
            placeholder="Enter scholarship conditions"
            value={scholarshipConditions}
            onChange={(e) => setScholarshipConditions(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="key_dates">Key Dates:</label>
          <textarea
            id="key_dates"
            placeholder="Enter key dates"
            value={keyDates}
            onChange={(e) => setKeyDates(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="additional_information">Additional Information:</label>
          <textarea
            id="additional_information"
            placeholder="Enter additional information"
            value={additionalInformation}
            onChange={(e) => setAdditionalInformation(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="host_country">Host Country:</label>
          <select
            id="host_country"
            multiple
            value={hostCountry}
            onChange={handleMultipleSelect(setHostCountry)}
            required
          >
            <option disabled value="">Select a host country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eligible_country">Eligible Country:</label>
          <select
            id="eligible_country"
            multiple
            value={eligibleCountry}
            onChange={handleMultipleSelect(setEligibleCountry)}
            required
          >
            <option disabled value="">Select an eligible country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="host_county">Host County:</label>
          <select
            id="host_county"
            multiple
            value={hostCounty}
            onChange={handleMultipleSelect(setHostCounty)}
            required
          >
            <option disabled value="">Select a host county</option>
            {COUNTIES.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eligible_county">Eligible County:</label>
          <select
            id="eligible_county"
            multiple
            value={eligibleCounty}
            onChange={handleMultipleSelect(setEligibleCounty)}
            required
          >
            <option disabled value="">Select an eligible county</option>
            {COUNTIES.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="scholarship_for">Scholarship For:</label>
          <select
            id="scholarship_for"
            value={scholarshipFor}
            onChange={(e) => setScholarshipFor(e.target.value)}
            required
          >
            <option disabled value="">Select scholarship for</option>
            <option>Highschool/Secondary School</option>
            <option>Vocational Colleges</option>
            <option>Online Short Courses</option>
            <option>Short Term Courses</option>
            <option>Bootcamps/Trainings</option>
            <option>Masters</option>
            <option>Post-graduate Diplomas</option>
            <option>PhD</option>
            <option>Postdocs</option>
            <option>Fellowships</option>
            <option>Summer Schools</option>
            <option>Bachelors</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="apply_go_to">Apply/Go To:</label>
          <input
            type="url"
            id="apply_go_to"
            placeholder="Enter application link"
            value={applyGoTo}
            onChange={(e) => setApplyGoTo(e.target.value)}
            required
          />
        </div>

        <button type="submit">{isEditing ? 'Update Scholarship' : 'Add Scholarship'}</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AdminView;
