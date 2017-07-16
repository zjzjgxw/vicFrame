/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class User extends app.Service {
    * login(info) {
      const user = yield app.getReadConnection().get('vic_user', { mobile: info.mobile, is_black: 0 });
      if (user === null) {
        return 6004;
      }
      const crypto = require('crypto');
      const md5 = crypto.createHash('md5');
      const password = md5.update(user.mobile + info.password + user.encrypt).digest('hex');
      if (password === user.password) {
        const { ctx } = this;
        ctx.session.user = user;
        return 200;
      }
      return 6004;
    }
    * create(info) {
      const user = yield app.getReadConnection().get('vic_user', { mobile: info.mobile });
      if (user !== null) {
        return 6001;
      }
      const { ctx } = this;
      const encrypt = ctx.helper.createRandomStr(6);
      const crypto = require('crypto');
      const md5 = crypto.createHash('md5');
      const password = md5.update(info.mobile + info.password + encrypt).digest('hex');
      const data = {
        mobile: info.mobile,
        password,
        encrypt,
        add_time: ctx.helper.getNowSysTime() / 1000,
      };
      const result = yield app.getWriteConnection().insert('vic_user', data);
      return result.affectedRows === 1 ? 200 : 6002;
    }
  };
};
