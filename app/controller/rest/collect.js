'use strict';

module.exports = app => {
  class CollectController extends app.Controller {
    * index() {
      const { ctx } = this;
      const { page, page_size } = ctx.query;
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const res = yield ctx.service.collect.index(1, parseInt(page), parseInt(page_size));
      if (res.code === 200) {
        this.retSuccess({ data: res.data });
      } else {
        this.retError(res.code);
      }
    }
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            information_id: { type: 'int', required: true },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.collect.create(user.id, data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * destroy() {
      const { ctx } = this;
      const id = ctx.params.id;
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.collect.delete(user.id, id);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
  }
  return CollectController;
};
