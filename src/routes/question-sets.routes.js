const { Router } = require('express');
const router = Router();
const questionSetsController = require('../controllers/question-sets.controller');

router.post('/', questionSetsController.createQuestionSet);
router.get('/', questionSetsController.getAllQuestionSets);

// GET /api/v1/sessions/:id/questions
router.get('/:id/questions', async (req, res, next) => {
  try {
    const sessionId = req.params.id;

    // 1. Find the session and include its associated question set, questions, and choices
    const session = await GameSession.findByPk(sessionId, {
      include: [
        {
          model: QuestionSet,
          as: 'questionSet', // ensure your associations match your model definitions
          include: [
            {
              model: Question,
              as: 'questions',
              include: [
                {
                  model: Choice,
                  as: 'choices'
                  // Note: Make sure to exclude 'is_correct' if you want to prevent cheating!
                }
              ]
            }
          ]
        }
      ]
    });

    if (!session) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Game session not found.'
        }
      });
    }

    // 2. Return the questions payload
    return res.status(200).json({
      status: 'success',
      data: {
        session_id: session.id,
        questions: session.questionSet.questions
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;