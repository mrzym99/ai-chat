# GitHub Pages 部署指南

## 📋 前置准备

### 1. 配置环境变量（在 GitHub 仓库中）

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**，添加以下变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `VITE_API_URL` | API 地址 | `https://api.chatanywhere.tech/v1/chat/completions` |
| `VITE_API_KEY` | API 密钥 | `sk-xxx...` |

### 2. 配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. 在 **Build and deployment** 部分：
   - **Source**: 选择 "GitHub Actions"
   - 不需要选择分支，因为 workflow 会自动处理

## 🚀 自动部署流程

### 触发条件

- ✅ 推送到 `main` 分支时自动部署
- ✅ 手动触发：在 **Actions** 标签页点击 "Run workflow"

### 部署步骤

1. **提交代码**
   ```bash
   git add .
   git commit -m "feat: update something"
   git push origin main
   ```

2. **查看部署状态**
   - 进入仓库的 **Actions** 标签页
   - 查看 "Deploy to GitHub Pages" workflow 的运行状态
   - 绿色 ✅ 表示成功，红色 ❌ 表示失败

3. **访问网站**
   - 部署成功后，访问：`https://你的用户名.github.io/ai-chat/`
   - 例如：`https://username.github.io/ai-chat/`

## ⚙️ 配置说明

### Vite 配置

已在 `vite.config.ts` 中配置：
```typescript
base: '/ai-chat/' // 必须与仓库名一致
```

**注意**：如果你的仓库名不是 `ai-chat`，需要修改这个值。

### Workflow 配置

文件位置：`.github/workflows/deploy.yml`

主要功能：
- ✅ 使用 Node.js 20
- ✅ 缓存 npm 依赖加速构建
- ✅ 注入环境变量（API URL 和 Key）
- ✅ 自动部署到 GitHub Pages

## 🔧 常见问题

### 1. 部署后页面空白或 404

**原因**：`base` 路径配置错误

**解决**：
- 检查 `vite.config.ts` 中的 `base` 是否与仓库名一致
- 确保是 `/仓库名/` 格式（前后都有斜杠）

### 2. API 请求失败

**原因**：环境变量未正确配置

**解决**：
- 确认在 GitHub Settings 中添加了 `VITE_API_URL` 和 `VITE_API_KEY`
- 检查变量名是否完全一致（区分大小写）

### 3. 部署卡在 "in progress"

**原因**：之前的部署还在运行

**解决**：
- 等待当前部署完成
- 或者取消之前的部署，重新触发

### 4. 本地预览正常，线上白屏

**可能原因**：
- 路由问题：确保使用 Hash 路由或配置正确的 base
- 资源路径问题：检查所有静态资源路径是否正确

## 📝 手动部署（可选）

如果不想用 CI/CD，可以手动部署：

```bash
# 1. 构建
npm run build

# 2. 进入 dist 目录
cd dist

# 3. 初始化 git（如果还没有）
git init
git add .
git commit -m "deploy"

# 4. 推送到 gh-pages 分支
git branch -M gh-pages
git remote add origin https://github.com/用户名/ai-chat.git
git push -f origin gh-pages
```

## 🎯 最佳实践

1. **不要在代码中硬编码 API Key**
   - ❌ 不要：直接在代码中写 `const API_KEY = 'sk-xxx'`
   - ✅ 应该：使用环境变量 `import.meta.env.VITE_API_KEY`

2. **测试后再部署**
   - 先在本地运行 `npm run build && npm run preview` 测试
   - 确认无误后再推送

3. **查看部署日志**
   - 每次部署后检查 Actions 日志
   - 如果有错误，根据日志修复

## 🔗 相关链接

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
