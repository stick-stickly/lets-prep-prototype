const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// View engine & static assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Session for ephemeral in-memory storage (dev-only)
app.use(
  session({
    secret: "dev-only-demo-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }, // 30 minutes
  })
);

// helpers
function getUserData(req) {
  if (!req.session.userData) req.session.userData = {};
  return req.session.userData;
}

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/step1", (req, res) => {
  const userData = getUserData(req);
  res.render("step1", { userData });
});

app.post("/step1", (req, res) => {
  const userData = getUserData(req);
  const adults = parseInt(req.body.adults || "0", 10);
  const children = parseInt(req.body.children || "0", 10);
  userData.adults = Number.isNaN(adults) ? 0 : adults;
  userData.children = Number.isNaN(children) ? 0 : children;
  res.redirect("/step2");
});

app.get("/step2", (req, res) => {
  const userData = getUserData(req);
  res.render("step2", { userData });
});

app.post("/step2", (req, res) => {
  const userData = getUserData(req);
  userData.city = (req.body.city || "").trim();
  userData.country = (req.body.country || "").trim();
  res.redirect("/step3");
});

app.get("/step3", (req, res) => {
  const userData = getUserData(req);
  res.render("step3", { userData });
});

app.post("/step3", (req, res) => {
  const userData = getUserData(req);
  let risks = req.body.risks || [];
  if (!Array.isArray(risks)) risks = [risks];
  userData.risks = risks;
  res.redirect("/summary");
});

app.get("/summary", (req, res) => {
  const userData = getUserData(req);
  const totalPeople = (userData.adults || 0) + (userData.children || 0);
  res.render("summary", { userData, totalPeople });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Let's Prep prototype running at http://localhost:${PORT}`);
});
