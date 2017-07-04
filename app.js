/**
 * Created by vic on 2017/7/4.
 */
'use strict';

module.exports = app => {
  class CustomController extends app.Controller {
    get user() {
      return this.ctx.session.user;
    }
    get adminUser() {
      return this.ctx.session.adminUser;
    }
    isAdminLogin() {
      if (this.ctx.session.hasOwnProperty('adminUser') && this.ctx.session.adminUser !== null) {
        return true;
      }
      return false;
    }
    success(data) {
      this.ctx.body = {
        success: true,
        data,
      };
    }
    notFound(msg) {
      msg = msg || 'not found';
      this.ctx.throw(404, msg);
    }
  }
  app.Controller = CustomController;

};
