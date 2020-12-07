const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const auth = require('./api/middleware/auth');

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// connect db
app.use(express.static('client/build'));

app.use('/api/patient', auth, require('./api/routes/patient.route'));
app.use('/api/appointment', auth, require('./api/routes/appointment.route'));

app.use('/api/maladie', auth, require('./api/routes/maladie.route'));
app.use('/api/invoice', auth, require('./api/routes/invoice.route'));

app.use('/forgot', require('./api/routes/forgot.route'));
app.use('/api/user', require('./api/routes/auth.route'));
app.use('/api/user', auth, require('./api/routes/user.route'));
app.use('/api/fileUpload', require('./api/routes/fileUpload.route'));
// serve static assets in production
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// set static folder

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[*] Server Started on port ${PORT}`));
