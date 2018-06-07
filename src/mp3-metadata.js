const { Mp3Header, XingHeader } = require('mp3-header');
const getMP3Duration = require('get-mp3-duration');

const utils = require('./utils');

module.exports = function getMp3Metadata(buffer) {
  let pos = buffer.indexOf(0xFF);
  let versions = [], bitrates = [], samplingRates = [];

  while (pos >= 0) {
    let header = new Mp3Header(buffer.slice(pos, pos + 4));
    if (header.parsed && header.is_valid && header.mpeg_bitrate && header.mpeg_samplerate) {
      let { mpeg_version, mpeg_bitrate, mpeg_samplerate } = header;
      versions.push(mpeg_version);
      bitrates.push(mpeg_bitrate);
      samplingRates.push(mpeg_samplerate);
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