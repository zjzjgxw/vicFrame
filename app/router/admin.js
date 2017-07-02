/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.resources('admin', '/admin/admin', app.controller.admin.admin);
  app.resources('admin', '/admin/role', app.controller.admin.role);
  app.resources('admin', '/admin/subAccount', app.controller.admin.subAccount);
  app.resources('admin', '/admin/powerGroup', app.controller.admin.powerGroup);
  app.resources('admin', '/admin/power', app.controller.admin.power);

};
