const { Router } = require('express');
const router = Router();
const {
  getAllRides,
  getRide,
  addRide,
  updateRide,
  deleteRide,
} = require('../controllers');

router.post('/rides', addRide);
router.get('/rides', getAllRides);
router.get('/rides/:id', getRide);
router.patch('/rides/:id', updateRide);
router.delete('/rides/:id', deleteRide);

module.exports = router;
