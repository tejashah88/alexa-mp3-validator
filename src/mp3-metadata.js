'use strict';

const Mp3Header = require('mp3-header').Mp3Header;
const getMP3Duration = require('get-mp3-duration');

const utils = require('./utils');

module.exports = function getMp3Metadata(buffer) {
  let pos = buffer.indexOf(0xFF);
  let versions = [], bitrates = [], samplingRates = [];

  while (pos >= 0) {
    let header = new Mp3Header(buffer.slice(pos, pos + 4));
    if (header.parsed && header.is_valid && header.mpeg_bitrate && header.mpeg_samplerate) {
      versions.push(header.mpeg_version);
      bitrates.push(header.mpeg_bitrate);
      samplingRates.push(header.mpeg_samplerate);
    }

    pos = buffer.indexOf(0xFF, pos + 1);
  }

  return {
    version: utils.mode(versions)[0],
    bitrate: utils.mode(bitrates)[0],
    samplingRate: utils.mode(samplingRates)[0],
    duration: getMP3Duration(buffer)
  };
};