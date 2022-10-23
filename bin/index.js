#!/usr/bin/env node
const path = require('path');
const args = process.argv;
args.shift();
args.shift();

let dir;
let outDir;
if (args[0] === '-d' || args[0] === '--dir') {
    dir = args[1];
}
for (const arg of args) {
    if (arg === '-d' || arg === '--dir') dir = args[args.indexOf(arg) + 1];
    if (arg === '-o' || arg === '--out') outDir = args[args.indexOf(arg) + 1];
}
console.log('Generating documents...')
console.log('Reading ', path.resolve(dir));
try {
    require('../src/index').docGen(dir, outDir);
} catch (err) {
    console.error('An error occured, exiting with code 0.');
    console.error(err);
    process.exit(0);
}
console.log('Docs successfully generated.');



