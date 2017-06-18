'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const { ctx } = this;
      const user = yield ctx.service.user.find();
      ctx.logger.info('some request data: %j', user.user[0]);
      ctx.session.user = user;
      ctx.body = user;
    }
    * home() {
      const { ctx } = this;
      // set
      // yield app.redis.set('foo', 'bar');
      // get
      // ctx.body = yield app.redis.get('foo');
      ctx.body = ctx.session.user;
    }
  }
  return HomeController;
};
