const Task = require("../models/task");
const { ApiError } = require("../middleware/errorHandler");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      userId: req.userId,
      completed: false
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      throw new ApiError(404, "Tarefa não encontrada");
    }
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!deletedTask) {
      throw new ApiError(404, "Tarefa não encontrada");
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = exports.getAllTasks;
