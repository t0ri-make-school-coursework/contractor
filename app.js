const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [{
//         title: "Bad Review",
//         movieTitle: "Films"
//     },
//     {
//         title: "Okay Movie",
//         movieTitle: "Titanic"
//     }
// ]

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});
