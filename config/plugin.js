'use strict';

// had enabled by egg
// exports.static = true;
const path = require('path');
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.weChat = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-wechat'),
};
