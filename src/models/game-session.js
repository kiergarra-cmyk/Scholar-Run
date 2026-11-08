module.exports = (sequelize, DataTypes) => {
  const GameSession = sequelize.define('GameSession', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    host_id: { type: DataTypes.INTEGER, allowNull: false },
    join_pin: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.STRING, defaultValue: 'available' },
    max_players: { type: DataTypes.INTEGER, defaultValue: 10 },
    question_set_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'game_sessions',
    timestamps: true,
    underscored: true
  });
  return GameSession;
};