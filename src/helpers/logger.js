const path = require('path');
const winston = require('winston');
const uuid = require('uuid');
const fs = require('fs').promises;

require('winston-daily-rotate-file');

class Logger {
    constructor() {
        // Initialize the logger instance with specific configurations
        this.instance = winston.createLogger({
            // Define log format with timestamp and custom log message formatting
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf((info) => {
                    // Generate a unique ID for each log entry
                    const id = 'ID: ' + uuid.v4();
                    const paramsString = JSON.stringify(info.params || {});
                    const bodyString = JSON.stringify(info.body || {});
                    return `${id} [${info.timestamp}] ${info.level}: ${info.ip} - ${info.method} ${info.originalUrl} ${info.status} { ${info.message} } params: ${paramsString} body: ${bodyString}`;
                }),
            ),
            // Set up transports (storage locations) for logs - Console in this case
            transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'Logs.log' })],
        });
    }
}

// Export an instance of the Logger class
module.exports = new Logger();
