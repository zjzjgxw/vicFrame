/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Collect extends app.Service {
    * index(uid, page = 0, page_size = 10) {
      const offset = page * page_size;
      const sql = `SELECT d.uid,a.id,a.uid as publish_uid,a.add_time,a.content,a.city,a.nice,a.bad,b.name,b.img_top,group_concat(c.img_url) as imgs FROM vic_user_collect d
            LEFT JOIN vic_information a on d.information_id = a.id
            LEFT JOIN vic_user b ON a.uid = b.id
            LEFT JOIN vic_information_img c ON a.id = c.id
            WHERE d.uid = ${uid} AND a.is_del = 0
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
        information_id: info.information_id,
        add_time: ctx.helper.getNowSysTime() / 1000,
      };
      const collect = yield app.getReadConnection().get('vic_user_collect', { uid, information_id: info.information_id });
      if (collect !== null) {
        return 7010;
      }
      const result = yield app.getWriteConnection().insert('vic_user_collect', data);
      return result.affectedRows === 1 ? 200 : 7009;
    }
    * delete(uid, information_id) {
      const result = yield app.getWriteConnection().delete('vic_user_collect', { uid, information_id });
      return result.affectedRows === 1 ? 200 : 7011;
    }
  };
};
