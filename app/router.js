'use strict';

module.exports = app => {
  app.post('/', 'home.index');
  app.get('/home', 'home.home');
  app.resources('user', '/rest/user', app.controller.rest.user);
  require('./router/admin')(app);
};
