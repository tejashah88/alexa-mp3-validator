const fs = require('fs');
const util = require('util');

// Computes the mode in an array. All modes will be returned.
const mode = arr => [...new Set(arr)]
  .map(value => [value, arr.filter((v) => v === value).length])
  .sort((a,b) => b[1] - a[1])
  .filter((v, i, a) => v[1] === a[0][1])
  .map(v => v[0]);

const getFileBuffer = util.promisify(fs.readFile);

module.exports = { mode, getFileBuffer };