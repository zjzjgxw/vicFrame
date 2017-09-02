'use strict';

module.exports = app => {
  class ImageController extends app.Controller {
    * create() {
      const { ctx } = this;
      const { data } = ctx.request.body;
      const res = yield ctx.service.image.create(data.imgUrl);
      if (res.code === 200) {
        this.retSuccess({ data: { filePath: res.filePath } });
      } else {
        this.retError(res.code);
      }
    }
  }
  return ImageController;
};
