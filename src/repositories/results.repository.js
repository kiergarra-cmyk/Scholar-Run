const { QueryTypes } = require('sequelize');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT s.join_pin AS session_code, s.started_at, s.ended_at,
           u.school_id, p.nickname, p.score,
           (SELECT COUNT(*) FROM answers a WHERE a.player_id = p.player_id)
           = (SELECT COUNT(*) FROM questions q WHERE q.set_id = s.set_id) AS completed
    FROM game_sessions s
    JOIN players p ON p.session_id = s.session_id
    JOIN users u ON u.user_id = p.user_id
    WHERE s.status = 'CLOSED'
      AND (CAST(:since AS timestamptz) IS NULL OR s.ended_at > CAST(:since AS timestamptz))
    ORDER BY s.ended_at, p.score DESC
  `;
  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}

module.exports = {
  findFinishedGamePlayers,
};