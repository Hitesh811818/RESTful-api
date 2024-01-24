const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id : uuidv4(),
    username : "apnacollege",
    content : "I love coding!",
  },
  {
    id : uuidv4(),
    username : "shrdhakhapra",
    content : "Hard work is inmortant to achieve success",
  },
  {
    id : uuidv4(),
    username : "hiteshkumar",
    content : "I got selected for my first internship!",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs",{posts});
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", {post});
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.filter((p) => id !== p.id);
  posts = post;
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});