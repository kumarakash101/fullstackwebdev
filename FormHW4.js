const express = require("express");
const { format } = require("path");
const app = express();
const path = require("path");
const port = 3000;
const bodyparse = require("body-parser");

app.use(bodyparse.urlencoded({ extended: false }));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/formsubmit", (req, res) => {
  res.send(`Name : ${req.body.Name} <br> 
  Email : ${req.body.Email} <br> 
  Comment : ${req.body.Comments} <br>
  Newsletter : ${req.body.Newsletter}`);
});

app.listen(port, () => {
  console.log(`Server is running at :${port}`);
});
