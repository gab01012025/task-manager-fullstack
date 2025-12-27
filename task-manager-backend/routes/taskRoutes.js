const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { validate, createTaskSchema, updateTaskSchema } = require('../middleware/validation');

router.use(auth);

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getAllTasks);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
