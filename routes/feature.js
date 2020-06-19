const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const moment = require("moment");

router.get(`/`, (req, res) => {
  res.render("feature/feature");
});

router.get(`/getFeaturesByProject/:id`, (req, res) => {
  Feature.findFeaturesByProjects(req.params.id, function (results) {
    res.send(results);
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
  };

  Feature.create(feature, function () {
    req.flash("success_msg", "Feature successfully added!");
    res.redirect(`/project`);
  });
});

module.exports = router;
