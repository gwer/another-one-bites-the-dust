const { checkHttpStatus, checkHeartbeat } = require('.');

const config = {
  pollingCycle: 120, // in seconds
  // title: 'Your custom title',
  showExpanded: true,
  groups: [
    {
      name: 'Google Services',
      checks: [
        {
          name: 'Google',
          checker: checkHttpStatus({
            url: 'https://google.com/',
            timeout: 10000,
            warningTimeout: 500,
          }),
        },
        {
          name: 'Google Maps',
          checker: checkHttpStatus({ url: 'https://google.com/maps' }),
        },
        {
          name: 'Google Mail',
          checker: checkHttpStatus({ url: 'https://mail.google.com/' }),
        },
        {
          name: 'Google 404 (Should be ok)',
          checker: checkHttpStatus({
            url: 'https://google.com/hello-my-little-developer',
            expectedHttpCode: 404,
          }),
        },
      ],
    },
    {
      name: 'GitHub',
      checks: [
        {
          name: 'Main page',
          checker: checkHttpStatus({ url: 'https://github.com' }),
        },
        {
          name: 'Blog',
          checker: checkHttpStatus({ url: 'https://github.blog' }),
        },
      ],
    },
  ],
};

module.exports = config;
