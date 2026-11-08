// Hub Contract rule 5: six digits. 100000 to 999999 never starts with 0.
function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function create(questionSetId, user) {
  const questionSet = await questionSetRepository.findById(questionSetId);
  if (!questionSet) {
    throw notFound('QUESTION_SET_NOT_FOUND', `No question set has the id ${questionSetId}.`);
  }
  const mayUse = questionSet.host_id === user.user_id || questionSet.is_public
    || user.role === 'ADMIN';
  if (!mayUse) throw forbidden('This question set belongs to another host.');

  // Try up to 5 times in case of a random code collision
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await sessionRepository.create({
        set_id: questionSet.set_id, host_id: user.user_id, join_pin: randomCode(),
      });
    } catch (error) {
      if (constraintOf(error) !== 'game_sessions_join_pin_key') throw error;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
}

const sessionRepository = require('../repositories/session.repository');
const questionSetRepository = require('../repositories/question-set.repository');
const { notFound, forbidden, conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

// --- Step 5.1: Create session & generate 6-digit code ---
function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function create(questionSetId, user) {
  const questionSet = await questionSetRepository.findById(questionSetId);
  if (!questionSet) {
    throw notFound('QUESTION_SET_NOT_FOUND', `No question set has the id ${questionSetId}.`);
  }
  const mayUse = questionSet.host_id === user.user_id || questionSet.is_public
    || user.role === 'ADMIN';
  if (!mayUse) throw forbidden('This question set belongs to another host.');

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await sessionRepository.create({
        set_id: questionSet.set_id, host_id: user.user_id, join_pin: randomCode(),
      });
    } catch (error) {
      if (constraintOf(error) !== 'game_sessions_join_pin_key') throw error;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
}

// --- Step 5.2: Change game status ---
const NEXT_STATUS = {
  LOBBY: ['RUNNING', 'CLOSED'],
  RUNNING: ['CLOSED'],
  CLOSED: [],
};

async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', `No game session has the code ${code}.`);
  return session;
}

async function changeStatus(code, status, user) {
  const session = await findOrFail(code);
  if (session.host_id !== user.user_id && user.role !== 'ADMIN') {
    throw forbidden('This game belongs to another host.');
  }
  if (!NEXT_STATUS[session.status].includes(status)) {
    throw conflict('INVALID_STATUS_CHANGE', `A ${session.status} game cannot become ${status}.`);
  }
  const changes = { status };
  if (status === 'RUNNING') changes.started_at = new Date();
  if (status === 'CLOSED') changes.ended_at = new Date();
  return sessionRepository.update(session, changes);
}

module.exports = { create, changeStatus, findOrFail };