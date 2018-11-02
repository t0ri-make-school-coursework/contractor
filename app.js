// INITIALIZE LIBRARIES
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// CONNECT TO DB
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ROUTES
const reviews = require('./controllers/reviews')(app);

// SERVER
app.listen(3000);

module.exports = app
