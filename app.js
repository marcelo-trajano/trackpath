const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyparser = require(`body-parser`);
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require(`path`);
const session = require("express-session");
const flash = require("connect-flash");
const SERVER_PORT = process.env.PORT || 8787;
const project = require(`./routes/project`);
const feature = require(`./routes/feature`);
const admin = require(`./routes/admin`);
const bug = require(`./routes/bug`);
const api = require(`./routes/api`);

app.use(
  session({ secret: "trackpath", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use((req, res, next) => {
  console.log("ACESSANDO MIDDLEWARE...");

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
app.use(`/admin`, admin);
app.use(`/bug`, bug);
app.use(`/api`, api);

app.listen(SERVER_PORT, () => {
  console.log("Server listening on port " + SERVER_PORT);
});
