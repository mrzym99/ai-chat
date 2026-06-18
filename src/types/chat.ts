export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

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