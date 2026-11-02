const Request = require('../models/Request');
const Donor = require('../models/Donor');
const User = require('../models/User');

// @desc    Create a blood request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, units, hospital, contactNumber, urgency, notes } = req.body;

    if (!patientName || !bloodGroup || !units || !hospital || !contactNumber) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const request = await Request.create({
      patientName,
      bloodGroup,
      units,
      hospital,
      contactNumber,
      urgency,
      notes,
      requestedBy: req.user._id,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error('Create request error:', error.message);
    res.status(500).json({ message: 'Server error while creating request' });
  }
};

// @desc    Get all blood requests
// @route   GET /api/requests
// @access  Private
const getAllRequests = async (req, res) => {
  try {
    const { status, bloodGroup } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const requests = await Request.find(filter)
      .populate('requestedBy', 'name email')
      .populate('acceptedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get requests error:', error.message);
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
};

// @desc    Get a single request by ID
// @route   GET /api/requests/:id
// @access  Private
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('requestedBy', 'name email')
      .populate('acceptedBy', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept a blood request
// @route   PUT /api/requests/:id/accept
// @access  Private
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: `Request is already ${request.status}` });
    }

    request.status = 'accepted';
    request.acceptedBy = req.user._id;
    await request.save();

    const updatedRequest = await Request.findById(req.params.id)
      .populate('requestedBy', 'name email')
      .populate('acceptedBy', 'name email');

    res.json(updatedRequest);
  } catch (error) {
    console.error('Accept request error:', error.message);
    res.status(500).json({ message: 'Server error while accepting request' });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/requests/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const availableDonors = await Donor.countDocuments({ isAvailable: true });
    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'pending' });
    const acceptedRequests = await Request.countDocuments({ status: 'accepted' });

    // Count donors by blood group
    const donorsByBloodGroup = await Donor.aggregate([
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalDonors,
      availableDonors,
      totalRequests,
      pendingRequests,
      acceptedRequests,
      donorsByBloodGroup,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error.message);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
};

module.exports = { createRequest, getAllRequests, getRequestById, acceptRequest, getDashboardStats };
