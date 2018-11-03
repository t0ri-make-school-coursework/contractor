const Comment = require('../models/comment');


module.exports = (app) => {

    // CREATE Comment
    app.post('/reviews/comments', (req, res) =>  {
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewID}`);
            console.log(comment);
        }).catch((err) => {
            console.log(err.message);
        });
    });

}
