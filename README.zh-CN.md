# vicFrame



## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发
```bash
$ npm install
$ npm run dev
$ open http://localhost:7001/news
```

### 部署

线上正式环境用 `EGG_SERVER_ENV=prod` 来启动。

```bash
$ EGG_SERVER_ENV=prod npm start
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 -单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

### 功能模块
- 使用 egg-mysql 来链接mysql数据库并进行操作
- 使用 egg-redis 来操作redis 进行缓存
- 使用 egg-session-redis 来将session保存到redis中
- 使用 egg-validate 来验证输入参数
- 使用 egg-wechat 来集成微信公众号的相关接口 （egg-wechat是自己写的插件，目前正在完善中，完善后会以插件形式单独发布）


[egg]: https://eggjs.org