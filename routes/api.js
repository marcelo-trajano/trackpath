const express = require(`express`);
const router = express.Router();
const StatusProject = require(`../models/StatusProject`);
const Project = require(`../models/Project`);
const FeatureStatus = require(`../models/FeatureStatus`);
const StatusProgress = require(`../models/StatusProgress`);
const Severity = require(`../models/Severity`);
const Priority = require(`../models/Priority`);
const Bug = require(`../models/Bug`);

router.get(`/getStatusProject`, (req, res) => {
  StatusProject.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getActiveProjects`, (req, res) => {
  Project.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getFeatureStatus`, (req, res) => {
  FeatureStatus.findAll()
    .then((Status) => {
      res.send(Status);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getStatusProgress`, (req, res) => {
  StatusProgress.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getSeverity`, (req, res) => {
  Severity.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getPriority`, (req, res) => {
  Priority.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

router.get(`/getBugsByProject/:id`, (req, res) => {
  Bug.getBugsByProject(req.params.id)
    .then((results) => {
      let listInProgress = [];
      let listInTest = [];
      let listOpen = [];
      let listClosed = [];

      results.forEach((bug) => {
        if (bug.StatusID === 2) {
          listInProgress.push(bug);
        }
        if (bug.StatusID === 3) {
          listInTest.push(bug);
        }
        if (bug.StatusID === 1) {
          listOpen.push(bug);
        }
        if (bug.StatusID === 4) {
          listClosed.push(bug);
        }
      });

      results = [];

      results = results
        .concat(listInProgress)
        .concat(listInTest)
        .concat(listOpen)
        .concat(listClosed);

      res.send(results);
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR" + err);
    });
});

module.exports = router;
