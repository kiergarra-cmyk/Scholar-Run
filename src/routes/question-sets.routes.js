const { Router } = require('express');
const router = Router();
const questionSetsController = require('../controllers/question-sets.controller');

router.post('/', questionSetsController.createQuestionSet);
router.get('/', questionSetsController.getAllQuestionSets);
module.exports = router;