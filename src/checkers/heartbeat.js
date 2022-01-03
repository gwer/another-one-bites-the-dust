const { get } = require('./_request');

const checkHeartbeat =
  ({ url, expectedHttpCode = 200, timeout = 30000, warningTimeout = 5000 }) =>
  async () => {
    const startTime = performance.now();

    try {
      const response = await get(url, timeout);
      const elapsedTime = performance.now() - startTime;
      const data = response.body;

      if (response.status !== expectedHttpCode) {
        return {
          status: 'error',
          details: `Unexpected HTTP status code (${response.status})`,
        };
      }

      if (data.status !== 'ok') {
        return {
          status: 'error',
          details: `Unexpected status (${data.status})`,
        };
      }

      if (elapsedTime > warningTimeout) {
        return {
          status: 'warning',
          details: `Slowdown (${Math.round(elapsedTime)}ms)`,
        };
      }

      if (data.checks) {
        const brokenChecks = Object.entries(data.checks).filter(
          ([_, status]) => status !== 'ok'
        );

        if (brokenChecks.length > 0) {
          return {
            status: 'warning',
            details: `Broken checks: ${brokenChecks
              .map(([name, status]) => `${name}: ${status}`)
              .join(', ')}`,
          };
        }
      }

      return { status: 'ok' };
    } catch (e) {
      if (e.message) {
        return { status: 'error', details: e.message };
      }

      return { status: 'error' };
    }
  };

module.exports = checkHeartbeat;
