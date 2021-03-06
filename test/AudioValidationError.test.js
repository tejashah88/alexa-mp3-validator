'use strict';

const expect = require('chai').expect;
const AudioValidationError = require('../src/AudioValidationError');
const EXAMPLE_MSG = 'Example message';

describe('AudioValidationError', function() {
  it('should be an error', function() {
    expect(new AudioValidationError(EXAMPLE_MSG)).to.be.an('error');
  });

  it('should throw an AudioValidationError', function() {
    const throwFn = function () { throw new AudioValidationError(EXAMPLE_MSG); };
    expect(throwFn).to.throw(AudioValidationError, EXAMPLE_MSG);
  });

  it('should be an object from AudioValidationError and inherit from the Error class', function() {
    const avError = new AudioValidationError(EXAMPLE_MSG);
    expect(avError).to.be.an.instanceof(AudioValidationError);
    expect(avError).to.be.an.instanceof(Error);
  });
});
