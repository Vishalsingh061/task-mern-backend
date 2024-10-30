const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

const getTask = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })
    res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter a task')
    }
    const task = await Task.create({ text: req.body.text, user: req.user.id })
    res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(400)
        throw new Error('Task not found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('You can only update your own tasks')
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(400)
        throw new Error('Task not found')
    }
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('You can only delete your own tasks')
    }

    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `${req.params.id} Task deleted` });
});

module.exports = { getTask, setTask, updateTask, deleteTask }