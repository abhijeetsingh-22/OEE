const rp = require('request-promise');
const config = require('../../config');

const apiBase = config.judge.apiBase;
const uri = (path) => apiBase + path;

const runCode = ({source, lang, input}) => {
  return rp({
    method: 'POST',
    uri: uri('/runs'),
    json: true,
    headers: {Authorization: `Bearer ${config.judge.apiKey}`},
    body: {
      source,
      lang,
      stdin: input,
      mode: 'callback',
      callback: config.api.apiBase + '/run/cb?code' + config.judge.apiKey,
    },
  });
};
const getLangs = () => {
  rp({
    uri: uri('/langs'),
    json: true,
    headers: {
      Authorization: `Bearer ${config.judge.apiKey}`,
    },
  });
};
module.exports = {runCode, getLangs};
