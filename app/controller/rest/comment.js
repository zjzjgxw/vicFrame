'use strict';

module.exports = app => {
  class CommentController extends app.Controller {
    * create() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            information_id: { type: 'int', required: true },
            reply_uid: { type: 'int', required: false },
            content: { type: 'string', required: true },
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
      const code = yield ctx.service.comment.create(user.id, data);
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
      const code = yield ctx.service.comment.delete(user.id, id);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
  }
  return CommentController;
};
