# NodeJS

V8 engine is used to run JS inside a browser ... Ryan Dahl mixed backend lang C++ and V8 engine .. He moved V8 under CPP .. and made an executable.tsx .. that's how NodeJS was made

### NodeJS is:

-   NodeJs is JS which executes on server
-   Runtime environment for JS .. that runs on server
-   async non-blocking model

##### Mostly used in real-time apps, chat apps etc...

#### Single thread can manage multiple connections because of non-blocking io model

### Random Note

```
Deferred execution is a programming technique where an operation isn't performed immediately but waits until its result is actually needed
```

---

### Single thread can manage multiple connections because of non-blocking io model

1. **Single-threaded Event Loop**
   Node.js runs JavaScript on a single thread called the **event loop**. Instead of creating a new thread for each request, it handles all operations asynchronously, which makes it lightweight and scalable.

2. **Event-Driven Architecture**
   Operations in Node.js (like file reading or HTTP requests) **emit events when completed**. You attach callbacks to handle these events instead of waiting, so the code keeps running without blocking.

3. **Non-Blocking I/O**
   Node.js delegates I/O tasks to the system and continues executing other code. When the I/O is done, the event loop triggers the registered callback.

---

**Example:**

```js
const fs = require("fs");

fs.readFile("file.txt", (err, data) => {
    console.log("File content:", data.toString());
});

console.log("This runs before file is read");
```

**Explanation:**

-   `fs.readFile` is non-blocking; it registers a callback and moves on.
-   `console.log` executes immediately.
-   Once the file is read, the callback prints the content.

This shows how Node.js **handles multiple tasks without waiting**, making it highly efficient for I/O-heavy applications.

---

Comparison between **Node.js** (event-driven, non-blocking) and **regular JavaScript in the browser** (mostly synchronous):

---

### 1. Execution Model

| Feature      | Node.js                                     | Simple JS (Browser)                                                                 |
| ------------ | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Threading    | Single-threaded **event loop**              | Single-threaded                                                                     |
| I/O          | **Non-blocking** (file system, network, DB) | Mostly **blocking** for synchronous operations; browser I/O (like `fetch`) is async |
| Event-driven | Yes, via callbacks/promises                 | Yes, mostly for user events (`click`, `load`)                                       |
| Use Case     | Server-side, handles thousands of requests  | Client-side, UI interactions                                                        |

---

### 2. Example Comparison

**Node.js (non-blocking I/O)**

```js
const fs = require("fs");

fs.readFile("file.txt", (err, data) => {
    console.log("File content:", data.toString());
});

console.log("This runs before file is read");
```

**Browser JS (synchronous, blocking)**

```js
let start = Date.now();

// Blocking loop
for (let i = 0; i < 1e9; i++) {}

console.log("Loop finished after", Date.now() - start, "ms");
```

-   Node.js doesn’t wait for I/O; it registers a callback and continues.
-   Browser JS will **block execution** during heavy computation or synchronous operations.

---

### 3. Key Difference

-   Node.js is designed for **high-concurrency server tasks** without blocking, using event-driven callbacks.
-   Simple JavaScript in browsers is **single-threaded** but relies on the browser’s event system for async tasks (like `setTimeout` or `fetch`), not for file or network I/O directly.

---

### NPM - node package manager

Most like pip of python
used to install packages

### Creating a nodejs project

```bash
npm init
```

Follow the instructions and you will get a `packages.json`

### ExpressJS

```bash
npm install express --save  #--save was required in old npm like before 5.x.x versions but now can be ignored
```

This will create a `node_modules` directory containing all the dependencies and json lock file with details of installed dependencies also adds a dependencies object in `package.json`

Then on next time you don;t have to mention dependency it will get from `package.json` for `npm i` and `package-lock.json` for `npm ci`

#### Installing a package globally

To install globally you can run `npm i -g package_name`
and you will be able to use it any project

### nodemon

Helps to rerun whenever a file changes in nodejs project just do `nodemon file.js` instead of `node file.js`

### Dev dependencies

Which will be installed for development purpose only and to install as dev dependency you can use `npm i --save-dev package_name` e.g., `npm i --save-dev nodemon`

### Uninstall dependency

`npm --uninstall dependency`

### package-lock.json

Dependencies also have some dep, which are responsible for running main one, so this file contains the versions and details of related dependencies with a proper dependency tree

## Imports/Exports | require

Make a file that will contain object to be exported

```js
// export.js
hehe = {
    name: "Qasim",
    age: 24,
    dev: true,
};

module.exports = hehe;
```

and import in another .js file

```js
// index.js
const user = require("./export");
console.log("user");
console.table("user");
```

and run project using

```bash
node index # node index.js | nodejs index
# OR
nodemon index
```

We have another method to import/export which is in ES6 but we'll cover that later

## Module Wrapper Functions

NodeJS wraps any module inside a module wrapper function automatically which looks like

```js
(function (exports, require, module, __filename, __dirname) {
    // WHOLE_MODULE of above export.js
});
```

we don't have to do this .. node js do it automatically

you can console all variables and see their values
in `export.js` file write

```js
console.log(exports, require, module, __filename, __dirname);
```

## OS module

Let's import first

```js
// osmodule.js
const os = require("os"); // don't need to add ./ as it is built-in in nodejs

console.log(os.freemem());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.uptime());
console.log(os.release());
console.log(os.platform());
console.log(os.type());
console.log(os.totalmem());
console.log(os.networkInterfaces());
```

run using `nodemon osmodule.js`

---

## Path module

```js
// path.js
const path = require("path");

const base_name = path.basename("/home/leo/RESOURCES/NodeJS/path.js");
console.log(base_name);

const dir_name = path.dirname("/home/leo/RESOURCES/NodeJS/path.js");
console.log(dir_name);

console.log(path.extname(__filename));
```

run using `nodemon path.js`

---

## fs (file system) module

#### To read files

```js
const fs = require("fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
    console.log(err, data);
});

// will run before reading file 'cause of computation .. file will open immediately but takes time to load and read - so single threaded io block will allow next lines to run before
// makes defer - non-blocking io model
console.log("Finished reading file");

// you can use `readFileSync` to allow blocking
const reading = fs.readFileSync("file.txt");
console.log(reading.toString());

console.log("Finished reading file");
```

#### To write to files

```js
fs.writeFile("file2.txt", "This is a file", () => {
    console.log("Written to a file");
});

// again, will run before 'cause of non-blocking
console.log("Finished writing to file");

// you can use writeFileSync to block

// even will run before writeFile
const writing = fs.writeFileSync("file2.txt", "Data to write");
console.log(writing);

console.log("Finished writing to file");
```

## Common JS modules | CJS

They are imported like
`const fs = require('fs')`

```js
// file1.js
function simple() {
    console.log("Simple Function");
}

module.exports = simple;
```

```js
// file2.js
const simple = require("./simple");

simple();
```

---

## Ecmascript modules | ES modules

They are imported like
`import {addTwo} from './sum.mjs'`
`.mjs` extension tells this module will be exported as ES file

If you use `.mjs` extension .. you can't use `require` in it as it will be replaced with `import`

```js
// file1.mjs

// function simple() {
//     console.log("Simple Function");
// }

// module.exports = simple;
// can't be exported as file extension is .mjs

// uses export directly
export function simple() {
    console.log("Simple Function");
}

// can export more than 1 functions
```

To use it we will have to mention `"type": "module"` in `package.json`

```js
// file2.js
// to use it we import it like
import { simple } from "./file1.";

simple();
```

```js
// can import with `as` keyword to change name like
import { simple as s } from "./file.mjs";

s();
```

To remove curly brackets/braces from importing .. you need to export with a default keyword like

```js
export default function simple() {}
```

But it can't use `as` keyword

You can import more than 1 exports in a single line from same file which will be comma separated like

```js
import {func1, func2}, func3 from './file.mjs'
```

You can use `* as anyName` for importing everything and for calling default function you will use `importedAs.default()` and for non-default you will use same `importedAs.funcName()`

```js
import simple from "./moduleES.mjs";
import { simple222 as s } from "./moduleES.mjs";

import * as hehe from "./moduleES.mjs";

simple();
s();
hehe.simple222();
hehe.default();
```

## URL module

Used to manipulate with HTTP

```js
import url from "url";

// to built a url we will use
const myUrl = new URL("https://example.org");
myUrl.pathname = "/a/b/c";
myUrl.search = "?d=e";
myUrl.hash = "#fgh";
myUrl.port = "8000";

// console.log(myUrl);
console.log(myUrl.href);
```

---

## EventEmitter

#### NodeJS works on event driven architecture .. any event can be listened and you can do any action based on that event .. with side-effects and responses

```js
// remove "type": "module" from pkg.json to run `require` as that is needed for ES modules only
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

let t = 1000;
myEmitter.on("event", () => {
    console.log("An event occurred!");
    setTimeout(() => {
        console.log("Chalo");
    }, t);
    t += 1000;
});
myEmitter.emit("event");

console.log("The script is running");

myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
// again this is also non-blocking and will allow lines outta event to run
```

---

## Building a HTTP server in NodeJS

```js
const http = require("http");

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    // console.log(req);

    // res.statusCode = 200; // also default one
    // Headers
    res.setHeader("Content-Type", "text/html");
    // res.end("<h1>This is h1 with NodeJS server</h1>");

    // use conditions to send diff data for each endpoint/url

    console.log(req.url); // get url
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
```

#### HTTP is hectic in case of a lotta routes .. that's why we use express module for easiness and better usage

---

## ExpressJS

`npm install express`

```js
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
```

---

### Read docs for more details on NodeJS

#### Hosting providers

aws, digitalocean, linode .. use any

## pm2

to start node js apps as process ..

-   PM2 is a process manager that runs directly on a host machine or within a container, focusing on keeping applications (primarily Node.js) running, handling restarts, and load balancing across CPU cores.

-   Docker is a containerization platform that packages an entire application and its environment into an isolated container, ensuring consistency and portability across different systems.

## Deploying a Node.JS in Prod

### Step 1 - Install Nodejs

Let's download Node.js from NodeSource. NodeSource is a company that provides enterprise-grade Node support and maintains a repository containing the latest versions of Node.js.

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

Let's install Node.js now:

```bash
sudo apt-get install -y nodejs
```

Check the installation of Node and npm using the following commands:

```bash
node --version && npm --version
```

You will see the versions of Node.js and npm.

### Step 2 - Creating a sample Node.js file

Let's create a sample app and paste some basic code into it.

```bash
sudo vim app.js
```

Paste the following code inside it:

```bash
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

Let's now install Express so that we can run this app server:

```bash
npm install express
```

Run the application:

```bash
node app.js
```

You should now be able to see the hello world page when you visit http://server-ip:3000.

### Step 3 - Using pm2 as a process manager

Let's install and use pm2 as a process manager. Install pm2 using the commands below:

```bash
sudo npm i pm2 -g
```

Start the application using the following command:

```bash
pm2 start app.js
```

### Step 4 - Configuring Nginx as a reverse proxy

Now let's configure Nginx as a reverse proxy. This will help us get the security features from Nginx. Also, we can serve static content using Nginx.

Let's install Nginx using the following command:

```bash
sudo apt install nginx
```

Let's create a conf file for our Node.js app using the command below:

```bash
sudo vim /etc/nginx/sites-available/nodeApp
```

Copy the following content to this file:

```
server {
  server_name 165.232.177.116;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Activate this configuration using the command below:

```bash
sudo ln -s /etc/nginx/sites-available/nodeApp /etc/nginx/sites-enabled
```

Visit http://your-ip/ and your application should work fine. Happy coding!

#### Reference: https://www.codewithharry.com/blogpost/deploy-nodejs-app-on-ubuntu
