const { Router } = require('express');
const sessionController = require('../controllers/session.controller');
const playerController = require('../controllers/player.controller');
const rules = require('../validators/session.validator');
const validate = require('../middlewares/validate');
const sessionsRouter = require('./session.routes');

const router = Router();

router.post('/', requireUser('HOST', 'ADMIN'), rules.createRules, validate, sessionController.create);
router.get('/:code', rules.codeParam, validate, sessionController.get);
router.patch('/:code', requireUser('HOST', 'ADMIN'), rules.statusRules, validate, sessionController.changeStatus);

// Players are a part of a session, so their routes sit nested under it
router.post('/:code/players', requireUser(), rules.joinRules, validate, playerController.join);

module.exports = router;