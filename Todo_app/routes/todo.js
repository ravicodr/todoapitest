const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const verifyToken = require('../middleware/verifyToken');

// Create Todo
router.post('/create', verifyToken, async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    isCompleted: req.body.isCompleted,
    createdAt: new Date()
  });

  try {
    const savedTodo = await todo.save();
    res.send(savedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Todos
router.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Todo by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update Todo by ID
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Todo by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
