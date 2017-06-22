/**
 * Created by vic on 2017/6/22.
 */
'use strict';
const assert = require('assert');
const weChat = require('./lib/weChat.js');

module.exports = app => {
  app.addSingleton('weChat', createWeChat);
}
/**
 * @param  {Object} config   框架处理之后的配置项，如果应用配置了多个 MySQL 实例，会将每一个配置项分别传入并调用多次 createMysql
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 MySQL 实例
 */
function createWeChat(config, app) {
  // 创建实例
  assert(config.appId && config.appsecret, `[egg-weChat] 'appid: ${config.appId}', 'appsecret: ${config.appsecret}' are required on config`);

  const client = new weChat(config, app);
  return client;
}
