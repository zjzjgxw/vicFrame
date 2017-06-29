/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Admin extends app.Service {
    * createAdmin(info) {
      if (!info.hasOwnProperty('name') || info.name === '' || info.name === undefined) {
        return false;
      }
      if (!info.hasOwnProperty('password') || info.password === '' || info.password === undefined || info.password.length < 6) {
        return false;
      }
      const { ctx } = this;
      const encrypt = ctx.helper.createRandomStr(6);
      const crypto = require('crypto');
      const md5 = crypto.createHash('md5');
      const password = md5.update(info.name + info.password + encrypt).digest('hex');
      const data = {
        name: info.name,
        password,
        encrypt,
        add_time: ctx.helper.getNowSysTime() / 1000,
        pid: 0,
        is_admin: 1,
        role_id: 0,
      }
      const result = yield app.getWriteConnection().insert('vic_admin', data);
      return result.affectedRows === 1;
    }
  };
};
