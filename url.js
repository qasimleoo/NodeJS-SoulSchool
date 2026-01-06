import url from "url";

const myUrl = new URL("https://example.org");
myUrl.pathname = "/a/b/c";
myUrl.search = "?d=e";
myUrl.hash = "#fgh";
myUrl.port = "8000";

// console.log(myUrl);
console.log(myUrl.href);
