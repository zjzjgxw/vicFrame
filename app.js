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
    retSuccess(res) {
      this.ctx.body = { code: 200, data: res.hasOwnProperty('data') ? res.data : '', msg: '' };
    }
    retError(code) {
      this.ctx.body = { code, data: '', msg: this.ctx.__(code) };
    }
    notFound(msg) {
      msg = msg || 'not found';
      this.ctx.throw(404, msg);
    }
  }
  app.Controller = CustomController;

};
