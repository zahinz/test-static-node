const express = require("express");
const app = express();
const path = require("node:path");
const bodyParser = require("body-parser");
const port = 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/contact.html"));
});
app.post("/contact", function (req, res) {
  const formData = req.body;
  res.cookie("message", formData.message);
  res.redirect(`/thank-you?name=${formData.email}`);
});
app.get("/thank-you", function (req, res) {
  const name = req.query.name;
  if (!name) {
    res.redirect("/");
    return;
  }
  res.send(`<h1>Thank you - ${name}</h1>`);
});

app.get("/posts", function (req, res) {
  res.send("List of multiple posts");
});

app.get("/posts/:slug", function (req, res) {
  const title = req.params.slug;
  const newTitle = title.replaceAll("-", " ");
  res.send(`Single post title - ${newTitle}`);
});

app.get("/*", function (req, res) {
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
