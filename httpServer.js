const http = require("http");

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    // console.log(req);

    // res.statusCode = 200; // also default one
    // Headers
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>This is h1 with NodeJS server</h1>");

    console.log(req.url); // get url
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
