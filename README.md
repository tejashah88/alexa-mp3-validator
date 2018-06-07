# alexa-mp3-validator

![NPM Version](https://img.shields.io/npm/v/alexa-mp3-validator.svg)
[![Build Status](https://travis-ci.org/tejashah88/alexa-mp3-validator.svg?branch=master)](https://travis-ci.org/tejashah88/alexa-mp3-validator)
[![Coverage Status](https://coveralls.io/repos/github/tejashah88/alexa-mp3-validator/badge.svg)](https://coveralls.io/github/tejashah88/alexa-mp3-validator)
[![dependencies Status](https://david-dm.org/tejashah88/alexa-mp3-validator/status.svg)](https://david-dm.org/tejashah88/alexa-mp3-validator)

A node module for validating your MP3 files to be used in your Amazon Alexa skill. If you are looking for a CLI version, check out [ssmlol](https://github.com/okofish/ssmlol). If you want to convert your mp2 files to be usable by Alexa, check out [this website](https://www.jovo.tech/audio-converter).

### Requirements of Alexa-ready MP3 Files

Every MP3 file you want Alexa to play must meet several basic requirements. They are as follows:
* A valid (MPEG version 2) MP3 file
* No longer than 90 seconds
* Encoded with a bit rate of exactly 48 kbps
* Encoded with a sample rate of exactly 16,000 Hz

## Usage

The module will check the requirements and return a Promise that returns true or false. An error will be thrown if the module is unable to read the file.

#### Function signature
```javascript
Boolean validateMP3(String filepath, optional Boolean throwOnValidationError = false)
```

#### Using with Promises
```javascript
const { validateMP3 } = require('alexa-mp3-validator');
validateMP3('path/to/file.mp3')
  .then(isValid => {
    // more logic goes here
  })
  .catch(err => {
    // error handling logic goes here
  })
```

#### Using with async/await
```javascript
const { validateMP3 } = require('alexa-mp3-validator');
(async () => {
  try {
    let isValid = await validateMP3('path/to/file.mp3');
    // more logic goes here
  } catch (err) {
    // error handling logic goes here
  }
})()
```

By default, if a validation error occurs, it will return false. By setting `throwOnValidationError` to true, all errors will throw.

#### Using with async/await and `throwOnValidationError = true`
```javascript
const { validateMP3, AudioValidationError } = require('alexa-mp3-validator');
(async () => {
  try {
    let isValid = await validateMP3('path/to/file.mp3', true);
    // more logic goes here
  } catch (err) {
    if (err instanceof AudioValidationError) {
      // validation error handling logic goes here
    } else {
      // other error handling logic goes here
    }
  }
})()
```

### Testing
Testing is done with mocha and chai.js.

```bash
npm test
```

## TODO
* Add CI integration and code coverage