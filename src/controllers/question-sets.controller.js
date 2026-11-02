const { QuestionSet } = require('../models');

exports.createQuestionSet = async (req, res, next) => {
  try {
    // Extract user ID dynamically from the authenticated request (e.g., req.user.id or req.userId)
    const userId = req.user?.id || req.userId;

    // Combine the request body data with the logged-in user's ID
    const questionSetData = {
      ...req.body,
      userId: userId, // Associates the question set with whoever is currently logged in
    };

    const newQuestionSet = await QuestionSet.create(questionSetData);
    return res.status(201).json(newQuestionSet);
  } catch (error) {
    next(error);
  }
};
// 2. Get all question sets
exports.getAllQuestionSets = async (req, res, next) => {
  try {
    const questionSets = await QuestionSet.findAll();
    return res.status(200).json(questionSets);
  } catch (error) {
    next(error);
  }
};