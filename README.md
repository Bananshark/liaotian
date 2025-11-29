# 多用户实时弹幕系统

一个基于 WebSocket 的实时弹幕系统，允许多个用户同时发送和查看弹幕。

## 功能特点

- ✅ 多用户实时同步弹幕
- ✅ 弹幕循环播放
- ✅ 随机颜色、大小、速度
- ✅ 自动重连机制
- ✅ 数据持久化存储
- ✅ 连接状态显示

## 安装步骤

### 1. 安装 Node.js

确保你的系统已安装 Node.js (版本 12 或更高)

### 2. 安装依赖

在项目目录下运行：

```bash
npm install
```

### 3. 启动服务器

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

### 4. 访问网页

在浏览器中打开：`http://localhost:3000`

## 使用方法

1. **启动服务器**：运行 `npm start`
2. **打开网页**：在浏览器访问 `http://localhost:3000`
3. **发送弹幕**：在输入框中输入文字，按回车或点击发送
4. **多用户共享**：其他用户访问相同地址即可看到所有弹幕

## 部署到网络

### 方法1：使用云服务器

1. 将代码上传到云服务器（如阿里云、腾讯云等）
2. 在服务器上安装 Node.js
3. 运行 `npm install` 安装依赖
4. 运行 `npm start` 启动服务器
5. 配置防火墙开放 3000 端口
6. 其他用户通过 `http://你的服务器IP:3000` 访问

### 方法2：使用内网穿透工具

1. 使用 ngrok、frp 等工具进行内网穿透
2. 获得公网访问地址
3. 分享地址给其他用户

### 方法3：使用云平台

- **Heroku**: 支持 Node.js，可直接部署
- **Vercel**: 支持 Node.js 应用
- **Railway**: 简单易用的部署平台

## 文件说明

- `index.html` - 前端页面
- `server.js` - 后端服务器（WebSocket + Express）
- `package.json` - 项目配置和依赖
- `danmaku-data.json` - 弹幕数据存储（自动生成）

## 技术栈

- **前端**: HTML5, CSS3, JavaScript, WebSocket API
- **后端**: Node.js, Express, WebSocket (ws)

## 注意事项

- 默认端口为 3000，可在 `server.js` 中修改
- 弹幕数据保存在 `danmaku-data.json` 文件中
- 最多保存 1000 条弹幕，超出会自动删除最旧的
- 建议在生产环境中使用数据库（如 MongoDB、MySQL）替代文件存储

## 故障排除

### WebSocket 连接失败

- 检查服务器是否正常运行
- 检查防火墙是否开放端口
- 确认 WebSocket URL 配置正确

### 弹幕不显示

- 检查浏览器控制台是否有错误
- 确认 WebSocket 连接状态
- 刷新页面重新连接

## 许可证

MIT License

