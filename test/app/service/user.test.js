'use strict';
const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/service/user.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());
  // it('func login success', function* () {
  //   // 创建 ctx
  //   const ctx = app.mockContext();
  //   // 通过 ctx 访问到 service.user
  //   const data = {
  //     mobile: '15088629567',
  //     password: '123456',
  //   };
  //   assert(ctx.service);
  //   assert(ctx.service.user);
  //
  //   const code = yield ctx.service.user.login(data);
  //   assert(code === 200);
  //
  // });

});
