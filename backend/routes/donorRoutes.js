const express = require('express');
const router = express.Router();
const {
  addDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

// All donor routes are protected
router.use(protect);

router.route('/').get(getAllDonors).post(addDonor);

router.route('/:id').get(getDonorById).put(updateDonor).delete(deleteDonor);

module.exports = router;
