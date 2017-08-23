'use strict';

module.exports = app => {
  class ImageController extends app.Controller {
    * create() {
      const { ctx } = this;
      const { data } = ctx.request.body;
      const code = yield ctx.service.image.create(data.imgUrl);
      if (code === 200) {
        this.retSuccess({ data: { success: 1 } });
      } else {
        this.retError(code);
      }
    }
  }
  return ImageController;
};
