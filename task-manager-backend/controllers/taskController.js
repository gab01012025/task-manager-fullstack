const Task = require("../models/taskModel");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar tarefas." });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({
      title,
      userId: req.user.id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar tarefa." });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar tarefa." });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    res.json({ message: "Tarefa deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar tarefa." });
  }
};