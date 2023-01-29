const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./Route');
// Import routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');


require('./db/connection');
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use(cors());
// Parse incoming request data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '100mb'}));

app.use('/api/v1', routes);
// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);


app.listen(PORT, () => {
    console.log(`app is listening in the port ${PORT}`)
});