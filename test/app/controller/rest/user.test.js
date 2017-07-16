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
  // it('should post /rest/user', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/rest/user')
  //     .type('form')
  //     .send({
  //       data: {
  //         mobile: '15088620567',
  //         password: '123456',
  //       },
  //       rest_version: '1.0',
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 6001,
  //     });
  // });
  //
  // it('should not post /rest/user', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/rest/user')
  //     .type('form')
  //     .send({
  //       data: {
  //         mobile: 'gss',
  //         password: '123',
  //       },
  //       rest_version: '1.0',
  //     })
  //     .expect(422)
  //     .expect({
  //       code: 422,
  //       data: '',
  //       msg: 'Validation Failed',
  //     });
  // });
});
