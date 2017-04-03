var fs = require('fs');
var util = require('util');

var filepathToArrayBuffer = function(filepath) {
  var fileBuffer = fs.readFileSync(filepath);
  var fbOffset = fileBuffer.byteOffset;
  var fbLength = fileBuffer.byteLength;

  return fileBuffer.buffer.slice(fbOffset, fbOffset + fbLength);
}

var dataViewFromFilePath = function(filepath) {
  var arrayBuffer = filepathToArrayBuffer(filepath);
  return new DataView(arrayBuffer);
};

var checkFileSignature = function(filepath) {
  var buf = new Uint8Array(filepathToArrayBuffer(filepath));
  return  (buf && buf.length > 1) && 
          ((buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) || (buf[0] === 0xFF && buf[1] === 0xfb));
}

// ony checks if it exists and the signature is an MP3, not fool-proof!
var isPlayableMP3 = function(filepath) {
  if (!fs.existsSync(filepath))
    throw new Error("Specified file does not exist: " + filepath);

  if (!checkFileSignature(filepath))
    throw new Error("Specified file is not a valid MP3 file: " + filepath);
}

var processID3Field = function(condition, errorMsg, receivedValue) {
  if (!condition) {
    if (typeof receivedValue !== 'undefined')
      throw new Error(util.format(errorMsg, receivedValue));
    else
      throw new Error(errorMsg);
  }
};

var calculateMP3Time = function(filepath, kbps) {
  var size = fs.statSync(filepath).size;
  return (size * 8 / 1024) / kbps;
};

var roundNPlaces = function(number, n) {
  return Math.round(parseFloat((number * Math.pow(10, n)).toFixed(n))) / Math.pow(10, n);
};

module.exports = {
  dataViewFromFilePath,
  processID3Field,
  calculateMP3Time,
  roundNPlaces,
  isPlayableMP3
};