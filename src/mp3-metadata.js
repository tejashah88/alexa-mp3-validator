'use strict';

const Mp3Header = require('mp3-header').Mp3Header;
const getMP3Duration = require('get-mp3-duration');

const utils = require('./utils');

/*
 * This function is for getting the metadata of an MP3, specifically the version, bitrate and
 * sampling rate. It does this by selecting a header range to pull the potential metadata and
 * then skipping every 255 bits (or 0xFF) for a new header position. This is done because several
 * loosely conducted experiments revealed that relying on any one position for the header showed
 * contradictory results to the expected metadata. After collecting the array of possible versions,
 * bitrates, and sampling rates, it takes the most occurring value as the most probable value
 * for describing the property of that MP3 file.
 */
module.exports = function getMp3Metadata(buffer) {
  let pos = buffer.indexOf(0xFF);
  const versions = [], bitrates = [], samplingRates = [];

  while (pos >= 0) {
    const header = new Mp3Header(buffer.slice(pos, pos + 4));
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