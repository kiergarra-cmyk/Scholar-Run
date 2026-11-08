const { GameSession, Player } = require('../models');
const sessionService = require('./session.service');
const { conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

async function findSeat(sessionId, userId) {
  return Player.findOne({ where: { session_id: sessionId, user_id: userId } });
}

async function countBySession(sessionId) {
  return Player.count({ where: { session_id: sessionId } });
}

async function markSeen(player) {
  return player.update({ last_seen_at: new Date() });
}

async function join(code, nickname, user) {
  const session = await sessionService.findOrFail(code);

  const seat = await findSeat(session.session_id, user.user_id);
  if (seat) {
    await markSeen(seat);
    return { session, player: seat, created: false };
  }

  if (session.status === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
  if (session.status !== 'LOBBY') {
    throw conflict('SESSION_NOT_JOINABLE', 'This game has already started.');
  }
  
  const seatsTaken = await countBySession(session.session_id);
  if (seatsTaken >= session.max_players) throw conflict('SESSION_FULL', 'This game is full.');

  try {
    const player = await Player.create({
      session_id: session.session_id,
      user_id: user.user_id,
      nickname,
      last_seen_at: new Date(),
    });
    return { session, player, created: true };
  } catch (error) {
    if (constraintOf(error) === 'uq_one_seat') {
      const existing = await findSeat(session.session_id, user.user_id);
      return { session, player: existing, created: false };
    }
    throw error;
  }
}

module.exports = { findSeat, countBySession, markSeen, join };
```[cite: 1]