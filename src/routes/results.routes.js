const express = require('express');
const router = express.Router();
const { getTournamentResults } = require('../controllers/results.controller');

// Define the results endpoint route
router.get('/results', getTournamentResults);

module.exports = router;