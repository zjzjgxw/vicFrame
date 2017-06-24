/**
 * Created by vic on 2017/6/22.
 */
'use strict';
const FormStream = require('formstream');
const fs = require('fs');
const path = require('path');
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
    const res = yield this.__postData(url, menu);
    return res;
  }
  // 客服接口
  * sendMessage(postData, accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`;
    const res = yield this.__postData(url, postData);
    return res;
  }
  // 消息模版
  /**
   * 获取模版id 模板库中模板的编号
   * @param templateIdShort
   * @param accessToken
   */
  * getTemplateId(templateIdShort, accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=${accessToken}`;
    const postData = {
      template_id_short: templateIdShort,
    }
    const res = yield this.__postData(url, postData);
    return res;
  }

  /**
   * 获取模版列表
   * @param accessToken
   */
  * getTemplateList(accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=${accessToken}`;
    const res = yield this.__getData(url);
    return res;
  }
  * sendTemplateMsg(postData, accessToken) {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    const res = yield this.__postData(url, postData);
    return res;
  }
  // 素材管理
  /**
   * 上传永久素材
   * @param type 图片（image）、语音（voice）、视频（video）和缩略图（thumb）
   * @param filePath
   * @param accessToken
   * @param videoDes 如果是video需要上传
   * @returns {*}
   */
  * addMaterial(type, filePath, accessToken, videoDes = {}) {
    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=${type}`;
    const form = new FormStream();
    const fileInfo = fs.statSync(filePath);
    if (type === 'video') {
      if (!videoDes.hasOwnProperty('title') || !videoDes.hasOwnProperty('introduction')) {
        return { error: 'wrong videoDes' };
      }
      form.field('description', JSON.stringify(videoDes));
    }

    form.file('media', filePath, path.basename(filePath), fileInfo.size);
    const headers = form.headers();
    const newHeaders = {
      'Content-Type': headers['Content-Type'],
      'Content-Length': headers['Content-Length'],
      filename: path.basename(filePath),
    };
    const res = yield this.__postForm(url, form, newHeaders);
    return res;
  }

  /**
   * 获取永久素材列表
   * @param type 图片（image）、视频（video）、语音 （voice）、图文（news）
   * @param offset 偏移
   * @param count 数量
   * @param accessToken
   */
  * getMaterialList(type, offset, count, accessToken) {
    const postData = {
      type,
      offset,
      count,
    };
    const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`;
    const res = yield this.__postData(url, postData);
    return res;
  }

  /**
   * 以form表单上传信息
   * @param url
   * @param form
   * @returns {{}}
   * @private
   */
  * __postForm(url, form, headers) {
    try {
      const res = yield this.app.curl(url, {
        // 必须指定 method，支持 POST，PUT
        method: 'POST',
        // 生成符合 multipart/form-data 要求的请求 headers
        headers,
        // 以 stream 模式提交
        stream: form,
        // 明确告诉 HttpClient 以 JSON 格式处理响应 body
        dataType: 'json',
      });
      if (res.status !== 200) throw new Error('response status is not 200');
      return res.data;
    } catch (err) {
      this.app.logger.error(err);
      return {};
    }
  }
  * __postData(url, postData) {
    try {
      const res = yield this.app.curl(url, {
        method: 'POST',
        contentType: 'json',
        data: postData,
        dataType: 'json',
      });
      if (res.status !== 200) throw new Error('response status is not 200');
      return res.data;
    } catch (err) {
      this.app.logger.error(err);
      return {};
    }
  }
  * __getData(url) {
    try {
      const res = yield this.app.curl(url, {
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
