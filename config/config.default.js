'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1497704659432_959';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  // add your config here
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '10mb',
    strict: true,
  };

  config.middleware = [ 'errorHandler', 'apiWrapper' ];
  config.errorHandler = {
    // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
    match: '/rest',
  };

  // mysql
  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      read: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'friend',
      },
      write: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'friend',
      },
    },
    // 所有数据库配置的默认值
    default: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'friend',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // redis
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
  };
  config.security = {
    ignore: '/api/',
    domainWhiteList: [ 'http://127.0.0.1:8000', 'http://localhost:8000' ],
    methodnoallow: { enable: false },
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };
  return config;
};

