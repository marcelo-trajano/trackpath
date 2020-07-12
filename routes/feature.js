const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const StatusProgress = require(`../models/StatusProgress`);
const FeatureStatus = require(`../models/FeatureStatus`);
const moment = require("moment");
const { isAuthenticated, isAdmin } = require(`../helpers/permissions`);

router.get(`/`, isAuthenticated, (req, res) => {
  res.render("feature/feature");
});

router.get(`/getFeaturesByProject/:id`, isAuthenticated, (req, res) => {
  Feature.findFeaturesByProjects(req.params.id)
    .then((features) => {
      let listInProgress = [];
      let listInTest = [];
      let listOpen = [];
      let listClosed = [];

      features.forEach((feature) => {
        if (feature.FeatureStatusID === 2) {
          listInProgress.push(feature);
        }
        if (feature.FeatureStatusID === 3) {
          listInTest.push(feature);
        }
        if (feature.FeatureStatusID === 1) {
          listOpen.push(feature);
        }
        if (feature.FeatureStatusID === 4) {
          listClosed.push(feature);
        }
      });

      features = [];

      features = features
        .concat(listInProgress)
        .concat(listInTest)
        .concat(listOpen)
        .concat(listClosed);

      res.send(features);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

router.get(`/new/:id`, isAuthenticated, (req, res) => {
  Project.findByPK(req.params.id)
    .then((project) => {
      res.render("feature/newFeature", { project: project });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

router.post(`/new`, isAuthenticated, (req, res) => {
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

router.get(`/solveIssue/:id`, isAuthenticated, (req, res) => {
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

router.post(`/solveIssue`, isAuthenticated, (req, res) => {
  const feature = {
    ID: req.body.featureID,
    DescriptionFeature: req.body.description,
    FeatureStatusID: req.body.featureStatus,
    StatusProgressID: req.body.Progress,
  };

  feature.DescriptionFeature =
    feature.DescriptionFeature +
    "\n updated by: " +
    req.user.name +
    " on " +
    moment().format("YYYY-MM-DD HH:mm");

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
