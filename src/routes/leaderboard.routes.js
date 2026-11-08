const { Router } = require('express');
const router = Router();

// GET /api/v1/sessions/:session_id/leaderboard
router.get('/:session_id/leaderboard', async (req, res, next) => {
  try {
    const { session_id } = req.params;

    // TODO: Query your database (runs table joined with players) 
    // ordered by final_score DESC for the given session_id
    
    // Example ranked leaderboard response data:
    const rankings = [
      {
        rank: 1,
        player_id: 2,
        player_name: "Kier",
        final_score: 1632,
        remaining_energy: 7,
        status: "completed"
      },
      {
        rank: 2,
        player_id: 5,
        player_name: "Mark",
        final_score: 1250,
        remaining_energy: 4,
        status: "completed"
      }
    ];

    res.status(200).json({
      status: 'success',
      session_id: parseInt(session_id),
      total_rankings: rankings.length,
      data: rankings
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;