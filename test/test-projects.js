const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Project = require('../models/project');

const sampleProject = {
    "title": "Project Title",
    "shortdesc": "This is a short description of a project.",
    "description": "This is a long description of a project.  This is a long description of a project.  This is a long description of a project.  This is a long description of a project.  "
    "github": "http://www.github.com",
    "live": "http://www.live.com"
}

chai.use(chaiHttp);

describe('Projects', () => {

after(() => {
    Project.deleteMany({
        title: 'Project Title'
    }).exec((err, projects) => {
        console.log(projects)
        projects.remove();
    })
});

// TEST INDEX
it('should index ALL projects on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});


// TEST NEW
// TEST CREATE
it('should create a SINGLE project on /projects POST', (done) => {
    chai.request(server)
        .post('/projects')
        .send(sampleProject)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
});
// TEST SHOW
// TEST SHOW
it('should show a SINGLE project on /projects/<id> GET', (done) => {
    var project = new Project(sampleProject);
    project.save((err, data) => {
        chai.request(server)
            .get(`/projects/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});

// TEST EDIT
it('should edit a SINGLE project on /projects/<id>/edit GET', (done) => {
    var project = new Project(sampleProject);
    project.save((err, data) => {
        chai.request(server)
            .get(`/projects/${data._id}/edit`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});
// TEST UPDATE
it('should update a SINGLE project on /projects/<id> PUT', (done) => {
    var project = new Project(sampleProject);
    project.save((err, data) => {
        chai.request(server)
            .put(`/projects/${data._id}?_method=PUT`)
            .send({
                'title': 'Updating the title'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});
// TEST DELETE
it('should delete a SINGLE project on /projects/<id> DELETE', (done) => {
    var project = new Project(sampleProject);
    project.save((err, data) => {
        chai.request(server)
            .delete(`/projects/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});
});
