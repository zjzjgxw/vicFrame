'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * login() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            mobile: { type: 'string', min: 10, max: 15 },
            password: { type: 'string', min: 6, max: 50 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const code = yield ctx.service.user.login(data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * logout() {
      const { ctx } = this;
      ctx.session.user = null;
      this.retSuccess({ data: { success: 1 } });
    }
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            mobile: { type: 'string', min: 10, max: 15 },
            password: { type: 'string', min: 6, max: 50 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const isMobile = ctx.helper.checkMobile(data.mobile);
      if (!isMobile) {
        this.retError(6003);
      }
      const code = yield ctx.service.user.create(data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
  }
  return UserController;
};
