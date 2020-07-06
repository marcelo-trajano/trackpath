const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const StatusProgress = require(`../models/StatusProgress`);
const moment = require("moment");

router.get(`/`, (req, res) => {
  res.render("feature/feature");
});

router.get(`/getFeaturesByProject/:id`, (req, res) => {
  Feature.findFeaturesByProjects(req.params.id)
    .then((features) => {
      res.send(features);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

router.get(`/new/:id`, (req, res) => {
  Project.findByPK(req.params.id)
    .then((project) => {
      res.render("feature/newFeature", { project: project });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
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

  Feature.create(feature)
    .then(() => {
      req.flash("success_msg", "Feature successfully added!");
      res.redirect(`/project`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/project`);
    });
});

router.get(`/solveIssue/:id`, (req, res) => {
  Feature.findByPK(req.params.id)
    .then((feature) => {
      Project.findByPK(feature.ProjectID)
        .then((project) => {
          feature.project = project;
          res.render("feature/solveIssue", { feature: feature });
        })
        .catch((e) => {
          req.flash("error_msg", "Error: " + e);
          res.redirect(`/feature`);
        });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

router.post(`/solveIssue`, (req, res) => {
  const feature = {
    ID: req.body.featureID,
    DescriptionFeature: req.body.description,
    FeatureStatusID: req.body.featureStatus,
    StatusProgressID: req.body.Progress,
  };

  Feature.updateSolveIssue(feature)
    .then(() => {
      req.flash("success_msg", "Feature successfully updated!");
      res.redirect(`/feature`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

module.exports = router;
