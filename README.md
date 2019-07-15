# 角色识别助手
本项目为一个小型Web综合项目的前端部分，支持注册，登录，评论和上传照片。

主要功能及完成情况：
- [x] 主页/登录页/注册页/介绍页/评论页总体布局
- [x] 各个页面对应样式
- [x] 注册功能--注册并跳转到登录页
- [x] 登录功能--登录并跳转到主页
- [x] 登录功能--记录登录状态，根据登录状态显示用户名或登录/注册入口
- [x] 评论功能--评论不能为空
- [x] 评论功能--从后台获取评论并展示
- [x] 评论功能--添加评论并刷新页面
- [x] 图片功能--上传图片并预览
- [x] 图片功能--提交图片到后台并提示等待
- [x] 图象识别结果展示--将后台识别结果返回到前端渲染成列表，最可信结果高亮

## 使用方法 / Build
1. 在控制台中输入命令`npm install`安装所需要内容
```
#build the project
npm install
```
2. 按照自己需求修改logo或图片
3. 在控制台中输入`http-server`运行项目，输入页面对应路径
```
#run the project
http-server
```

## 更新日志 / Log
### 第一次更新
完成了部分前端的页面，能进行页面之间的切换

### 第二次更新
1. 完成了前端页面总体框架及所有功能(具体功能上面有列出);
2. 将前端从本地路径修改为在127.0.0.1运行(利用http-server);，
3. 修改前端项目目录结构，使之结构更清晰;
4. 将绝对路径修改为相对路径(还存在一点问题)

### 下次预计更新内容
1. 完善页面细节
2. 修改页面整体使用方案
