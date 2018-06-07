'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = require('chai').expect;

const getMp3Metadata = require('../src/mp3-metadata');
const utils = require('../src/utils');
const fileInfos = require('./fixtures/metadata.json');

describe('mp3-metadata', function() {
  describe('#getMp3Metadata()', function() {
    for (let fileInfo of fileInfos) {
      it(`${fileInfo.name}.mp3 should return the correct metadata`, function() {
        let sampleFile = `./test/fixtures/${fileInfo.name}.mp3`;
        let promisedMetadata = utils.getFileBuffer(sampleFile).then(buffer => getMp3Metadata(buffer));
        return expect(promisedMetadata).to.eventually.deep.equal(fileInfo.metadata);
      });
    }
  });
});
