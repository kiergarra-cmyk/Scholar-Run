const { TournamentSession, Host, SessionPlayer, Run } = require('../models');

async function getTournamentResults(req, res) {
  try {
    // Optional: Verify Hub API Key header if required by your project spec
    const apiKey = req.headers['x-hub-key'];
    if (apiKey !== process.env.HUB_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }

    // Fetch closed/completed tournament sessions with related data
    const results = await TournamentSession.findAll({
      where: { status: 'CLOSED' },
      include: [
        { model: Host, attributes: ['host_id'] },
        { model: SessionPlayer }
      ]
    });

    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getTournamentResults };

module.exports = { getResults };
