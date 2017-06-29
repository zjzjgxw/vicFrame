'use strict';
const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/controller/admin/admin.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());
  it('should post /admin/admin', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/admin/admin')
      .type('form')
      .send({
        data: {
          name: 'vic',
          password: '12345',
        },
        rest_version: '1.0',
      })
      .expect(201)
      .expect({
        code: 2001,
      });
  });
});
