'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = require('chai').expect;

const utils = require('../src/utils');
const fileInfos = require('./fixtures/metadata.json');

describe('utils', function() {
  describe('#mode()', function() {
    it('should handle singular modes', function() {
      expect(utils.mode([1,2,2,3])).to.have.members([2]);
      expect(utils.mode([2,8,2,3,5,2,4,4,7,5,0,9,5,8,9,4,3,9,5,3,5,4,2,1,1])).to.have.members([5]);
    });

    it('should handle multiple modes', function() {
      expect(utils.mode([1,2,2,1])).to.have.members([1,2]);
      expect(utils.mode([2,8,2,3,5,2,4,4,7,5,0,1,5,1,9,4,3,9,5,3,5,4,2,1,1,1])).to.have.members([5,1]);
    });
  });

  describe('#getFileBuffer()', function() {
    for (const fileInfo of fileInfos) {
      describe(`with ${fileInfo.name}.mp3`, function() {
        const sampleFile = `./test/fixtures/${fileInfo.name}.mp3`;
        const promisedBuffer = utils.getFileBuffer(sampleFile);

        it('should return a fulfilled Promise', function() {
          return Promise.all([
            expect(promisedBuffer).to.be.a('promise'),
            expect(promisedBuffer).to.be.fulfilled
          ]);
        });

        it(`should eventually return a buffer whose length is ${fileInfo.size} bytes`, function() {
          return Promise.all([
            expect(promisedBuffer).to.eventually.be.an.instanceof(Buffer),
            expect(promisedBuffer).to.eventually.have.lengthOf(fileInfo.size)
          ]);
        });
      });
    }

    it('should fail when trying to read from an invalid path', function () {
      const sampleFile = `./test/fixtures/invalid.mp3`;
      const invalidPromisedBuffer = utils.getFileBuffer(sampleFile);

      it('should return a fulfilled Promise', function() {
        return Promise.all([
          expect(invalidPromisedBuffer).to.be.a('promise'),
          expect(invalidPromisedBuffer).to.be.rejected
        ]);
      });
    });
  });
});
