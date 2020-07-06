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
  const bug = {
    Title: req.body.title,
    Summary: req.body.Summary,
    EstimatedHours: req.body.estimatedTime,
    DeliveryDate: req.body.DeliveryDate,
    CreatedAt: moment().format("YYYY-MM-DD"),
    ProjectID: req.body.projectID,
    StatusID: req.body.featureStatus,
    SeverityID: req.body.selectSeverity,
    PriorityID: req.body.selectPriority,
  };

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
  let bug = req.body;

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
