const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);

module.exports = router;

const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

router.delete('/:id', auth, deleteTask);

