/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = app => {
  return class Admin extends app.Service {
    * createAdmin(info = {}) {
      if (!info.hasOwnProperty('name') || info.name === '' || info.name === undefined) {
        return false;
      }
      if (!info.hasOwnProperty('password') || info.password === '' || info.password === undefined || info.password.length < 6) {
        return false;
      }
      const user = yield app.getReadConnection().get('vic_admin', { name: info.name });
      if (user !== null) {
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
      };
      const result = yield app.getWriteConnection().insert('vic_admin', data);
      return result.affectedRows === 1;
    }
    * updateAdmin(id, info = {}) {
      if (id === undefined) {
        return false;
      }
      const user = yield app.getReadConnection().get('vic_admin', { id });
      if (user === null) {
        return false;
      }
      const data = {};
      if (info.hasOwnProperty('password')) {
        const crypto = require('crypto');
        const md5 = crypto.createHash('md5');
        const password = md5.update(user.name + info.password + user.encrypt).digest('hex');
        data.password = password;
      }
      if (info.hasOwnProperty('email') && info.email !== '') {
        data.email = info.email;
      }
      if (Object.keys(data).length === 0) {
        return false;
      }
      data.id = user.id;
      const result = yield app.getWriteConnection().update('vic_admin', data);
      return result.affectedRows === 1;
    }
    // 角色
    * addRole(name) {
      if (typeof name !== 'string') {
        return false;
      }
      if (name.length >= 50 || name.length <= 0) {
        return false;
      }
      const role = yield app.getReadConnection().get('vic_admin_role', { name });
      if (role !== null) {
        return false;
      }
      const result = yield app.getWriteConnection().insert('vic_admin_role', { name });
      return result.affectedRows === 1;
    }
    * updateRole(id, name) {
      if (typeof name !== 'string') {
        return false;
      }
      if (name.length >= 50 || name.length <= 0) {
        return false;
      }
      const role = yield app.getReadConnection().get('vic_admin_role', { id });
      if (role === null) {
        return false;
      }
      const result = yield app.getWriteConnection().update('vic_admin_role', { id, name });
      return result.affectedRows === 1;
    }
    * deleteRole(id) {
      const result = yield app.getWriteConnection().delete('vic_admin_role', { id });
      return result.affectedRows === 1;
    }
    // 子账户
    * addSubAccount(info) {
      if (!info.hasOwnProperty('name') || info.name === '' || info.name === undefined) {
        return false;
      }
      if (!info.hasOwnProperty('password') || info.password === '' || info.password === undefined) {
        return false;
      }
      const user = yield app.getReadConnection().get('vic_admin', { name: info.name });
      if (user !== null) {
        return false;
      }
      const parent = yield app.getReadConnection().get('vic_admin', { id: info.pid });
      if (parent === null) {
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
        pid: info.pid,
        is_admin: 0,
        role_id: 0,
      };
      const result = yield app.getWriteConnection().insert('vic_admin', data);
      return result.affectedRows === 1;
    }
    * updateSubAccount(id, info) {
      if (id === undefined) {
        return false;
      }
      const subAccount = yield app.getReadConnection().get('vic_admin', { id, is_admin: 0 });
      if (subAccount === null) {
        return false;
      }
      const newData = {};
      if (info.hasOwnProperty('role_id')) {
        const role = yield app.getReadConnection().get('vic_admin_role', { id: info.role_id});
        if (role === null) {
          return false;
        }
        newData.role_id = info.role_id;
      }
      if (info.hasOwnProperty('password')) {
        const crypto = require('crypto');
        const md5 = crypto.createHash('md5');
        const password = md5.update(subAccount.name + info.password + subAccount.encrypt).digest('hex');
        newData.password = password;
      }
      if (info.hasOwnProperty('email') && info.email !== '') {
        newData.email = info.email;
      }
      if (Object.keys(newData).length === 0) {
        return false;
      }
      newData.id = id;
      const result = yield app.getWriteConnection().update('vic_admin', newData);
      return result.affectedRows === 1;
    }
    * deleteSubAccount(id) {
      const result = yield app.getWriteConnection().query('update vic_admin set is_del = 1 where id = ? AND is_admin = 0', [ id ]);
      return result.affectedRows === 1;
    }
  };
};
