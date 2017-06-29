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
  getNowSysTime() {
    return new Date().getTime();
  },
  createRandomStr(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  },
};

