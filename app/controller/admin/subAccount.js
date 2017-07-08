'use strict';

module.exports = app => {
  class SubAccountController extends app.Controller {
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            pid: { type: 'int', min: 0 },
            name: { type: 'string', min: 2, max: 30 },
            password: { type: 'string', min: 6, max: 50 },
            email: { type: 'email', required: false },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const success = yield ctx.service.admin.addSubAccount(data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2006);
      }
    }
    * update() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            password: { type: 'string', max: 50, min: 6, required: false },
            email: { type: 'email', required: false },
            role_id: { type: 'int', min: 0, required: false },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.updateSubAccount(id, data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2007);
      }
    }
    * destroy() {
      const { ctx } = this;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.deleteSubAccount(id);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2008);
      }
    }
  }
  return SubAccountController;
};
