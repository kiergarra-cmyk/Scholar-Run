module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question_set_id: { type: DataTypes.INTEGER, allowNull: false },
    prompt: { type: DataTypes.TEXT, allowNull: false }
  }, {
    tableName: 'questions',
    timestamps: true,
    underscored: true
  });
  return Question;
};