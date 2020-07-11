const express = require(`express`);
const router = express.Router();
const Bug = require(`../models/Bug`);
const Project = require(`../models/Project`);
const moment = require("moment");

router.get(`/`, (req, res) => {
  res.render(`bug/bugs`);
});

router.get(`/add/:projectID`, (req, res) => {
  Project.findByPK(req.params.projectID)
    .then((bug) => {
      res.render(`bug/addBug`, { project: bug });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/bug`);
    });
});

router.post(`/add`, (req, res) => {
  const bug = req.body;
  bug.CreatedAt = moment().format("YYYY-MM-DD");

  Bug.create(bug)
    .then(() => {
      req.flash("success_msg", "Issue successfully added!");
      res.redirect(`/project`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/project`);
    });
});

router.get(`/solveIssue/:bugID`, (req, res) => {
  Bug.findByPK(req.params.bugID)
    .then((bug) => {
      Project.findByPK(bug.ProjectID)
        .then((project) => {
          bug.project = project;
          res.render(`bug/solveIssue`, { bug: bug });
        })
        .catch((e) => {
          req.flash("error_msg", "Error: " + e);
          res.redirect(`/bug`);
        });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/bug`);
    });
});

router.post(`/solveIssue`, (req, res) => {
  const bug = req.body;

  Bug.updateSolveIssue(bug)
    .then(() => {
      req.flash("success_msg", "Issue successfully updated!");
      res.redirect(`/bug`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/bug`);
    });
});

module.exports = router;
