## Changelog

### 1.x (Next)
* Your commit here

### 1.0.3 (July/9/2018)
* Updated dependencies to resolve moderate DDoS security vulnerabilities. Travis CI integration now working for Node.js LTS versions 6 through 12. - [@tejashah88](https://github.com/tejashah88)

### 1.0.2 (June/7/2018)
* Dropped support for node v4 to meet compatibility with dependencies - [@tejashah88](https://github.com/tejashah88)

### 1.0.1 - Invalid

### 1.0.0 (June/7/2018)

* First official release - [@tejashah88](https://github.com/tejashah88)
  * If you were using this library prior to 1.0, please see the [UPGRADING](UPGRADING.md) document for migration instructions
* Added tests, travis CI, and code coverage from coveralls.io - [@tejashah88](https://github.com/tejashah88)
* Improved accuracy of detection of metadata by scanning all parts of the MP3 file and taking the most occurring values as the correct metadata representing the MP3 file - [@tejashah88](https://github.com/tejashah88)
* Changed `validateMP3` syntax and functionality to be mroe flexible with given inputs and error handling (see [UPGRADING](UPGRADING.md) for more details)