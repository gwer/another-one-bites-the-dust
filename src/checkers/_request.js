const superagent = require('superagent');

const DEFAULT_USER_AGENT = 'another-one-bites-the-dust';

module.exports.get = (url, timeout) => {
  const USER_AGENT = process.env.USER_AGENT || DEFAULT_USER_AGENT;

  return superagent
    .get(url)
    .set('User-Agent', USER_AGENT)
    .timeout(timeout)
    .ok(() => true);
};
