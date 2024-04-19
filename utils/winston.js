const winston = require('winston');
const moment = require('moment')
require('winston-daily-rotate-file');

const transportInfo = new (winston.transports.DailyRotateFile)({
  filename: 'logs/'+moment().format('YYYY')+'-'+moment().format('MM')+'/info/application-%DATE%-info.log',
  datePattern: 'YYYY-MM-DD',
});

const transportError = new (winston.transports.DailyRotateFile)({
  filename: 'logs/'+moment().format('YYYY')+'-'+moment().format('MM')+'/error/application-%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  
});

const logger = winston.createLogger(
  {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(
        msg => `${msg.timestamp} ${msg.level} ${msg.message}`,
      ),
    ),
    transports: [
      new winston.transports.Console(),
      transportInfo
    ]
  },
  {
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(
        msg => `${msg.timestamp} ${msg.level} ${msg.message}`,
      ),
    ),
    transports: [
      new winston.transports.Console(),
      transportError
    ]
  }
);

module.exports = logger
