const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);
const moment = require(`moment`);

router.get(`/`, (req, res) => {
  Project.findAll()
    .then((projects) => {
      res.render("project/project", { Projects: projects });
    })
    .catch((e) => {
      req.flash("error_msg", "ERROR" + e);
    });
});

router.get(`/new`, (req, res) => {
  res.render("project/newProject");
});

router.post(`/new`, (req, res) => {
  let errors = [];
  let project = req.body;

  if (moment(req.body.startDate).isAfter(req.body.endDate)) {
    errors.push({ texto: "Start Date must be less than End Date!" });
  }

  if (req.body.pName === "") {
    errors.push({ texto: "Invalid input" });
  }

  if (errors.length > 0) {
    res.render("project/newProject", {
      erros: errors,
    });
  } else {
    if (!project.id || project.id === null || project.id === undefined) {
      Project.create(project)
        .then(() => {
          req.flash("success_msg", "Project added successfully!");
          res.redirect(`/project`);
        })
        .catch((e) => {
          req.flash("error_msg", "Error: " + e);
          res.redirect(`/project`);
        });
    } else {
      Project.update(project)
        .then(() => {
          req.flash("success_msg", "Project modified successfully!");
          res.redirect(`/project`);
        })
        .catch((e) => {
          req.flash("error_msg", "Error: " + e);
          res.redirect(`/project`);
        });
    }
  }
});

router.get(`/edit/:id`, (req, res) => {
  Project.findByPK(req.params.id)
    .then((project) => {
      res.render("project/newProject", {
        id: project.ID,
        name: project.NameProject,
        startDate: project.StartDate,
        endDate: project.EndDate,
        statusId: project.StatusID,
        description: project.DescriptionProject,
      });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/project`);
    });
});

router.post(`/delete`, (req, res) => {
  Project.remove(req.body.id)
    .then(() => {
      req.flash("error_msg", "Project has been deleted!");
      res.redirect(`/project`);
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/project`);
    });
});

module.exports = router;
