const express = require('express');
const router = express.Router();
const rideServices = require('../services/microsoft_adc_services');

/* GET rides. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await rideServices.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting rides `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await rideServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating rides `, err.message);
    next(err);
  }
});

// Put
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await rideServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating rides`, err.message);
    next(err);
  }
}); 

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});
module.exports = router;
