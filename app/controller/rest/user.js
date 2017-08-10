'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * login() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            mobile: { type: 'string', min: 10, max: 15 },
            password: { type: 'string', min: 6, max: 50 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const code = yield ctx.service.user.login(data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * logout() {
      const { ctx } = this;
      ctx.session.user = null;
      this.retSuccess({ data: { success: 1 } });
    }
    * checkLogin() {
      const { ctx } = this;
      console.log(ctx.session.user);

      if (ctx.session.user === null || ctx.session.user === undefined) {
        this.retError(6005);
      } else {
        this.retSuccess({});
      }
    }
    * show() {
      const { ctx } = this;
      const id = ctx.params.id;
      const res = yield ctx.service.user.show(id);
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
            mobile: { type: 'string', min: 10, max: 15 },
            password: { type: 'string', min: 6, max: 50 },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const isMobile = ctx.helper.checkMobile(data.mobile);
      if (!isMobile) {
        this.retError(6003);
        return;
      }
      const code = yield ctx.service.user.create(data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * update() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            name: { type: 'string', min: 1, max: 40, required: false },
            img_top: { type: 'string', min: 6, max: 250, required: false },
            sex: { type: 'enum', values: [ 0, 1, 2 ], required: false },
            job: { type: 'string', min: 1, max: 50, required: false },
            city: { type: 'string', min: 1, max: 50, required: false },
            email: { type: 'email', required: false },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const user = ctx.session.user;
      if (user === null) {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.user.update(user, data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    * uploadImg() {
      const { ctx } = this;
      const createRule = {
        data: {
          type: 'object',
          rule: {
            imgs: { type: 'array', itemType: 'string', min: 1, max: 9, required: true },
          },
        },
      };
      // 校验参数
      ctx.validate(createRule);
      const { data } = ctx.request.body;
      const user = ctx.session.user;
      if (user === null) {
        this.retError(6005);
        return;
      }
      const code = yield ctx.service.user.uploadImg(user, data);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
    // 某个用户发布过的信息
    * informations() {
      const { ctx } = this;
      const { uid, page, page_size } = ctx.query;
      const res = yield ctx.service.information.list(parseInt(uid), parseInt(page), parseInt(page_size));
      if (res.code === 200) {
        this.retSuccess({ data: res.data });
      } else {
        this.retError(res.code);
      }
    }
  }
  return UserController;
};
