'use strict';
const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/service/information.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());
  // it('func create Information success', function* () {
  //   // 创建 ctx
  //   const ctx = app.mockContext();
  //   // 通过 ctx 访问到 service.user
  //   const data = {
  //     content: '你好啊',
  //     imgs: [ '1.jpg', '2.png', '3.jpg' ],
  //     city: '上海',
  //   };
  //   const user = {
  //     id: 3,
  //   };
  //   const code = yield ctx.service.information.create(user.id, data);
  //   assert(code === 200);
  // });
  it('func delete Information success', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const id = 6;
    const user = {
      id: 3,
    };
    const code = yield ctx.service.information.delete(user.id, id);
    assert(code === 200);
  });
  it('func delete Information when user.id is wrong', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const id = 1;
    const user = {
      id: 4,
    };
    const code = yield ctx.service.information.delete(user.id, id);
    assert(code === 200);
  });

  it('func nice Information ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const id = 1;
    const user = {
      id: 3,
    };
    const code = yield ctx.service.information.nice(user.id, id);
    assert(code === 7003);
  });
  it('func bad Information ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const id = 1;
    const user = {
      id: 3,
    };
    const code = yield ctx.service.information.bad(user.id, id);
    assert(code === 7005);
  });
  // it('func create Information comment ', function* () {
  //   // 创建 ctx
  //   const ctx = app.mockContext();
  //   // 通过 ctx 访问到 service.user
  //   const data = {
  //     information_id: 1,
  //     content: '你好啊',
  //     reply_uid: 2,
  //   };
  //   const user = {
  //     id: 3,
  //   };
  //   const code = yield ctx.service.comment.create(user.id, data);
  //   assert(code === 200);
  // });
  it('func delete Information comment ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      id: 4,
    };
    const user = {
      id: 3,
    };
    const code = yield ctx.service.comment.delete(user.id, data.id);
    assert(code === 200);
  });
  it('func delete Information comment fail ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const data = {
      id: 4,
    };
    const user = {
      id: 4,
    };
    const code = yield ctx.service.comment.delete(user.id, data.id);
    assert(code === 7008);
  });
  it('func get Information list success ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const city = '上海';
    const page = 0;
    const page_size = 5;
    const res = yield ctx.service.information.index(city, page, page_size);
    assert(res.code === 200);
  });
  it('func get user Information list success ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const uid = 3;
    const page = 0;
    const page_size = 5;
    const res = yield ctx.service.information.list(uid, page, page_size);
    assert(res.code === 200);
  });
  it('func get user Information list failed ', function* () {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const uid = undefined;
    const page = 0;
    const page_size = 5;
    const res = yield ctx.service.information.list(uid, page, page_size);
    assert(res.code === 1000);
  });
});
