![Build Status](https://travis-ci.org/logzio/nuyan-logzio.svg?branch=master)

# logzio-bunyan
[Logz.io](http://logz.io/) stream for the Bunyan logger 

## Installation
```
npm install logzio-bunyan --save
```


## Sample usage
```javascript
var bunyan = require('bunyan');
var logzioBunyanStream = require('logzio-bunyan');

var loggerOptions = {
    token: '__YOUR_API_TOKEN__'
};

var logzioStream = new logzioBunyanStream(loggerOptions);


var log = bunyan.createLogger({
    name: 'myapp',
    streams: [
        {
            type: 'raw',
            stream: logzioStream
        }
    ]
});

log.info('hi');
log.warn({lang: 'en'}, 'ok lets go');
```

Make sure you replace `__YOUR_API_TOKEN__` with your own logz.io api token.<br/>
If you do not have a [Logz.io](http://logz.io) account, you can sign up for a free trial [here](https://app.logz.io/#/signup)


## Details
This bunyan plugin, basically just wraps our [nodejs logzio shipper](https://github.com/logzio/logzio-nodejs).<br/>
If you want to configure the nodejs logger, any parameters sent to bunyan when initializing the stream
(what is held in the variable `loggerOptions` in the sample above) will be passed to the logzio nodejs logger itself.

## Update log
**0.2.0**  
- Changed the default log message output field from `msg` to `message` be compatible with the default kibana `message` field 

**0.2.1**  
- Close underlying stream properly when closing applications 
