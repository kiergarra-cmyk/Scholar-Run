const { Router } = require('express');
const router = Router();

// Import individual route files
const healthRoutes = require('./health.routes');
const sessionsRoutes = require('./sessions.routes');
const runsRoutes = require('./runs.routes');
const leaderboardRoutes = require('./leaderboard.routes');

// Register routes
router.use('/health', healthRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/runs', runsRoutes);
router.use('/sessions', leaderboardRoutes);

module.exports = router;