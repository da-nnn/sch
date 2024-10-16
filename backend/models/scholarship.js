// backend/models/Scholarship.js
const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  scholarship_name: {
    type: String,
    required: true,
  },
  field_of_study: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  eligible_country: {
    type: String,
    required: true,
  },
  scholarship_for: {
    type: String,
    required: true,
  },
  type: { // Category of the scholarship
    type: String,
  },
  more_details: { // Detailed description
    type: String,
  },
  eligibility: { // Eligibility criteria
    type: String,
  },
  scholarship_value: { // Value and duration of the scholarship
    type: String,
  },
  eligible_expenses: { // Expenses covered by the scholarship
    type: String,
  },
  application_process: { // Steps to apply
    type: String,
  },
  supporting_documents: { // Required documents for application
    type: String,
  },
  scholarship_conditions: { // Conditions to maintain the scholarship
    type: String,
  },
  additional_information: { // Any extra information
    type: String,
  },
  host_country: { // Country hosting the scholarship
    type: String,
  },
  host_county: { // County hosting the scholarship
    type: String,
  },
  eligible_county: { // County eligibility
    type: String,
  },
  apply_go_to: { // URL to apply or get more info
    type: String,
  },
  rating: { // Rating of the scholarship (if applicable)
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
