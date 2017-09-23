/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Information extends app.Service {
    * index(city = '上海', page = 0, page_size = 10) {
      // 这里还没考虑好防注入要怎么做 http://127.0.0.1:7001/rest/information?city=上海' AND content = 'ss &page=0&page_size=5 类似这样的url会导致查询失败
      const offset = page * page_size;
      const sql = `SELECT a.id,a.uid,a.add_time,a.content,a.city,a.nice,a.bad,b.name,b.img_top,group_concat(c.img_url) as imgs FROM vic_information a
      LEFT JOIN vic_user b ON a.uid = b.id
      LEFT JOIN vic_information_img c ON a.id = c.id
      WHERE a.city = '${city}' AND a.is_del = 0
      GROUP BY a.id
      ORDER BY a.add_time DESC
      LIMIT ${offset},${page_size}`;
      try {
        const conn = app.getReadConnection();
        const res = yield conn.query(sql);
        const data = {
          list: res,
          count: res.length,
        };
        return { code: 200, data };
      } catch (err) {
        const { ctx } = this;
        ctx.logger.error(err);
        return { code: 1000 };
      }
    }
    // 获取某个用户的发布过的信息
    * list(uid, page = 0, page_size = 10) {
      const offset = page * page_size;
      const sql = `SELECT a.id,a.uid,a.add_time,a.content,a.city,a.nice,a.bad,b.name,b.img_top,group_concat(c.img_url) as imgs FROM vic_information a
      LEFT JOIN vic_user b ON a.uid = b.id
      LEFT JOIN vic_information_img c ON a.id = c.id
      WHERE a.uid = ${uid} AND a.is_del = 0
      GROUP BY a.id
      ORDER BY a.add_time DESC
      LIMIT ${offset},${page_size}`;
      try {
        const conn = app.getReadConnection();
        const res = yield conn.query(sql);
        const data = {
          list: res,
          count: res.length,
        };
        return { code: 200, data };
      } catch (err) {
        const { ctx } = this;
        ctx.logger.error(err);
        return { code: 1000 };
      }
    }
    * create(uid, info) {
      const { ctx } = this;
      const data = {
        uid,
        content: info.content,
        province: info.province,
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
