const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');

async function join(req, res) {
  const { code, nickname } = matchedData(req);
  const { session, player, created } = await playerService.join(code, nickname, req.user);
 
  res.status(created ? 201 : 200).json({
    player_id: player.player_id,
    nickname: player.nickname,
    score: player.score,
    rejoined: !created,
    session: {
      code: session.join_pin, status: session.status, current_position: session.current_position,
    },
  });
}

// Optional list players endpoint
async function list(req, res) {
  // Add repository lookup if needed for listing players
  res.status(200).json([]);
}

module.exports = { join, list };