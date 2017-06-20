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
  it('func find', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const user = yield ctx.service.user.find();
    assert(user);
    assert(user.user.name === 'gxw');
  });

  it('func create success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const success = yield ctx.service.user.create({ name: 'hello' });
    assert(success === true);
  });

  it('func create falied', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    let success = yield ctx.service.user.create({ name: '' });
    assert(success === false);

    success = yield ctx.service.user.create({});
    assert(success === false);

    success = yield ctx.service.user.create({ name: undefined });
    assert(success === false);
  });

});
