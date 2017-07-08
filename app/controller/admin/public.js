'use strict';

module.exports = app => {
  class PublicController extends app.Controller {
    * uploadFile() {
      const { ctx } = this;
      const { data } = ctx.request.body;
      console.log(data);
      this.retSuccess({ data: { success: 1 } });
    }
  }
  return PublicController;
};
