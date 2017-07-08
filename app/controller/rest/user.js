'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * index() {
      const { ctx } = this;
      ctx.logger.info('some request data: %j', ctx.query);
      ctx.body = `search: ${ctx.query.name}`;
    }
    * new() {
      const { ctx } = this;
      // set
      // yield app.redis.set('foo', 'bar');
      // get
      // ctx.body = yield app.redis.get('foo');
      ctx.body = { id: 1 };
    }
    // 处理post 请求
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: 'string',
            short_name: 'string',
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      ctx.logger.info('some request data: %j', ctx.request.body);
      const { data } = ctx.request.body;
      const success = yield ctx.service.user.create({ name: data.name });

      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2001);
      }
    }
  }
  return UserController;
};
