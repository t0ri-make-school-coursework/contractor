const express = require('express')
const methodOverride = require('method-override')


const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(methodOverride('_method'))




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

app.get('/reviews/:id', (req, res) => {
  res.send('I\'m a review')
});

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

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
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
