'use strict';
const mm = require('egg-mock');
const assert = require('assert');

describe('test/app/controller/rest/user.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());
  it('should GET /rest/user?name=sf', () => {
    return app.httpRequest()
      .get('/rest/user?name=sf')
      .expect('search: sf')
      .expect(200);
  });

  it('should GET /rest/user', () => {
    return app.httpRequest()
      .get('/rest/user')
      .expect('search: undefined')
      .expect(200);
  });

  it('should get /rest/user/new', () => {
    return app.httpRequest()
      .get('/rest/user/new')
      .expect({ id: 1 })
      .expect(200);
  });

  it('should post /rest/user', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/rest/user')
      .type('form')
      .send({
        data: {
          name: '韵222达',
          short_name: 'YD',
        },
        rest_version: '1.0',
      })
      .expect(201)
      .expect({
        code: 200,
        data: {
          success: 1,
        },
        msg: '',
      });
  });

  it('should not post /rest/user', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/rest/user')
      .type('form')
      .send({
        data: {
          short_name: 'YD',
        },
        rest_version: '1.0',
      })
      .expect(422)
      .expect({
        code: 422,
        data: '',
        msg: 'Validation Failed',
      });
  });
});
