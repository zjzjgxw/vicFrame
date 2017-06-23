'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const { ctx } = this;
      const user = yield ctx.service.user.find();
      ctx.logger.info('some request data: %j', user.user[0]);
      ctx.session.user = user;
      ctx.body = user;
    }
    * home() {
      const { ctx, app } = this;
      // set
      // yield app.redis.set('foo', 'bar');
      // get
      // ctx.body = yield app.redis.get('foo');
      const config = {
        appId: 'wxa340dfe999102e4e',
        appsecret: '14d6235650c89f1478cdf074923396e6',
      };
      const wechat = app.weChat.create(config, app);
      const result = yield wechat.getAccessToken();
      if (result.hasOwnProperty('access_token')) {
        const accessToken = result.access_token;
        const postData = {
          touser: 'og5lbwazLfHFPEoBWwkToWflclVI',
          template_id: 'Xdaul_DwDdERnMTZ8AN48RvRfzDlV3gNzJuVMMeToLs',
          url: 'http://weixin.qq.com/download',
          data: {
            first: {
              value: '恭喜你购买成功！',
              color: '#173177',
            },
          },
        }
        const res = yield wechat.sendTemplateMsg(postData, accessToken);
        ctx.body = res;
      } else {
        ctx.body = result;
      }
    }
  }
  return HomeController;
};
