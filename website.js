const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.url == "/") {
        const index = fs.readFileSync("index.html");
        res.end(index.toString());
    } else if (req.url == "/hello") {
        res.end("<h1 style='background: dark-gray; color: #fff'>Hello babes");
    } else if (req.url == "/about") {
        res.end("<h1 style='background: dark-gray; color: #0f0'>About Page");
    } else if (req.url == "/test") {
        res.end("<h1 style='background: dark-gray; color: #00f'>Testing Page");
    } else {
        res.statusCode = 404;
        res.end(
            "<h1 style='background: dark-gray; color: #f00'>Not Found!</h1>"
        );
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
