const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

async function getQuestions(req, res) {
  const { id } = matchedData(req);
  const session = await sessionService.getSessionQuestions(id);

  res.status(200).json({
    status: 'success',
    data: {
      session_id: session.id,
      questions: session.questionSet.questions
    }
  });
}

module.exports = { getQuestions };