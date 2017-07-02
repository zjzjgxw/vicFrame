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
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2006);
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
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2007);
      }
    }
    * destroy() {
      const { ctx } = this;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.deletePower(id);
      if (success) {
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2008);
      }
    }
  }
  return PowerController;
};
