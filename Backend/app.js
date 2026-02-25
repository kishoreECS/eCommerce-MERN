const express = require('express');
const app = express();
const errorMiddleware = require("./middlewares/error");
const productRoutes = require('./routes/product');

// 🔥 ADD THIS LINE
app.set('query parser', 'extended');

app.use(express.json());
app.use('/api/v1', productRoutes);

// must be last
app.use(errorMiddleware);

module.exports = app;
