const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
const auth = require('./api/middleware/auth');
require('dotenv').config({
	path: './config/index.env',
});
//jade configuration for forgot password layout
//app.set('view engine', 'jade');
// api doc configuration
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.static('client/build'));

// connect db

// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(cors());

// ***** ROUTES *****
// ***** API Documentation *****
// app.get('/', function(req, res) {
//     res.render('public/apidoc/index.html');
// });

app.use('/api/patient', auth, require('./api/routes/patient.route'));
app.use('/api/appointment', auth, require('./api/routes/appointment.route'));

app.use('/api/maladie', auth, require('./api/routes/maladie.route'));
app.use('/api/invoice', auth, require('./api/routes/invoice.route'));

app.use('/forgot', require('./api/routes/forgot.route'));
app.use('/api/user', require('./api/routes/auth.route'));
app.use(require('./api/routes/role.route'));
app.use('/api/user', auth, require('./api/routes/user.route'));

// serve static assets in production

// set static folder
app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[*] Server Started on port ${PORT}`));
