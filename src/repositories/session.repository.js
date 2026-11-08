const { GameSession, QuestionSet, Question, Choice } = require('../models');

function findSessionWithQuestions(sessionId) {
  return GameSession.findByPk(sessionId, {
    include: [
      {
        model: QuestionSet,
        as: 'questionSet',
        include: [
          {
            model: Question,
            as: 'questions',
            include: [
              {
                model: Choice,
                as: 'choices',
                attributes: { exclude: ['is_correct'] } // Prevents players from cheating
              }
            ]
          }
        ]
      }
    ]
  });
}

module.exports = { findSessionWithQuestions };

const { GameSession } = require('../models');

function create(data) {
  return GameSession.create(data);
}

function findByCode(code) {
  return GameSession.findOne({ where: { join_pin: code } });
}

function update(session, changes) {
  return session.update(changes);
}

module.exports = { create, findByCode, update };