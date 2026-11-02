const Donor = require('../models/Donor');

// @desc    Add a new donor
// @route   POST /api/donors
// @access  Private
const addDonor = async (req, res) => {
  try {
    const { name, bloodGroup, age, phone, email, address, city, lastDonationDate } = req.body;

    if (!name || !bloodGroup || !age || !phone) {
      return res.status(400).json({ message: 'Name, blood group, age, and phone are required' });
    }

    const donor = await Donor.create({
      name,
      bloodGroup,
      age,
      phone,
      email,
      address,
      city,
      lastDonationDate,
      addedBy: req.user._id,
    });

    res.status(201).json(donor);
  } catch (error) {
    console.error('Add donor error:', error.message);
    res.status(500).json({ message: 'Server error while adding donor' });
  }
};

// @desc    Get all donors (with optional blood group filter)
// @route   GET /api/donors
// @access  Private
const getAllDonors = async (req, res) => {
  try {
    const { bloodGroup, search } = req.query;
    let filter = {};

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const donors = await Donor.find(filter)
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(donors);
  } catch (error) {
    console.error('Get donors error:', error.message);
    res.status(500).json({ message: 'Server error while fetching donors' });
  }
};

// @desc    Get a single donor by ID
// @route   GET /api/donors/:id
// @access  Private
const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).populate('addedBy', 'name email');

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a donor
// @route   PUT /api/donors/:id
// @access  Private
const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedDonor);
  } catch (error) {
    console.error('Update donor error:', error.message);
    res.status(500).json({ message: 'Server error while updating donor' });
  }
};

// @desc    Delete a donor
// @route   DELETE /api/donors/:id
// @access  Private
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    await Donor.findByIdAndDelete(req.params.id);

    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    console.error('Delete donor error:', error.message);
    res.status(500).json({ message: 'Server error while deleting donor' });
  }
};

module.exports = { addDonor, getAllDonors, getDonorById, updateDonor, deleteDonor };
