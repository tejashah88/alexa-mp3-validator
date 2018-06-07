const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = require('chai').expect;

const { validateMP3 } = require('../src/mp3-validator');
const AudioValidationError = require('../src/AudioValidationError');
const fileInfos = require('./fixtures/metadata.json');

describe('mp3-validator', function() {
  describe('#validateMP3()', function() {
    describe('with throwOnValidationError = false', function() {
      for (let fileInfo of fileInfos) {
        it(`${fileInfo.name}.mp3 should ${fileInfo.alexaReady ? 'pass' : 'fail'} the MP3 validation`, function() {
          let sampleFile = `./test/fixtures/${fileInfo.name}.mp3`;
          return expect(validateMP3(sampleFile)).to.eventually.equal(fileInfo.alexaReady);
        });
      }
    });

    describe('with throwOnValidationError = true', function() {
      for (let fileInfo of fileInfos) {
        it(`${fileInfo.name}.mp3 should ${fileInfo.alexaReady ? 'pass' : 'fail'} the MP3 validation`, function() {
          let sampleFile = `./test/fixtures/${fileInfo.name}.mp3`;
          if (fileInfo.alexaReady)
            return expect(validateMP3(sampleFile, true)).to.eventually.equal(fileInfo.alexaReady);
          else
            return expect(validateMP3(sampleFile, true)).to.be.rejectedWith(AudioValidationError);
        });
      }
    });
  });
});
