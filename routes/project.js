const express = require(`express`);
const router = express.Router();
const Project = require(`../models/Project`);

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

  if (req.body.pName === "") {
    errors.push({ texto: "Invalid input" });
  }

  if (errors.length > 0) {
    res.render("project/newProject", {
      erros: errors,
    });
  } else {
    const project = {
      ID: req.body.ID,
      NameProject: req.body.pName,
      StartDate: req.body.startDate,
      EndDate: req.body.endDate,
      DescriptionProject: req.body.pDescription,
      StatusID: req.body.pPriority,
    };

    if (!project.ID || project.ID === null || project.ID === undefined) {
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
        ID: project.ID,
        NameProject: project.NameProject,
        StartDate: project.StartDate,
        EndDate: project.EndDate,
        StatusID: project.StatusID,
        DescriptionProject: project.DescriptionProject,
      });
    })
    .catch((e) => {
      req.flash("error_msg", "Error: " + e);
      res.redirect(`/project`);
    });
});

router.post(`/delete`, (req, res) => {
  Project.remove(req.body.ID)
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
