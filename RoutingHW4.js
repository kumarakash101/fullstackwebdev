const express = require("express");
const { format } = require("path");
const app = express();
const path = require("path");
const port = 3000;

app.get("/welcome", (req, res) => {
  res.send("Welcome to Express page");
});

app.get("/redirect", (req, res) => {
  res.redirect("/redirected");
});

app.post("/redirected", (req, res) => {
  res.send("redirected page");
});

app.post("/cache", (req, res) => {
  res.set({ "max-age": 86400 });
  res.end("this resource was cached");
  res.send("This resource was cached");
});

app.get("/cookie", (req, res) => {
  res.cookie("hello", "world");
  res.send("cookies.....yumm");
});

app.listen(port, () => {
  console.log("Server is running at :${port}");
});
