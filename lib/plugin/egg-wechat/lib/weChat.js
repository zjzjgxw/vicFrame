/**
 * Created by vic on 2017/6/22.
 */
'use strict';

module.exports = class weChat {
  constructor(config, app) {
    this.appId = config.appId;
    this.appsecret = config.appsecret;
    this.app = app;
  }
  * getAccessToken() {
    let wxAccessToken = yield this.app.redis.get('wx_access_token');
    // 缓存中的accessToken 还在有效期,直接返回
    wxAccessToken = JSON.parse(wxAccessToken);
    if (wxAccessToken.hasOwnProperty('expires_time') && wxAccessToken.expires_time > this.app.getNowSysTime()) {
      return wxAccessToken;
    }
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appsecret}`;
    try {
      const res = yield this.app.curl(url, {
        dataType: 'json',
      });
      if (res.status !== 200) throw new Error('response status is not 200');
      if (res.data.hasOwnProperty('access_token')) {
        const accessData = {
          access_token: res.data.access_token,
          expires_time: this.app.getNowSysTime() + 7000 * 1000,
        };
        yield this.app.redis.set('wx_access_token', JSON.stringify(accessData));
        return accessData;
      }
      // 获取accesstoken 失败，返回错误码
      return res.data;
    } catch (err) {
      this.app.logger.error(err);
      return {};
    }
  }
  // 菜单相关
  /**
   * 创建菜单
   * @param  menu
   * @param accessToken
   * @returns {{}}
   */
  * createMenu(menu, accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`;
    try {
      const res = yield this.app.curl(url, {
        method: 'POST',
        contentType: 'json',
        data: menu,
        dataType: 'json',
      });
      if (res.status !== 200) throw new Error('response status is not 200');
      return res.data;
    } catch (err) {
      this.app.logger.error(err);
      return {};
    }
  }
  getApp() {
    return this.app;
  }
};
