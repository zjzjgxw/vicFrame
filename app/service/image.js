/**
 * Created by vic on 2017/6/18.
 */
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = app => {
  return class Image extends app.Service {
    * create(base64Img) {
      const { ctx } = this;
      const file = base64Img.match(/^data:image\/(jpg|gif|jpeg|png)+;base64,/);
      const fileType = file[1]; // 获取文件类型
      const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, '');
      const dataBuffer = new Buffer(base64Data, 'base64');
      const fileName = new Date().getTime() + 'vic.' + fileType;
      const filepath = path.join(this.app.config.baseDir, `app/public/uploads/${fileName}`);
      console.log(filepath);
      try {
        yield saveImage(dataBuffer, filepath);
      } catch (err) {
        ctx.logger.warn('upload file error: %j', err);
      }
      return 200;
    }
  };
};

function saveImage(dataBuffer, filepath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, dataBuffer, function(err) {
      if (err) reject(err);
      else resolve(filepath);
    });
  });
}
