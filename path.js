const path = require("path");

const path_a = path.basename("/home/leo/RESOURCES/NodeJS/path.js");
const path_b = path.dirname("/home/leo/RESOURCES/NodeJS/path.js");
console.log(path_a);
console.log(path_b);

console.log(path.extname(__filename));
