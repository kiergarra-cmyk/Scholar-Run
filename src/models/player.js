module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: DataTypes.INTEGER, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'players',
    timestamps: true,
    underscored: true
  });
  return Player;
};