const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { getTask, setTask, updateTask, deleteTask } = require('../controllers/taskControllers')

router.get('/', protect, getTask)

router.post('/', protect, setTask)

router.put('/:id', protect, updateTask)

router.delete('/:id', protect, deleteTask)

module.exports = router;