'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const { ctx } = this;
      // const user = yield ctx.service.user.find();
      // ctx.logger.info('some request data: %j', user.user[0]);
      // ctx.session.user = user;
      // ctx.body = user;
      const data = { name: 'egg' };
      // render a template, path relate to `app/view`
      yield ctx.render('home/index.tpl', data);
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
        const res = yield wechat.getJsapiTicket(accessToken);
        const { ticket } = res;
        const ret = yield wechat.getSignJs(ticket, 'http://localhost:7002/home');
        ctx.body = ret;
      } else {
        ctx.body = result;
      }
    }
  }
  return HomeController;
};
