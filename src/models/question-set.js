module.exports = (sequelize, DataTypes) => {
  const QuestionSet = sequelize.define('QuestionSet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }
  }, {
    tableName: 'question_sets',
    timestamps: true,
    underscored: true
  });
  return QuestionSet;
};