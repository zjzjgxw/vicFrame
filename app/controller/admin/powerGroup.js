'use strict';

module.exports = app => {
  class PowerGroupController extends app.Controller {
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
      const success = yield ctx.service.admin.addPowerGroup(data.name);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2009);
      }
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
      const success = yield ctx.service.admin.updatePowerGroup(id, data.name);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2010);
      }
    }
    * destroy() {
      const { ctx } = this;
      const id = ctx.params.id;
      const success = yield ctx.service.admin.deletePowerGroup(id);
      if (success) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(2011);
      }
    }
  }
  return PowerGroupController;
};
