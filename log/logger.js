"use strict"

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json } = format;
const path = require('path');

const formatter = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`;
});

let logger = createLogger({
    format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //errors({ stack: true }),
        json(),
        formatter
      ),
      transports: [
        new (transports.File) ({
            filename: 'log/nodeStarterProject.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level: process.env.LOGGER_LEVEL
        })
    ]
});

module.exports = function(filePath) {   
    let fileName = path.basename(filePath); 
    let customlogger = {
        error: function(text) {
            logger.error(`${text} (${fileName})`);
        },
        warn: function(text) {
            logger.warn(`${text} (${fileName})`);
        },
        info: function(text) {
            logger.info(`${text} (${fileName})`);
        },
        debug: function(text) {
            logger.debug(`${text} (${fileName})`);
        },
        verbose: function(text) {
            logger.verbose(`${text} (${fileName})`);
        }        ,
        silly: function(text) {
            logger.silly(`${text} (${fileName})`);
        }
    }

    return customlogger;
}