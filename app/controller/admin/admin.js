'use strict';

module.exports = app => {
  class AdminController extends app.Controller {
    * index() {
      const { ctx } = this;
      ctx.logger.info('some request data: %j', ctx.query);
      ctx.body = `search: ${ctx.query.name}`;
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
        ctx.body = ctx.helper.returnSuccess({ data: { success: 1 } });
      } else {
        ctx.body = ctx.helper.returnError(2001);
      }
      ctx.status = 201;
    }
  }
  return AdminController;
};
