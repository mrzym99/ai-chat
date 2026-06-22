import { callChatAPI } from '../api/chat'
import { COMPRESSION_THRESHOLD } from '../constants'
import type { Message } from '../types'

/**
 * 将消息列表转换为文本格式（用于压缩）
 */
function messagesToText(messages: Message[]): string {
  return messages.filter(Boolean).map(msg =>
    `${msg.role === 'user' ? '用户' : msg.role === 'assistant' ? '助手' : '系统'}: ${msg.content}`
  ).join('\n')
}

/**
 * 将旧消息压缩成摘要
 * @param messagesToCompress 需要压缩的消息列表
 * @returns 压缩后的摘要文本
 */
export async function compressMessages(messagesToCompress: Message[]): Promise<string> {
  if (messagesToCompress.length === 0) {
    return ''
  }

  // 构建压缩提示词
  const compressionPrompt = `请总结以下对话内容，提取关键信息。要求：
1. 简洁明了，控制在100字以内
2. 保留重要的事实、决策和用户偏好
3. 忽略寒暄和无关内容
4. 使用中文总结

对话历史：
${messagesToText(messagesToCompress)}

总结：`

  try {
    const abortController = new AbortController()

    // 调用 API 进行压缩
    let summary = ''
    const stream = callChatAPI(
      [
        { role: 'system', content: '你是一个专业的对话总结助手，擅长提取关键信息。语言和用户输入的保持一致' },
        { role: 'system', content: '返回的内容使用 【对话摘要】+ 摘要 的格式 根据语言进行返回' },
        { role: 'user', content: compressionPrompt }
      ],
      abortController
    )

    for await (const chunk of stream) {
      summary += chunk
    }

    return summary.trim()
  } catch (error) {
    console.error('消息压缩失败:', error)
    // 如果压缩失败，返回简单的文本摘要
    return `之前的对话包含 ${messagesToCompress.length} 条消息。`
  }
}

/**
 * 智能处理消息上下文（简化版）
 * 
 * 策略：
 * - 统计未压缩的普通消息数量
 * - 超过阈值时，压缩这些未压缩的消息
 * - 不包含当前用户的问题
 */
export async function prepareContextMessages(messages: Message[], summary: Message): Promise<{
  compressed: boolean,
  summaryMessage: Message,
}> {
  let compressed = false
  const needCompressionMessages = messages.filter(msg => !msg.compressed) ?? []

  let finalSummary: string = ''
  // 如果已经全被压缩，返回空数组
  if (needCompressionMessages.length >= COMPRESSION_THRESHOLD) {
    finalSummary = await compressMessages([summary, ...needCompressionMessages])
    compressed = true 
  }

  const summaryMessage: Message = {
    id: `summary-${Date.now()}`,
    role: 'system',
    content: finalSummary ? finalSummary : '',
    timestamp: new Date(),
    compressed: true,
  }

  return {
    compressed,
    summaryMessage,
  }
}
