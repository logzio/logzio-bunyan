var logzioNodejs = require('logzio-nodejs');
var stringifySafe = require('json-stringify-safe');
var _assign = require('lodash.assign');


function LogzioLogger(options) {
    _assign(this, options);

    this.logzioLogger = logzioNodejs.createLogger(options);

    this.end = function () {  };
}

var levels = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
};

LogzioLogger.prototype.safeToString = function (json) {
    try {
        return JSON.stringify(json);
    }
    catch (ex) {
        return stringifySafe(json, null, null, function () {
        });
    }
};

LogzioLogger.prototype.write = function (msg) {
    if (typeof msg !== 'string' && typeof msg !== 'object') {
        msg = {message: this.safeToString(msg)};
    }
    else if (typeof msg === 'string') {
        msg = {message: msg};
    }

    var level = this.level;
    if (msg.hasOwnProperty('level') && levels.hasOwnProperty(msg.level)) {
        level = levels[msg.level];
    }

    _assign(msg, {
        level: level
    });

    this.logzioLogger.log(msg);

};

exports = module.exports = LogzioLogger;