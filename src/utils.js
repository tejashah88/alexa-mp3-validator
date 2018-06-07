const fs = require('fs');

// Computes the mode in an array. All modes will be returned.
const mode = arr => [...new Set(arr)]
  .map(value => [value, arr.filter((v) => v === value).length])
  .sort((a,b) => b[1] - a[1])
  .filter((v, i, a) => v[1] === a[0][1])
  .map(v => v[0]);

function getFileBuffer(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
}

module.exports = { mode, getFileBuffer };