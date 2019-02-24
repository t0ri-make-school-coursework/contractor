const Project = require("../models/project");
const Comment = require('../models/comment');


module.exports = function(app) {

    app.get('/', (req, res) => {
        Project.find()
            .then(projects => {
                res.render('projects-index', {
                    projects: projects
                });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // CREATE
    app.post('/projects', (req, res) => {
        console.log(req.body)
        Project.create(req.body).then((project) => {
            console.log(project);
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // NEW
    app.get('/projects/new', (req, res) => {
        res.render('projects-new', {});
    })

    // SHOW
    app.get('/projects/:id', (req, res) => {
      // find project
      Project.findById(req.params.id).then(project => {
          // fetch its comments
          Comment.find({ projectId: req.params.id }).then(comments => {
            // respond with the template with both values
            res.render('projects-show', { project: project, comments: comments })
          })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
  });


    // CREATE
    app.post('/projects', (req, res) => {
        Project.create(req.body).then((project) => {
            console.log(project)
            res.redirect(`/projects/${project._id}`) // Redirect to projects/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // EDIT
    app.get('/projects/:id/edit', (req, res) => {
        Project.findById(req.params.id, function(err, project) {
            res.render('projects-edit', {
                project: project
            });
        })
    })

    // UPDATE
    app.put('/projects/:id', (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body)
            .then(project => {
                res.redirect(`/projects/${project._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/projects/:id', function(req, res) {
        console.log("DELETE project")
        Project.findByIdAndRemove(req.params.id).then((project) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

     // API
     app.get('/api/projects', (req, res) => {
        Project.find()
            .then(projects => {
                res.json({ projects: projects });
            })
            .catch(err => {
                console.log(err);
            })
    })
}
