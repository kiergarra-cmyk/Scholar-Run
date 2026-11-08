const { Player } = require('../models');

function findSeat(sessionId, userId) {
  return Player.findOne({ where: { session_id: sessionId, user_id: userId } });
}

function countBySession(sessionId) {
  return Player.count({ where: { session_id: sessionId } });
}

function markSeen(player) {
  return player.update({ last_seen_at: new Date() });
}

function create(data) {
  return Player.create(data);
}

module.exports = { findSeat, countBySession, markSeen, create };