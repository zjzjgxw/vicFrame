'use strict';

module.exports = app => {
  app.post('/', 'home.index');
  app.get('/home', 'home.home');
  require('./router/admin')(app);
  require('./router/user')(app);
  require('./router/information')(app);
};
