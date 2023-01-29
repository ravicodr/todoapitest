const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

// Connect to the database
mongoose.connect(config.database, { useNewUrlParser: true });

// Use JSON for request bodies
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the todo routes
app.use('/api/todos', todoRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
