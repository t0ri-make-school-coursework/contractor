const express = require('express')
const app = express()
const mongoose = require('mongoose');


var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/rotten-potatoes');


app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
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
  movieTitle: String
});
