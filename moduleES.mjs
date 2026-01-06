// function simple() {
//     console.log("Simple Function");
// }

// module.exports = simple;  // can't be used here

// .mjs uses export directly
export default function simple() {
    console.log("Simple Function");
}

export function simple222() {
    console.log("Simple222 Function");
}

// to use it we will have to mention "type": "module" in `package.json`
