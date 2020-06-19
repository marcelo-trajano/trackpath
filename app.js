const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyparser = require(`body-parser`);
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require(`path`);
const project = require(`./routes/project`);
const feature = require(`./routes/feature`);
const session = require("express-session");
const flash = require("connect-flash");
const StatusProject = require(`./models/StatusProject`);
const Project = require(`./models/Project`);
const FeatureStatus = require(`./models/FeatureStatus`);
const SERVER_PORT = 8787;

app.use(
  session({ secret: "keyboardCat", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use(function (req, res, next) {
  console.log("ACESSANDO MIDDLEWARE");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

app.engine(
  `handlebars`,
  handlebars({
    defaultLayout: `main`,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set(`view engine`, `handlebars`);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, `public`)));
app.use(`/project`, project);
app.use(`/feature`, feature);

app.get("/", function (req, res) {
  res.render(`index`);
});

app.get("/css", function (req, res) {
  res.render(`teste_css`);
});

app.get(`/api`, (req, res) => {
  StatusProject.findAll(async function (results) {
    res.send(results);
  });
});

app.get(`/api/getActiveProjects`, (req, res) => {
  Project.findAll(async function (results) {
    res.send(results);
  });
});

app.get(`/api/getFeatureStatus`, (req, res) => {
  FeatureStatus.findAll(async function (results) {
    res.send(results);
  });
});

app.listen(SERVER_PORT, function () {
  console.log("SERVIDOR STARTED!");
});
