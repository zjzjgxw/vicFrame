/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Collect extends app.Service {
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
