const server = require('./src/server');
const checkHttpStatus = require('./src/checkers/http_status');
const checkHeartbeat = require('./src/checkers/heartbeat');

module.exports = server;
module.exports.checkHttpStatus = checkHttpStatus;
module.exports.checkHeartbeat = checkHeartbeat;
