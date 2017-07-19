/**
 * Created by vic on 2017/6/29.
 */
'use strict';

module.exports = app => {
  app.resources('information', '/rest/information', app.controller.rest.information);
};
