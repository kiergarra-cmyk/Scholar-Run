module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: { type: DataTypes.INTEGER, allowNull: false },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    choice_id: { type: DataTypes.INTEGER, allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {
    tableName: 'answers',
    timestamps: true,
    underscored: true
  });
  return Answer;
};