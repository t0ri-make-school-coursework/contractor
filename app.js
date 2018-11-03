// INITIALIZE LIBRARIES
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const Review = require('./models/review');
const Comment = require('./models/comment');


const app = express();

// CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ROUTES
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

// SERVER
app.listen(port);

module.exports = app
