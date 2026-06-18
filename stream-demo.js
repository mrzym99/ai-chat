// 普通异步函数 - 一次性返回所有结果
async function normalAsync(){
  console.log('开始执行')
  await new Promise(r => setTimeout(r, 1000))
  console.log('1秒后')
  await new Promise(r => setTimeout(r, 1000))
  console.log('2秒后')
  return ['结果1', '结果2', '结果3'] // 一次性返回所有
}

// 异步生成器函数 - 逐步返回结果
async function* asyncGenerator() {
  console.log('开始执行')
  await new Promise(r => setTimeout(r, 1000))
  console.log('1秒后')
  yield '结果1'  // ⭐ 暂停，立即返回第一个结果
  
  await new Promise(r => setTimeout(r, 1000))
  console.log('2秒后')
  yield '结果2'  // ⭐ 暂停，返回第二个结果
  
  await new Promise(r => setTimeout(r, 1000))
  console.log('3秒后')
  yield '结果3'  // ⭐ 暂停，返回第三个结果
}

// 测试
async function test() {
  // console.log('=== 普通异步函数 ===')
  // const results = await normalAsync()
  // console.log('收到所有结果:', results)
  
  console.log('\n=== 异步生成器 ===')
  for await (const result of asyncGenerator()) {
    console.log('收到一个结果:', result)
  }
}

test()
