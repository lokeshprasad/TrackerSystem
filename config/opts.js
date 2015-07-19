// Argument parsing using the optimist module
module.exports = require('optimist')
    .usage('Usage: $0 --port [port]')

    .describe('context.url', 'Base context URL')
    .default('context.url', '')
    .describe('host', 'Host IP')
    .default('host', 'localhost')

    .describe('port', 'Port number for the Express application.')
    .default('port', '3005')

    .default('db.host', 'localhost')
    .default('db.port', '27017')
    .default('db.connection', 'Tracking')
    .usage('Usage: $0 --port [port]')
    .alias('port', 'p')
    .describe('port', 'Port number for the Express application.')
    .default('port', 5000)
    .argv;

