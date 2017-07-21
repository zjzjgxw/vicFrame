/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.resources('information', '/rest/information', app.controller.rest.information);
  app.put('/rest/information/nice/:id', app.controller.rest.information.nice);
  app.put('/rest/information/bad/:id', app.controller.rest.information.bad);
  app.resources('comment', '/rest/information/comment', app.controller.rest.comment);
};
