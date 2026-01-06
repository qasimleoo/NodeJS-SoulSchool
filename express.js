const express = require("express");
const app = express();
const port = 4400;

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/hello", (req, res) => {
    res.send("<h1>Hello Peeps</h1>");
});

// middleware to parse json
app.use(express.json());
let list = new Set();
console.log(list);

app.post("/postData", (req, res) => {
    // Access the data sent in the request body via req.body
    const userId = req.body.id;
    if (list.has(userId)) {
        res.statusCode = 409;
        res.send(`User id ${userId} already exists`);
    }
    const token = req.body.token;
    const geo = req.body.geo;

    console.log("Received data:", req.body);

    // Process the data (e.g., save to a database) and send a response
    res.status(201).send({
        // 201 status indicates a new resource was created
        message: "User data received successfully!",
        user_id: userId,
        token: token,
        geo: geo,
    });

    list.add(userId);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
