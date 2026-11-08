const { Router } = require('express');
const router = Router();

// POST /api/v1/runs/start
router.post('/start', async (req, res, next) => {
  try {
    const { session_id, player_id } = req.body;

    // Project Rule BR-01: Every run must begin at the Admin Building with 5 Energy
    res.status(201).json({
      status: 'success',
      data: {
        run_id: 101, // Database generated run ID
        session_id: session_id,
        player_id: player_id,
        starting_location: 'Admin Building',
        energy: 5,
        score: 0,
        status: 'active',
        completed_locations: 0
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/runs/answer
router.post('/answer', async (req, res, next) => {
  try {
    const { run_id, question_id, choice_id, is_timeout } = req.body;

    let isCorrect = true; // Placeholder: verify with your DB table (question_choices)
    if (is_timeout) {
      isCorrect = false;
    }

    let scoreChange = isCorrect ? 20 : 0;     // Correct answer awards 20 points[cite: 2]
    let energyChange = isCorrect ? 0 : -1;    // Incorrect answer reduces Energy by 1[cite: 2]

    let currentEnergy = 4; // Simulated updated energy after penalty
    let currentScore = 80; // Simulated updated score
    let runStatus = 'active';

    // If Energy reaches 0, the run immediately ends[cite: 2]
    if (currentEnergy <= 0) {
      currentEnergy = 0;
      runStatus = 'lost';
    }

    res.status(200).json({
      status: 'success',
      data: {
        run_id,
        is_correct: isCorrect,
        is_timeout: !!is_timeout,
        score_change: scoreChange,
        energy_change: energyChange,
        current_energy: currentEnergy,
        current_score: currentScore,
        run_status: runStatus
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/runs/choose-location
router.post('/choose-location', async (req, res, next) => {
  try {
    const { run_id, next_location_id } = req.body;

    // BR-04: A player cannot return to a location already completed in the current run[cite: 9]
    // TODO: Verify in database (run_locations table) that next_location_id hasn't been completed yet.

    res.status(200).json({
      status: 'success',
      message: 'Location selected successfully',
      data: {
        run_id,
        current_location_id: next_location_id,
        completed_locations_count: 3 // Example progress (out of 6 required locations)[cite: 2]
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/runs/complete
router.post('/complete', async (req, res, next) => {
  try {
    const { run_id } = req.body;

    // Example final state calculation based on specs:
    const baseScore = 960;       // Accumulated points
    const remainingEnergy = 7;   // Remaining energy (Multiplier: x1.7)[cite: 3]
    const energyMultiplier = 1.7; // From the remaining energy multiplier table[cite: 3]
    
    const finalScore = Math.round(baseScore * energyMultiplier); // e.g., 1632[cite: 3]

    // BR-05 / BR-07: Successful run after 6 locations, final score recorded to leaderboard[cite: 4, 8]
    res.status(200).json({
      status: 'success',
      message: 'Run successfully completed!',
      data: {
        run_id,
        base_score: baseScore,
        remaining_energy: remainingEnergy,
        multiplier: energyMultiplier,
        final_score: finalScore,
        status: 'completed'
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;