const http = require("http");

const server = http.createServer((req, res) => {
  //if the url is /welcome
  if (req.url === "/welcome") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to this page</h1>");
    res.end();
  }
  // if the url is /redirect
  else if (req.url === "/redirect") {
    res.writeHead(302, { Location: "/redirected" });
    console.log("redirected");
    return res.end();
  } else if (req.url === "/redirected") {
    console.log("page redirected");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Redirected from /redirect</h1>");
    res.end();
  }
  //if the url is/cache
  else if (req.url === "/cache") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-control": "max-age=86400",
    });
    res.write("<h1>This resource was cached</h1>");
    res.end();
  }

  //if the url is /cookie
  else if (req.url === "/cookie") {
    res.write("Cookies... Yummm");
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": "hello=world",
    });

    res.end();
  }
  //if the url is /check-cookies
  else if (req.url === "/check-cookies") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    let cookiepresent = false;
    let cookiesobj = req.headers.cookie;

    if (cookiesobj == true) {
      cookiesobj = req.headers.cookie.split(";");

      cookiesobj.forEach((cookieName) => {
        // split name and value of cookie into [name1, value1]
        let name = cookieName.split("=");
        if (name[0] === "hello") {
          cookiepresent = true;
        }
      });
    }
    if (cookiepresent == true) {
      res.write("yes");
    } else {
      res.write("false");
    }
    res.end();
  }

  //for any other type of invalid url
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("<h1>404: Page not found</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});
