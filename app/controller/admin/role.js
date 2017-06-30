'use strict';

module.exports = app => {
  class RoleController extends app.Controller {
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: { type: 'string', min: 2, max: 30 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const success = yield ctx.service.admin.addRole(data.name);
      if (success) {
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2003);
      }
      ctx.status = 201;
    }
    * update() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: { type: 'string', max: 30, min: 2 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.updateRole(id, data.name);
      if (success) {
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2004);
      }
      ctx.status = 201;
    }
  }
  return RoleController;
};
