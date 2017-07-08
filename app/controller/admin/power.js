'use strict';

module.exports = app => {
  class PowerController extends app.Controller {
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: { type: 'string', min: 2, max: 50 },
            method: { type: 'string', min: 1, max: 50 },
            router: { type: 'string', min: 1, max: 100 },
            group_id: { type: 'int' },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const success = yield ctx.service.admin.addPower(data);
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
            name: { type: 'string', min: 2, max: 50 },
            method: { type: 'string', min: 1, max: 50 },
            router: { type: 'string', min: 1, max: 100 },
            group_id: { type: 'int' },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.updatePower(id, data);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2006);
      }
    }
    * destroy() {
      const isLogin = this.isAdminLogin();
      const { ctx } = this;
      if (!isLogin) {
        this.retError(2016);
        return;
      }
      const id = ctx.params.id;
      const success = yield ctx.service.admin.deletePower(id);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2008);
      }
    }
  }
  return PowerController;
};
