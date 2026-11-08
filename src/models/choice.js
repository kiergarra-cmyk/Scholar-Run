module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('Choice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    choice_text: { type: DataTypes.STRING, allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'choices',
    timestamps: true,
    underscored: true
  });
  return Choice;
};