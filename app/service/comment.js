/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Comment extends app.Service {
    * create(uid, info) {
      const { ctx } = this;
      const data = {
        uid,
        information_id: info.information_id,
        content: info.content,
        add_time: ctx.helper.getNowSysTime() / 1000,
      };
      if (info.hasOwnProperty('reply_uid')) {
        data.reply_uid = info.reply_uid;
      }
      const result = yield app.getWriteConnection().insert('vic_comment', data);
      return result.affectedRows === 1 ? 200 : 7007;
    }
    * delete(uid, id) {
      const result = yield app.getWriteConnection().update('vic_comment', { is_del: 1 }, { where: { id, uid } });
      return result.affectedRows === 1 ? 200 : 7008;
    }
  };
};
