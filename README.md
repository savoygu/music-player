## 音乐播放器

### 运行环境

#### 安装 pnpm

```bash
npm i -g pnpm
```

#### 配置七牛云 [可选]

音乐列表页面会调用七牛云接口，需要提供七牛云相关配置：`server/midway/.env.backup`，记得把 `.env.backup` 重命名为 `.env`

### 运行项目

同时启动客户端和服务器

```bash
# 第一步，安装所有依赖
pnpm install

# 第二步，同时启动客户端与服务器
npm run dev
```

客户端地址：

  - http://localhost:3000

服务器地址：

  - http://localhost:7001

### 功能概览

#### 客户端

- 音乐播放
- 音乐列表（本地/在线模式切换）

#### 服务器

- 获取音乐列表
- 上传音乐

### 技术栈

#### 客户端

基于 Vue.js 3.x 版本来开发

- [vue.js](https://v3.cn.vuejs.org/)（渐进式 JavaScript 框架）
- [vue-router](https://router.vuejs.org/zh/)（Vue.js 的官方路由）
- [pinia](https://pinia.vuejs.org/)（Vue.js 的状态管理库）
- [vue3-lazy](https://github.com/ustbhuangyi/vue3-lazy)（基于 Vue3.x 的图片懒加载插件）
- [sass-bem-next](https://github.com/savoygu/sass-bem-next)（基于 sass 来编写 BEM 风格样式的包）
- [tailwindcss](https://tailwindcss.com/)（工具优先的 CSS 框架）
- [@icon-park/vue-next](https://postcss.org/)（基于 Vue3.x 的 IconPark 图标库插件）

基于 Vue.js 3.x + TSX 来开发

- [client/vue3-tsx](./client/vue3-tsx)

基于 React 18.x 版本来开发

- [client/react](./client/react)

#### 服务端

基于 Node.js 框架 Midwayjs 来构建服务

### 项目部署

客户端部署在 [Github](https://app.netlify.com/)

服务器部署在 [Heroku](https://www.heroku.com/home)

图片、音频存储在 [七牛云](https://portal.qiniu.com/kodo/bucket)

### 后续计划

- [x] Monorepo（支持更多客户端/服务器共存）
- [x] 加入 前端框架
  - [x] Vue3
  - [x] Vue3 + TSX
  - [x] React
- [ ] 加入 Node.js 框架
  - [x]  Midway.js
  - [ ]  NestJS
