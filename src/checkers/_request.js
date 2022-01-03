const superagent = require('superagent');

const USER_AGENT = 'another-one-bites-the-dust';

module.exports.get = (url, timeout) => {
  return superagent
    .get(url)
    .set('User-Agent', USER_AGENT)
    .timeout(timeout)
    .ok(() => true);
};
