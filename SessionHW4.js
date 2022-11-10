const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "nosecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 864000,
    },
  })
);

app.use("/", function (req, res) {
  res.status(200);

  if (req.session.urlstack === undefined) {
    req.session.urlstack = [];
    res.send(
      `<p>Currently on route: ${req.url}</p><p>Welcome to http://localhost:3000</p>`
    );
    
  } else if (req.url === "/favicon.ico") {
    res.send("<p>Ignoring the favicon route...</p>");
  } else {
    //creating a stack of all the previously visited urls
    req.session.urlstack.push(`${req.url}`);
    let chunk = "";
    req.session.urlstack.forEach((element) => {
      chunk = chunk.concat(`<p>${element}</p>`);
    });
    res.send(
      `<p>Currently on route: ${req.url}<p>
      <p>Previously visited: </p> ${chunk}`
    );
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
