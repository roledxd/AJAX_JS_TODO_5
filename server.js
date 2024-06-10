const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const db = require("./models/index");
const paginate = require("./pagination");
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 3;

  const [posts, totalPosts] = await Promise.all([
    db.Post.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
    }),
    db.Post.count(),
  ]);

  const pages = Math.ceil(totalPosts / perPage);
  const pagination = paginate(page, pages, perPage);

  res.render("index.njk", { posts, pagination });
});

app.get("/answer", (req, res) => {
  console.log(req.query);
  res.render("answer.njk", req.query);
});
app.post("/answer", (req, res) => {
  console.log(req.body);
  res.render("answer.njk", { ...req.query, ...req.body });
});

app.use("/posts", require("./controllers/postController"));
app.use("/", require("./controllers/authController"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
