const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./admin/routes/adminRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Start server
app.listen(port, () => {
  console.log(`apnaPandit server is running on http://localhost:${port}`);
});
