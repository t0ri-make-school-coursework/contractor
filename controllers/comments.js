const Comment = require('../models/comment');

module.exports = (app) => {

    app.post('/projects/comments', (req, res) =>  {
        Comment.create(req.body).then(comment => {
            res.redirect(`/projects/${comment.projectID}`);
            console.log(comment);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    app.delete('/projects/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/projects/${comment.projectId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
