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
        try {
          const data = {
            ip: ctx.request.ip,
            login_time: ctx.helper.getNowSysTime() / 1000,
          };
          yield app.getWriteConnection().update('vic_user', data, { where: { id: user.id } });
        } catch (err) {
          ctx.logger.warn('login update error: %j', err);
        }

        return 200;
      }
      return 6004;
    }
    * show(id) {
      const user = yield app.getReadConnection().select('vic_user', {
        where: { id },
        columns: [ 'id', 'name', 'img_top', 'sex', 'job', 'city', 'email' ],
      });
      if (user === null) {
        return { code: 6008 };
      }
      return { code: 200, data: user };
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
    * update(user, info) {
      const data = {};
      const column = [ 'name', 'img_top', 'sex', 'job', 'city', 'email' ];
      for (const key in info) {
        if (column.indexOf(key) !== -1) {
          data[key] = info[key];
        }
      }
      if (Object.keys(data).length === 0) {
        return 200;
      }
      try {
        const result = yield app.getWriteConnection().update('vic_user', data, { where: { id: user.id } });
        return result.affectedRows === 1 ? 200 : 6002;
      } catch (err) {
        return 6002;
      }
    }
    * uploadImg(user, info) {
      const { imgs } = info;
      const { ctx } = this;
      if (imgs.length === 0) {
        return 6007;
      }
      const conn = yield app.getWriteConnection().beginTransaction(); // 初始化事务
      try {
        yield conn.delete('vic_user_img', { id: user.id });
        const row = [];
        imgs.forEach(function(item) {
          const data = {
            id: user.id,
            img_url: item,
          };
          row.push(data);
        });
        yield conn.insert('vic_user_img', row);
        yield conn.commit(); // 提交事务
      } catch (err) {
        ctx.logger.error(err);
        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
        return 6007;
      }
      return 200;
    }
  };
};
