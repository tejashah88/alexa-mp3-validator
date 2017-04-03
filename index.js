var fs = require('fs');
var utils = require('./utils');
var mp3Parser = require('mp3-parser');

module.exports = function validateMP3(filepath) {
  utils.isPlayableMP3(filepath);

  var mp3Info = mp3Parser.readFrameHeader(utils.dataViewFromFilePath(filepath));
  var mp3TimeLength = utils.calculateMP3Time(filepath, mp3Info.bitrate);

  utils.processID3Field(
    mp3Info.bitrate === 48,
    "Bitrate should be set to 48 kbps. Currently, it is %d kbps.",
    mp3Info.bitrate
  );

  utils.processID3Field(
    mp3Info.samplingRate === 16000,
    "Sampling Rate should be set to 16000 Hz or 16 kHz. Currently, it is %d Hz.",
    mp3Info.samplingRate
  );

  utils.processID3Field(
    mp3Info.mpegAudioVersionBits === '10',
    "MP3 Version should be 2.0 or higher."
  );

  utils.processID3Field(
    mp3TimeLength <= 90,
    "MP3 length should be no longer than 90 seconds. Currently, it is %d seconds.",
    utils.roundNPlaces(mp3TimeLength, 2)
  );
};