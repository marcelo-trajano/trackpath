const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const FeatureStatus = require(`../models/FeatureStatus`);
const Bug = require(`../models/Bug`);

router.get(`/`, (req, res) => {
  Project.findAll(async function (results) {
    let totalProjects = 0;
    let totalFeatures = 0;
    let totalIssuesSolved = 0;
    let totalBugs = 0;
    if (!results || results !== null) {
      totalProjects = results.length;
    }
    Feature.findAll(async function (features) {
      features.forEach((feature) => {
        if (feature.FeatureStatusID === FeatureStatus.STATUS.CLOSED) {
          totalIssuesSolved++;
        } else {
          totalFeatures++;
        }
      });
      Bug.findAll(async (bugs) => {
        if (!bugs || bugs !== null) {
          totalBugs = bugs.length;
        }
        res.render("admin/dashboard", {
          totalProjects: totalProjects,
          totalFeatures: totalFeatures,
          totalIssuesSolved: totalIssuesSolved,
          totalBugs: totalBugs,
        });
      });
    });
  });
});

module.exports = router;
