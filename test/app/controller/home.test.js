'use strict';
const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/controller/home.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());

  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  it('should mock ctx.user', () => {
    const ctx = app.mockContext({
      user: {
        name: 'fengmk2',
      },
    });
    assert(ctx.user);
    assert(ctx.user.name === 'fengmk2');
  });

  it('should mock fengmk1 exists', () => {
    app.mockService('user', 'get', function* () {
      return {
        name: 'fengmk1',
      };
    });
    return app.httpRequest()
      .get('/user?name=fengmk1')
      .expect(200)
      // 返回了原本不存在的用户信息
      .expect({
        name: 'fengmk1',
      });
  });
});
