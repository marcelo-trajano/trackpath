const express = require(`express`);
const router = express.Router();
const Bug = require(`../models/Bug`);
const Severity = require(`../models/Severity`);
const Priority = require(`../models/Priority`);
const Project = require(`../models/Project`);
const moment = require("moment");

router.get(`/add/:projectID`, (req, res) => {
  Project.findByPK(req.params.projectID, (result) => {
    res.render(`bug/addBug`, { project: result });
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

  Bug.create(bug, (result) => {
    req.flash("success_msg", "Issue successfully added!");
    res.redirect(`/project`);
  });
});

router.get(`/`, (req, res) => {
  res.render(`bug/bugs`);
});

router.get(`/solveIssue/:bugID`, (req, res) => {
  Bug.findByPK(req.params.bugID, (bug) => {
    Project.findByPK(bug.ProjectID, (project) => {
      bug.project = project;
      res.render(`bug/solveIssue`, { bug: bug });
    });
  });
});

router.post(`/solveIssue`, (req, res) => {
  let bug = req.body;

  Bug.updateSolveIssue(bug, (result) => {
    req.flash("success_msg", "Bug successfully updated!");
    res.redirect(`/bug`);
  });
});

router.get(`/getSeverity`, (req, res) => {
  Severity.findAll((results) => {
    res.send(results);
  });
});

router.get(`/getPriority`, (req, res) => {
  Priority.findAll((results) => {
    res.send(results);
  });
});

router.get(`/getBugsByProject/:id`, (req, res) => {
  Bug.getBugsByProject(req.params.id, (results) => {
    res.send(results);
  });
});

module.exports = router;
