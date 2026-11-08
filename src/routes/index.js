const { Router } = require('express');
const router = Router();

// Import individual route files
const healthRoutes = require('./health.routes');
const sessionsRouter = require('./session.routes');
const runsRoutes = require('./runs.routes');
const leaderboardRoutes = require('./leaderboard.routes');

// Register routes cleanly
router.use('/health', healthRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/runs', runsRoutes);
router.use('/leaderboard', leaderboardRoutes);

// ... existing setup ...
router.use(currentUser);

router.use('/question-sets', require('./question-set.routes'));
router.use('/sessions', require('./session.routes')); // <-- Add this line here

module.exports = router;
