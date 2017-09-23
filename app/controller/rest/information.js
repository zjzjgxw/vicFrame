'use strict';

module.exports = app => {
  class InformationController extends app.Controller {
    * index() {
      const { ctx } = this;
      const { city, page = 0, page_size = 10 } = ctx.query;
      const res = yield ctx.service.information.index(city, parseInt(page), parseInt(page_size));
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
            content: { type: 'string', allowEmpty: true, max: 500, required: false },
            imgs: { type: 'array', itemType: 'string', max: 9, required: false },
            city: { type: 'string', min: 1, max: 50, required: true },
            province: { type: 'string', min: 1, max: 50, required: true },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      if (data.content.length === 0 && data.imgs.length === 0) {
        this.retError(7001);
        return;
      }
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.information.create(user.id, data);
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
      const code = yield ctx.service.information.delete(user.id, id);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    // 点赞
    * nice() {
      const { ctx } = this;
      const id = ctx.params.id;
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.information.nice(user.id, id);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * bad() {
      const { ctx } = this;
      const id = ctx.params.id;
      const user = ctx.session.user;
      if (user === null || typeof (user) === 'undefined') {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.information.bad(user.id, id);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
  }
  return InformationController;
};
