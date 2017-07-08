'use strict';

module.exports = app => {
  class AdminController extends app.Controller {
    * index() {
      const { ctx } = this;
      this.retSuccess({ data: { success: 2 } });
    }
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: 'string',
            password: 'string',
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const success = yield ctx.service.admin.createAdmin(data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2001);
      }
    }
    * update() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            email: { type: 'email', required: false },
            password: { type: 'string', required: false, min: 6 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.updateAdmin(id, data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2002);
      }
    }
    * login() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: { type: 'string' },
            password: { type: 'string' },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const success = yield ctx.service.admin.login(data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2015);
      }
    }
    * logout() {
      const { ctx } = this;
      ctx.session.adminUser = null;
      this.retSuccess({ data: { success: 1 } });
    }
  }
  return AdminController;
};
