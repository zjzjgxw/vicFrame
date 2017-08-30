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
      const dirName = formatTime();
      try {
        const isExistDir = yield existDir(path.join(this.app.config.baseDir, `app/public/uploads/${dirName}`));
        if (!isExistDir) { // 目录不存在
          fs.mkdirSync(path.join(this.app.config.baseDir, `app/public/uploads/${dirName}`), '0755');
        }
      } catch (err) {
        ctx.logger.warn('mkdir file error: %j', err);
      }
      const filepath = path.join(this.app.config.baseDir, `app/public/uploads/${dirName}/${fileName}`);
      try {
        yield saveImage(dataBuffer, filepath);
      } catch (err) {
        ctx.logger.warn('upload file error: %j', err);
      }
      return 200;
    }
  };
};

function formatTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return year.toString() + month.toString() + day.toString();
}

function existDir(dirPath) {
  return new Promise(resolve => {
    fs.exists(dirPath, function(result) {
      resolve(result);
    });
  });
}

function saveImage(dataBuffer, filepath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, dataBuffer, function(err) {
      if (err) reject(err);
      else resolve(filepath);
    });
  });
}
