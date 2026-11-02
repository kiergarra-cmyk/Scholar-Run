const { Router } = require('express');
const router = Router();
const questionSetsController = require('../controllers/question-sets.controller');

router.post('/', questionSetsController.createQuestionSet);

module.exports = router;
