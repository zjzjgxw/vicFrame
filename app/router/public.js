/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.post('/admin/upload', app.controller.admin.public.uploadFile); // 上传文件
};
