module.exports = {
  judge: {
    apiBase: process.env.JUDGE_API || 'http://localhost:3008/api',
    apiKey: process.env.JUDGE_SECRET || 'secret',
    callback: '',
  },
  api: {
    //own address to send as cb to judge api
    apiBase: process.env.API || 'http://localhost:3000',
  },
};
