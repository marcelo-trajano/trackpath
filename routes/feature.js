const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const StatusProgress = require(`../models/StatusProgress`);
const FeatureStatus = require(`../models/FeatureStatus`);
const moment = require("moment");

router.get(`/`, (req, res) => {
  res.render("feature/feature");
});

router.get(`/getFeaturesByProject/:id`, (req, res) => {
  Feature.findFeaturesByProjects(req.params.id, function (results) {
    let features = [];
    results.forEach((feature) => {
      if (feature.FeatureStatusID !== FeatureStatus.STATUS.CLOSED) {
        features.push(feature);
      }
    });
    res.send(features);
  });
});

router.get(`/new/:id`, (req, res) => {
  Project.findByPK(req.params.id, function (result) {
    res.render("feature/newFeature", { project: result });
  });
});

router.post(`/new`, (req, res) => {
  const feature = {
    ID: req.body.id,
    TitleFeature: req.body.titleFeature,
    DescriptionFeature: req.body.description,
    EstimatedTime: req.body.estimatedTime,
    DeliveryDate: req.body.deliveryDate,
    CreatedAt: moment().format("YYYY-MM-DD"),
    ProjectID: req.body.projectID,
    FeatureStatusID: req.body.featureStatus,
    StatusProgressID: StatusProgress.StatusProgressValue.NOT_STARTED,
  };

  Feature.create(feature, function () {
    req.flash("success_msg", "Feature successfully added!");
    res.redirect(`/project`);
  });
});

router.get(`/solveIssue/:id`, (req, res) => {
  Feature.findByPK(req.params.id, function (feature) {
    Project.findByPK(feature.ProjectID, function (project) {
      feature.project = project;
      res.render("feature/solveIssue", { feature: feature });
    });
  });
});

router.post(`/solveIssue`, (req, res) => {
  const feature = {
    ID: req.body.featureID,
    DescriptionFeature: req.body.description,
    FeatureStatusID: req.body.featureStatus,
    StatusProgressID: req.body.Progress,
  };

  Feature.updateSolveIssue(feature, function (result) {
    req.flash("success_msg", "Feature successfully updated!");
    res.redirect(`/feature`);
  });
});

module.exports = router;
