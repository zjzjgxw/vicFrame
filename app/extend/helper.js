/**
 * Created by vic on 2017/6/18.
 */
'use strict';

module.exports = {
  getNowSysTime() {
    return new Date().getTime();
  },
  checkMobile(mobile) {
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobile))) {
      return false;
    }
    return true;
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

