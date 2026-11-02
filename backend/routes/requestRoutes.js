const express = require('express');
const router = express.Router();
const {
  createRequest,
  getAllRequests,
  getRequestById,
  acceptRequest,
  getDashboardStats,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

// All request routes are protected
router.use(protect);

// Dashboard stats - must come BEFORE /:id routes
router.get('/stats', getDashboardStats);

router.route('/').get(getAllRequests).post(createRequest);

router.route('/:id').get(getRequestById);

router.put('/:id/accept', acceptRequest);

module.exports = router;
