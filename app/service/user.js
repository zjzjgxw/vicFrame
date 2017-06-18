/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class User extends app.Service {
    * find() {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = yield app.getReadConnection().select('vic_user');
      return {
        user,
      };
    }
    * create(user) {
      // 插入
      const result = yield app.getWriteConnection().insert('vic_user', user);
      return result.affectedRows === 1;
    }
  };
};
