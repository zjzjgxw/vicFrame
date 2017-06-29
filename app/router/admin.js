/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.resources('admin', '/admin/admin', app.controller.admin.admin);
};
