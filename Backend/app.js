const express = require('express');
const app = express();

const productRoutes = require('./routes/product');

app.use(express.json());
app.use('/api/v1', productRoutes);

module.exports = app;
