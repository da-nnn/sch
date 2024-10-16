// backend/routes/scholarships.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Scholarship = require('../models/scholarship');

// @route   GET /api/scholarships
// @desc    Get all scholarships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ deadline: 1 });
    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/scholarships/:id
// @desc    Get a scholarship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Use mongoose.Types.ObjectId to convert id to ObjectId
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ message: 'Server Error' });
  }

  const mongoose = require('mongoose');

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
  }
  

});

// @route   POST /api/scholarships
// @desc    Create a new scholarship
// @access  Public
router.post(
  '/',
  [
    body('scholarship_name').notEmpty().withMessage('Scholarship name is required'),
    body('field_of_study').notEmpty().withMessage('Field of study is required'),
    body('deadline').isISO8601().withMessage('Valid deadline date is required'),
    body('eligible_country').notEmpty().withMessage('Eligible country is required'),
    body('scholarship_for').notEmpty().withMessage('Scholarship for is required'),
    body('apply_go_to').optional().isURL().withMessage('Apply/Go To must be a valid URL'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scholarship_name, field_of_study, deadline, eligible_country, scholarship_for, type, more_details, eligibility, scholarship_value, eligible_expenses, application_process, supporting_documents, scholarship_conditions, additional_information, host_country, host_county, eligible_county, apply_go_to, rating } = req.body;

    try {
      const newScholarship = new Scholarship({
        scholarship_name,
        field_of_study,
        deadline,
        eligible_country,
        scholarship_for,
        type,
        more_details,
        eligibility,
        scholarship_value,
        eligible_expenses,
        application_process,
        supporting_documents,
        scholarship_conditions,
        additional_information,
        host_country,
        host_county,
        eligible_county,
        apply_go_to,
        rating,
      });

      const savedScholarship = await newScholarship.save();
      res.status(201).json(savedScholarship);
    } catch (error) {
      console.error('Error creating scholarship:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   PUT /api/scholarships/:id
// @desc    Update a scholarship by ID
// @access  Public
router.put(
  '/:id',
  [
    body('apply_go_to').optional().isURL().withMessage('Apply/Go To must be a valid URL'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  ],
  async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scholarship_name, field_of_study, deadline, eligible_country, scholarship_for, type, more_details, eligibility, scholarship_value, eligible_expenses, application_process, supporting_documents, scholarship_conditions, additional_information, host_country, host_county, eligible_county, apply_go_to, rating } = req.body;

    try {
      const scholarship = await Scholarship.findById(id);
      if (!scholarship) {
        return res.status(404).json({ message: 'Scholarship not found' });
      }

      // Update fields if provided
      scholarship.scholarship_name = scholarship_name || scholarship.scholarship_name;
      scholarship.field_of_study = field_of_study || scholarship.field_of_study;
      scholarship.deadline = deadline || scholarship.deadline;
      scholarship.eligible_country = eligible_country || scholarship.eligible_country;
      scholarship.scholarship_for = scholarship_for || scholarship.scholarship_for;
      scholarship.type = type || scholarship.type;
      scholarship.more_details = more_details || scholarship.more_details;
      scholarship.eligibility = eligibility || scholarship.eligibility;
      scholarship.scholarship_value = scholarship_value || scholarship.scholarship_value;
      scholarship.eligible_expenses = eligible_expenses || scholarship.eligible_expenses;
      scholarship.application_process = application_process || scholarship.application_process;
      scholarship.supporting_documents = supporting_documents || scholarship.supporting_documents;
      scholarship.scholarship_conditions = scholarship_conditions || scholarship.scholarship_conditions;
      scholarship.additional_information = additional_information || scholarship.additional_information;
      scholarship.host_country = host_country || scholarship.host_country;
      scholarship.host_county = host_county || scholarship.host_county;
      scholarship.eligible_county = eligible_county || scholarship.eligible_county;
      scholarship.apply_go_to = apply_go_to || scholarship.apply_go_to;
      scholarship.rating = rating !== undefined ? rating : scholarship.rating;

      const updatedScholarship = await scholarship.save();
      res.json(updatedScholarship);
    } catch (error) {
      console.error('Error updating scholarship:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   DELETE /api/scholarships/:id
// @desc    Delete a scholarship by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    await scholarship.remove();
    res.json({ message: 'Scholarship removed' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/scholarships/:id/related
// @desc    Get scholarships related by field_of_study
// @access  Public
router.get('/:id/related', async (req, res) => {
  const { id } = req.params;

  try {
    const currentScholarship = await Scholarship.findById(id);
    if (!currentScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    const relatedScholarships = await Scholarship.find({
      field_of_study: currentScholarship.field_of_study,
      _id: { $ne: currentScholarship._id }, // Exclude current scholarship by _id
    }).limit(5);

    res.json(relatedScholarships);
  } catch (error) {
    console.error('Error fetching related scholarships:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/scholarships/categories
// @desc    Get all unique scholarship categories (field_of_study)
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Scholarship.distinct('field_of_study');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/scholarships/top-rated
// @desc    Get top rated scholarships
// @access  Public
router.get('/top-rated/all', async (req, res) => {
  try {
    const topScholarships = await Scholarship.find().sort({ rating: -1 }).limit(5);
    res.json(topScholarships);
  } catch (error) {
    console.error('Error fetching top-rated scholarships:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/scholarships/popular-searches
// @desc    Get a list of popular search terms
// @access  Public
router.get('/popular-searches/all', async (req, res) => {
  try {
    const popularSearches = [
      'Engineering Scholarships',
      'Business Scholarships',
      'Medical Scholarships',
      'Women in STEM Scholarships',
      'International Students Scholarships',
    ];
    res.json(popularSearches);
  } catch (error) {
    console.error('Error fetching popular searches:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
