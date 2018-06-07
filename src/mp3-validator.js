'use strict';

const roundTo = require('round-to');
const utils = require('./utils');
const AudioValidationError = require('./AudioValidationError');

const getMp3Metadata = require('./mp3-metadata');

function validateMP3(filepath, throwOnValidationError = false) {
  return utils.getFileBuffer(filepath)
    .then(buffer => {
      let { version, bitrate, samplingRate, duration } = getMp3Metadata(buffer);
      if (version !== 2)
        throw new AudioValidationError(`Expected MP3 Version to be 2.0 but got ${version.toFixed(1)}.`);
      if (samplingRate !== 16000)
        throw new AudioValidationError(`Expected sampling Rate to be 16,000 Hz but got ${samplingRate} Hz.`);
      if (bitrate !== 48000)
        throw new AudioValidationError(`Expected bitrate to be 48 kbps but got ${bitrate / 1000} kbps.`);
      if (duration > 90000)
        throw new AudioValidationError(`Expected duration to be no longer than 90 seconds but got ${roundTo(duration / 1000, 1)} seconds.`);

      return true;
    })
    .catch(err => {
      if (err instanceof AudioValidationError && !throwOnValidationError)
        return false;
      else
        throw err;
    });
}

module.exports = {
  validateMP3,
  AudioValidationError
};