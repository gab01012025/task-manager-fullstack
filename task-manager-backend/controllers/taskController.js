const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};
