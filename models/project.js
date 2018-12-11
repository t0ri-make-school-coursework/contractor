const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
  title: String,
  class: String,
  shortdesc: String,
  longdesc: String,
  repo: String,
  live: String,
  tech: String,
  image: String,
});

module.exports = Project;
