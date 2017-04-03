# alexa-mp3-validator
A library that validates your MP3 files to be used in your Amazon Alexa skill.

### Requirements of Alexa-ready MP3 Files

Every MP3 file you want Alexa to play must meet several basic requirements. They are as follows:
* A valid (MPEG version 2) MP3 file
* No longer than 90 seconds
* Encoded with a bit rate of exactly 48 kbps
* Encoded with a sample rate of 16000 Hz

## Usage

The module will check the aforementioned requirements and throw an error if it fails and of them.

```javascript
var mp3Validator = require('alexa-mp3-validator');
mp3Validator('path/to/file.mp3');
```

## TODO
* Add mocha or tap tests
* Add Travis CI integration and code coverage (coveralls.io)
* Add CLI support
* Add function to check if url-hosted MP3 is ready to use with Alexa

### Mentions
* [okofish](https://github.com/okofish) for his [ssmlol](https://github.com/okofish/ssmlol) library, which allows you to do the same thing but for python and inspired this module
* [biril](https://github.com/biril) for his [mp3-parser](https://github.com/biril/mp3-parser) module which handles the actual logic of processing the MP3 files.

### License
Copyright (c) 2016-2017 Tejas Shah

MIT License, see [LICENSE](https://tejashah88.mit-license.org/2016-2017) for details.