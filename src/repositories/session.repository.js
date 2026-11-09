const { GameSession } = require('../models');

function findById(id) {
  return GameSession.findByPk(id);
}

function findByCode(code) {
  return GameSession.findOne({ where: { join_pin: code } });
}

function create(data) {
  return GameSession.create(data);
}

function update(session, changes) {
  return session.update(changes);
}

module.exports = { findById, findByCode, create, update };