'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const user = yield this.ctx.service.user.find();
      this.ctx.logger.info('some request data: %j', user.user[0]);
      this.ctx.body = user;
    }
  }
  return HomeController;
};
