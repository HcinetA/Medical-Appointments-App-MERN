const express = require('express');
const connectDB = require('./config/db');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
const auth = require('./api/middleware/auth');
require('dotenv').config({
    path: './config/index.env'
});
//jade configuration for forgot password layout
app.set('view engine', 'jade');
// api doc configuration
app.use(express.static('public/apidoc'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');

app.use(express.json());



// connect db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// ***** ROUTES *****
// ***** API Documentation *****
// app.get('/', function(req, res) {
//     res.render('public/apidoc/index.html');
// });

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/patient', auth, require('./api/routes/patient.route'));
app.use('/api/appointment', auth, require('./api/routes/appointment.route'));

app.use('/api/maladie', auth, require('./api/routes/maladie.route'));

app.use('/forgot', require('./api/routes/forgot.route'));
app.use('/api/user', require('./api/routes/auth.route'));
app.use(require('./api/routes/role.route'));
app.use('/api/user', auth, require('./api/routes/user.route'));
app.use((req, res) => {
    res.redirect('/');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[*] Server Started on port ${PORT}`));