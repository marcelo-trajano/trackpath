const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const FeatureStatus = require(`../models/FeatureStatus`);
const Bug = require(`../models/Bug`);

router.get(`/`, async (req, res) => {
  let totalProjects = 0;
  let totalFeatures = 0;
  let totalIssuesSolved = 0;
  let totalBugs = 0;
  let totalClosedBugs = 0;

  totalProjects = await Project.findAll();

  let features = await Feature.findAll();

  features.forEach((feature) => {
    if (feature.FeatureStatusID === FeatureStatus.STATUS.CLOSED) {
      totalIssuesSolved++;
    } else {
      totalFeatures++;
    }
  });

  let bugs = await Bug.findAll();

  bugs.forEach((bug) => {
    if (bug.StatusID === FeatureStatus.STATUS.CLOSED) {
      totalClosedBugs++;
    } else {
      totalBugs++;
    }
  });

  res.render("admin/dashboard", {
    totalProjects: totalProjects.length,
    totalFeatures: totalFeatures,
    totalIssuesSolved: totalIssuesSolved,
    totalBugs: totalBugs,
    totalClosedBugs: totalClosedBugs,
  });
});

module.exports = router;
