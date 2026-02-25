const express = require('express');
const app = express();
const errorMiddleware = require("./middlewares/error");
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');

// 🔥 ADD THIS LINE
app.set('query parser', 'extended');

app.use(express.json());
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);

// must be last
app.use(errorMiddleware);

module.exports = app;
