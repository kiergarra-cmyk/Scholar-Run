// ONE Sequelize instance (one connection pool) for the whole API.
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Helper function to safely load models whether exported directly or via .default
const loadModel = (modelPath) => {
  const mod = require(modelPath);
  const modelFactory = typeof mod === 'function' ? mod : mod.default;
  if (typeof modelFactory !== 'function') {
    throw new TypeError(`Export from ${modelPath} is not a valid model function.`);
  }
  return modelFactory(sequelize, DataTypes);
};

// Load models safely
const GameSession = loadModel('./game-session');
const Player = loadModel('./player');
const QuestionSet = loadModel('./question-set');
const Question = loadModel('./question');
const Choice = loadModel('./choice');
const Answer = loadModel('./answer');

// Define associations
GameSession.belongsTo(QuestionSet, { foreignKey: 'question_set_id', as: 'questionSet' });
QuestionSet.hasMany(GameSession, { foreignKey: 'question_set_id', as: 'sessions' });

GameSession.hasMany(Player, { foreignKey: 'session_id', as: 'players' });
Player.belongsTo(GameSession, { foreignKey: 'session_id', as: 'session' });

QuestionSet.hasMany(Question, { foreignKey: 'question_set_id', as: 'questions' });
Question.belongsTo(QuestionSet, { foreignKey: 'question_set_id', as: 'questionSet' });

Question.hasMany(Choice, { foreignKey: 'question_id', as: 'choices' });
Choice.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

Player.hasMany(Answer, { foreignKey: 'player_id', as: 'answers' });
Answer.belongsTo(Player, { foreignKey: 'player_id', as: 'player' });

Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' });
Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

Choice.hasMany(Answer, { foreignKey: 'choice_id', as: 'answers' });
Answer.belongsTo(Choice, { foreignKey: 'choice_id', as: 'choice' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  GameSession,
  Player,
  QuestionSet,
  Question,
  Choice,
  Answer
};