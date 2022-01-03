const { performance } = require('perf_hooks');
const { get } = require('./_request');

const checkHttpStatus =
  ({ url, expectedHttpCode = 200, timeout = 30000, warningTimeout = 5000 }) =>
  async () => {
    const startTime = performance.now();

    try {
      const response = await get(url, timeout);
      const elapsedTime = performance.now() - startTime;

      if (response.status !== expectedHttpCode) {
        return {
          status: 'error',
          details: `Unexpected HTTP status code (${response.status})`,
        };
      }

      if (elapsedTime > warningTimeout) {
        return {
          status: 'warning',
          details: `Slowdown (${Math.round(elapsedTime)}ms)`,
        };
      }

      return { status: 'ok' };
    } catch (e) {
      if (e.message) {
        return { status: 'error', details: e.message };
      }

      return { status: 'error' };
    }
  };

module.exports = checkHttpStatus;
