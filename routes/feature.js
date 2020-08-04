const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const Feature = require(`../models/Feature`);
const StatusProgress = require(`../models/StatusProgress`);
const FeatureStatus = require(`../models/FeatureStatus`);
const moment = require("moment");
const { isAuthenticated, isAdmin } = require(`../helpers/permissions`);
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const FileUpload = require("../models/FileUpload");

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
        if (feature.FeatureStatusID === FeatureStatus.STATUS.IN_PROGRESS) {
          listInProgress.push(feature);
        }
        if (feature.FeatureStatusID === FeatureStatus.STATUS.TO_BE_TESTED) {
          listInTest.push(feature);
        }
        if (feature.FeatureStatusID === FeatureStatus.STATUS.OPEN) {
          listOpen.push(feature);
        }
        if (feature.FeatureStatusID === FeatureStatus.STATUS.CLOSED) {
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
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    fields.CreatedAt = moment().format("YYYY-MM-DD");
    fields.StatusProgressID = StatusProgress.StatusProgressValue.NOT_STARTED;

    Feature.create(fields)
      .then(async (feature) => {
        if (files !== null) {
          let upload_path = path.join(
            __dirname,
            "file_upload\\features_attachments\\"
          );

          const nameFile = `featureId_` + feature.insertId + `_`;
          upload_path += nameFile;
          upload_path += files.attachment.name;
          let file_path = upload_path.replace(/\\/g, "\\\\");

          var imageData = fs.readFileSync(files.attachment.path);
          fs.writeFileSync(upload_path, imageData);

          let saveFile = {
            name: files.attachment.name,
            file: file_path,
            feature_id: feature.insertId,
          };

          FileUpload.create(saveFile).catch((e) => {
            req.flash("error_msg", "Error: " + e);
            res.redirect(`/feature`);
          });
        }

        req.flash("success_msg", "Feature successfully added!");
        res.redirect(`/project`);
      })
      .catch((e) => {
        req.flash("error_msg", "Error: " + e);
        res.redirect(`/project`);
      });
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

  let status = "";
  if (feature.FeatureStatusID != FeatureStatus.STATUS.CLOSED) {
    status =
      "\n updated by: " +
      req.user.name +
      " on " +
      moment().format("YYYY-MM-DD HH:mm");
  } else {
    status =
      "\n closed by: " +
      req.user.name +
      " on " +
      moment().format("YYYY-MM-DD HH:mm");
  }

  feature.DescriptionFeature = feature.DescriptionFeature + status;

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

router.get(`/delete/:id`, isAdmin, (req, res) => {
  Feature.remove(req.params.id)
    .then(() => {
      req.flash("error_msg", "Feature deleted successfully!");
      res.redirect(`/feature`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/feature`);
    });
});

module.exports = router;
