const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const FeatureStatus = require(`../models/FeatureStatus`);
let totalProjects = 0;
let totalFeatures = 0;
let totalIssuesSolved = 0;

router.get(`/`, (req, res) => {
  Project.findAll(async function (results) {
    if (!results || results !== null) {
      totalProjects = results.length;
    }
  });

  Feature.findAll(async function (features) {
    totalFeatures = 0;
    features.forEach((feature) => {
      if (feature.FeatureStatusID !== FeatureStatus.STATUS.CLOSED) {
        totalFeatures++;
      }
    });
  });

  Feature.findAll(async function (features) {
    totalIssuesSolved = 0;
    features.forEach((feature) => {
      if (feature.FeatureStatusID === FeatureStatus.STATUS.CLOSED) {
        totalIssuesSolved++;
      }
    });
  });

  res.render("admin/dashboard", {
    totalProjects: totalProjects,
    totalFeatures: totalFeatures,
    totalIssuesSolved: totalIssuesSolved,
  });
});

module.exports = router;
