'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const user = yield this.ctx.service.user.find();
      this.ctx.logger.info('some request data: %j', user.user[0]);
      this.ctx.body = user;
    }
    * home() {
      const { ctx, app } = this;
      // set
      yield app.redis.set('foo', 'bar');
      // get
      ctx.body = yield app.redis.get('foo');
    }
  }
  return HomeController;
};
