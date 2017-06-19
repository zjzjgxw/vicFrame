/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = {
  returnSuccess(res) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    return { code: 200, data: res.hasOwnProperty('data') ? res.data : '', msg: '' };
  },
  returnError(code) {
    return { code, data: '', msg: this.ctx.__(code) };
  },
};

