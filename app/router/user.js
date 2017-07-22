/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.resources('user', '/rest/user', app.controller.rest.user);
  app.resources('collect', '/rest/user/collect', app.controller.rest.collect);
  app.post('/rest/user/imgs', app.controller.rest.user.uploadImg);
  app.post('/rest/login', app.controller.rest.user.login);
  app.get('/rest/logout', app.controller.rest.user.logout);
};
