/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Information extends app.Service {
    * create(uid, info) {
      const { ctx } = this;
      const data = {
        uid,
        content: info.content,
        city: info.city,
        add_time: ctx.helper.getNowSysTime() / 1000,
      };
      const conn = yield app.getWriteConnection().beginTransaction(); // 初始化事务
      try {
        const result = yield conn.insert('vic_information', data);
        const row = [];
        if (info.imgs.length > 0) {
          info.imgs.forEach(function(item) {
            const img_data = {
              id: result.insertId,
              img_url: item,
            };
            row.push(img_data);
          });
        }
        if (row.length > 0) {
          yield conn.insert('vic_information_img', row);
        }
        yield conn.commit(); // 提交事务
      } catch (err) {
        ctx.logger.error(err);
        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
        return 7002;
      }
      return 200;
    }
    * delete(uid, id) {
      const { ctx } = this;
      const conn = yield app.getWriteConnection().beginTransaction(); // 初始化事务
      try {
        yield conn.update('vic_information', { is_del: 1 }, { where: { id, uid } });
        yield conn.commit(); // 提交事务
      } catch (err) {
        ctx.logger.error(err);
        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
        return 7002;
      }
      return 200;
    }
    * nice(uid, id) {
      const { ctx } = this;
      const record = yield app.getReadConnection().get('vic_information_nice', { id, uid });
      if (record !== null) {
        return 7003;
      }
      const conn = yield app.getWriteConnection().beginTransaction(); // 初始化事务
      try {
        const result = yield conn.update('vic_information', { nice: '+1' }, { where: { id } });
        if (result.affectedRows === 1) {
          const data = {
            id,
            uid,
            add_time: ctx.helper.getNowSysTime() / 1000,
          };
          yield conn.insert('vic_information_nice', data);
        }
        yield conn.commit(); // 提交事务
      } catch (err) {
        ctx.logger.error(err);
        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
        return 7004;
      }
      return 200;
    }
    * bad(uid, id) {
      const { ctx } = this;
      const record = yield app.getReadConnection().get('vic_information_bad', { id, uid });
      if (record !== null) {
        return 7005;
      }
      const conn = yield app.getWriteConnection().beginTransaction(); // 初始化事务
      try {
        const result = yield conn.update('vic_information', { bad: '+1' }, { where: { id } });
        if (result.affectedRows === 1) {
          const data = {
            id,
            uid,
            add_time: ctx.helper.getNowSysTime() / 1000,
          };
          yield conn.insert('vic_information_bad', data);
        }
        yield conn.commit(); // 提交事务
      } catch (err) {
        ctx.logger.error(err);
        yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
        return 7006;
      }
      return 200;
    }
  };
};
