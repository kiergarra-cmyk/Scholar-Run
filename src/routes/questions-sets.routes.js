const { Router } = require('express');
const router = Router();
 
const questionSetController = require('../controllers/question-set.controller');

router.post('/', questionSetController.createQuestionSet);
router.get('/', questionSetController.getAllQuestionSets);

module.exports = router;