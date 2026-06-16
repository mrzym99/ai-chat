export interface ApiMessage {
  content?: string
  role?: string
  [property: string]: any
}

export interface ApiRequest {
  model: string
  messages: ApiMessage[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  [property: string]: any
}

export interface ApiResponseChoice {
  delta?: {
    content?: string
  }
  finish_reason?: string
}

export interface ApiResponse {
  choices?: ApiResponseChoice[]
  [property: string]: any
}

const API_URL = 'https://api.chatanywhere.tech/v1/chat/completions'
const API_KEY = import.meta.env.VITE_API_KEY

export async function* callChatAPI(
  messages: ApiMessage[],
  abortController: AbortController
): AsyncGenerator<string, void, unknown> {
  const requestBody: ApiRequest = {
    model: 'gpt-5-mini',
    messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
    stream: true,
    temperature: 0.7,
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
    signal: abortController.signal,
  })

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('无法获取响应流')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue

        const data = trimmedLine.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed: ApiResponse = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            yield content
          }
        } catch (e) {
          console.error('解析 SSE 数据失败:', e)
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
