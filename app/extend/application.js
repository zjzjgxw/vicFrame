/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = {
  getWriteConnection() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    return this.mysql.get('write');
  },
  getReadConnection() {
    return this.mysql.get('read');
  },
};

