const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 存储弹幕数据（实际项目中应使用数据库）
const danmakuDataFile = path.join(__dirname, 'danmaku-data.json');
let danmakuList = [];

// 读取保存的弹幕数据
function loadDanmakuData() {
    try {
        if (fs.existsSync(danmakuDataFile)) {
            const data = fs.readFileSync(danmakuDataFile, 'utf8');
            danmakuList = JSON.parse(data);
        }
    } catch (error) {
        console.error('读取弹幕数据失败:', error);
        danmakuList = [];
    }
}

// 保存弹幕数据
function saveDanmakuData() {
    try {
        fs.writeFileSync(danmakuDataFile, JSON.stringify(danmakuList, null, 2));
    } catch (error) {
        console.error('保存弹幕数据失败:', error);
    }
}

// 初始化时加载数据
loadDanmakuData();

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 提供HTML页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// WebSocket连接处理
wss.on('connection', (ws) => {
    console.log('新用户连接');

    // 发送当前所有弹幕给新连接的客户端
    ws.send(JSON.stringify({
        type: 'init',
        danmakus: danmakuList
    }));

    // 接收客户端消息
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            if (data.type === 'newDanmaku') {
                // 创建新弹幕
                const newDanmaku = {
                    id: Date.now() + Math.random(),
                    text: data.text,
                    color: data.color,
                    fontSize: data.fontSize,
                    top: data.top,
                    duration: data.duration,
                    timestamp: Date.now()
                };

                // 添加到列表（限制最多保存1000条）
                danmakuList.push(newDanmaku);
                if (danmakuList.length > 1000) {
                    danmakuList.shift();
                }

                // 保存到文件
                saveDanmakuData();

                // 广播给所有连接的客户端
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'newDanmaku',
                            danmaku: newDanmaku
                        }));
                    }
                });

                console.log(`新弹幕: ${data.text}`);
            } else if (data.type === 'clearDanmaku') {
                // 清空弹幕
                danmakuList = [];
                saveDanmakuData();

                // 广播清空消息
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'clearDanmaku'
                        }));
                    }
                });

                console.log('弹幕已清空');
            }
        } catch (error) {
            console.error('处理消息错误:', error);
        }
    });

    // 连接关闭
    ws.on('close', () => {
        console.log('用户断开连接');
    });

    // 错误处理
    ws.on('error', (error) => {
        console.error('WebSocket错误:', error);
    });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`弹幕服务器运行在 http://localhost:${PORT}`);
    console.log(`所有用户可以通过访问此地址来共享弹幕`);
});

