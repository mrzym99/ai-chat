import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`)
  
  // 拦截响应头，记录 Content-Type
  const originalSetHeader = res.setHeader
  res.setHeader = function(name, value) {
    if (name.toLowerCase() === 'content-type') {
      console.log(`📤 Content-Type: ${value}`)
    }
    return originalSetHeader.apply(this, arguments)
  }
  
  next()
})

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    // 确保 HTML 文件有正确的 Content-Type
    if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
    }
  }
}))

// SPA fallback: 所有路由都返回 index.html
app.get('{*path}', (req, res) => {
  console.log(`🔄 Fallback to index.html for: ${req.url}`)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`✅ 服务器在端口 ${port} 启动成功!`)
  console.log(`🌐 访问地址: http://localhost:${port}`)
  console.log(`📁 服务目录: ${path.join(__dirname, 'dist')}`)
})
