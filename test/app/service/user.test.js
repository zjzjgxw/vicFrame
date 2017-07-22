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
  it('func update success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      name: '15xssw',
      password: '123456',
    };
    const user = {
      id: '3',
    };
    const code = yield ctx.service.user.update(user, data);
    assert(code === 200);

  });
  it('func update failed', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      name: '15xssw',
      password: '123456',
    };
    const user = {
      id: '5',
    };
    const code = yield ctx.service.user.update(user, data);
    assert(code === 6002);
  });

  it('func uploadImg success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      imgs: [ '1.jpg', '2.png', '3.jpg' ],
    };
    const user = {
      id: 3,
    };
    const code = yield ctx.service.user.uploadImg(user, data);
    assert(code === 200);
  });
  it('func uploadImg fail', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      imgs: [],
    };
    const user = {
      id: 3,
    };
    const code = yield ctx.service.user.uploadImg(user, data);
    assert(code === 6007);
  });
  it('func collect Information success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      information_id: 2,
    };
    const user = {
      id: 1,
    };
    const code = yield ctx.service.collect.create(user.id, data);
    assert(code === 200 || code === 7010);
  });
  it('func cancle collect Information success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      information_id: 2,
    };
    const user = {
      id: 1,
    };
    const code = yield ctx.service.collect.delete(user.id, data.information_id);
    assert(code === 200);
  });
});
