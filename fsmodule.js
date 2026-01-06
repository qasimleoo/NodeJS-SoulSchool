const fs = require("fs");

// fs.readFile("file.txt", "utf-8", (err, data) => {
//     console.log(err, "\n", data);
// });

const reading = fs.readFileSync("file.txt");
console.log(reading.toString());

console.log("Finished reading file");

// fs.writeFile("file2.txt", "This is a file", () => {
//     console.log("Written to a file");
// });

fs.writeFileSync("file2.txt", "Data to write");

console.log("Finished writing to file");
